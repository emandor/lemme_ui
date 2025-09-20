import { createSignal } from "solid-js";
import { getQuizzes, Quiz } from "../services/api";

const [items, setItems] = createSignal<Quiz[]>([]);
const [cursor, setCursor] = createSignal<string | undefined>();

export async function loadInitial() {
  const r = await getQuizzes();
  setItems(r);
  setCursor(r.length > 0 ? r[r.length - 1].id : undefined);
}
export function upsert(quizID: string, q: Partial<Quiz>) {
  setItems((prev) => {
    const i = prev.findIndex((x) => x.id === quizID);
    if (i >= 0) {
      const copy = prev.slice();
      copy[i] = { ...copy[i], ...q };
      return copy;
    }
    const quiz: Quiz = {
      id: quizID,
      image_path: q.image_path || "",

      ocr_text: q.ocr_text || "",
      answers: q.answers || [],
      status: q.status || "pending",
      created_at: q.created_at ?? new Date().toISOString(),
    };
    return [quiz, ...prev];
  });
}
export const quizzes = { items, upsert, loadInitial, cursor };

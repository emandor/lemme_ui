import { createStore } from "solid-js/store";
import { getQuizzes, Quiz } from "../services/api";
import { createSignal } from "solid-js";

const [items, setItems] = createStore<Record<string, Quiz>>({});
const [cursor, setCursor] = createSignal<string | undefined>();
const [order, setOrder] = createSignal<string[]>([]);

export async function loadInitial() {
  const r = await getQuizzes();
  const map: Record<string, Quiz> = {};
  const ids: string[] = [];

  for (const q of r) {
    map[q.id] = q;
    ids.push(q.id);
  }

  setItems(map);
  setOrder(ids); // most recent first
  setCursor(r.length > 0 ? r[r.length - 1].id : undefined);
}

export function upsert(quizID: string, q: Partial<Quiz>) {
  setItems(quizID, (prev) => ({ ...prev, ...q }));
  setOrder((prev) => (prev.includes(quizID) ? prev : [quizID, ...prev]));
}
export const quizzes = { items, upsert, loadInitial, cursor, order };

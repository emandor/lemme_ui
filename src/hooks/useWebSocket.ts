import { connectWS, WSPayloadEvents, WSClientMessage } from "../services/ws";
import { quizzes } from "../store/quizzes";
import { onMount, onCleanup, createEffect } from "solid-js";
import { useAuth } from "./useAuth";
import { Quiz } from "~/services/api";

export function useUserRoom() {
  const { user } = useAuth();
  createEffect(() => {
    if (!user()?.id) return;
    const userID = user()?.id;

    const disconnect = connectWS(
      (data: WSPayloadEvents) => {
        if (data.event === "quiz.event.created") {
          const newQuizID = String(data.data?.quiz_id);
          quizzes.upsert(newQuizID, {
            id: newQuizID,
            status: "pending",
            image_path: data.data?.image_path,
          });
        }
      },
      (ws) => {
        const joinMsg: WSClientMessage = {
          action: "join",
          room: `quiz.room.user.${userID}`,
        };
        ws.send(JSON.stringify(joinMsg));
      },
    );

    onCleanup(disconnect);
  }, [user()?.id]);
}

export function useQuizRoom(quizID: string) {
  onMount(() => {
    const disconnect = connectWS(
      (data: WSPayloadEvents) => {
        switch (data.event) {
          case "quiz.event.ocr_done":
            quizzes.upsert(quizID, {
              ocr_text: data.data.ocr_text,
            });
            break;
          case "quiz.event.answered":
            const quiz = quizzes.items().find((q) => q.id === quizID);
            const currentAnswers = quiz?.answers || [];

            // cari index jawaban dari source yang sama
            const idx = currentAnswers.findIndex(
              (a) => a.source === data.source,
            );

            let newAnswers: Quiz["answers"];
            if (idx >= 0) {
              // update existing
              newAnswers = [...currentAnswers];
              newAnswers[idx] = {
                source: data.source,
                answer_text: data.data.answer,
                reason_text: data.data.reason,
              };
            } else {
              // append new
              newAnswers = [
                ...currentAnswers,
                {
                  source: data.source,
                  answer_text: data.data.answer,
                  reason_text: data.data.reason,
                },
              ];
            }

            quizzes.upsert(quizID, {
              answers: newAnswers,
              status: "processing",
            });
            break;
          case "quiz.event.completed":
            quizzes.upsert(quizID, { status: "completed" });
            break;
          case "quiz.event.created":
            // ignore
            break;
        }
      },
      (ws) => {
        const joinMsg: WSClientMessage = {
          action: "join",
          room: `quiz.room.${quizID}`,
        };
        ws.send(JSON.stringify(joinMsg));
      },
    );

    onCleanup(disconnect);
  });
}

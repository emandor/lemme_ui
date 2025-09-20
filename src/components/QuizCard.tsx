import { createSignal, Show } from "solid-js";
import { styled } from "styled-system/jsx";
import StatusPill from "./StatusPill";
import { Quiz } from "~/services/api";
import { useQuizRoom } from "~/hooks/useWebSocket";

export default function QuizCard(props: { q: Quiz }) {
  const [open, setOpen] = createSignal(true);
  useQuizRoom(props.q.id);
  const Card = styled("div", {
    base: {
      bg: "card",
      rounded: "xl",
      border: "1px solid",
      borderColor: "line",
      p: "5",
    },
  });

  const BASE_URL = import.meta.env.VITE_API_URL || "";
  if (props.q.image_path && !props.q.image_path.startsWith("http")) {
    props.q.image_path = `${BASE_URL}/${props.q.image_path}`;
  }
  const QuizWrapper = styled("div", {
    base: {
      display: "flex",
      flexDirection: "column",
    },
  });
  const AnswersWrapper = styled("div", {
    base: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
    },
  });

  const Question = styled("div", {
    base: {
      display: "flex",
      gap: 15,
    },
  });

  const HeadingAnswer = styled("h4", {
    base: {
      mt: 5,
      fontWeight: 800,
    },
  });

  const ScreenshootWrapper = styled("img", {
    base: {
      width: "300px",
      borderRadius: "10px",
      border: "1px solid white",
    },
  });

  const Answers = styled("div", {
    base: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
    },
  });

  return (
    <Card>
      <div style="display:flex; gap:16px; align-items:center; justify-content:space-between">
        <div style="display:flex; gap:12px; align-items:center">
          <strong>Quiz {props.q.id}</strong>
          <small>{new Date(props.q.created_at).toLocaleString()}</small>
        </div>
        <div style="display:flex; gap:10px; align-items:center">
          <StatusPill status={props.q.status} />
          <button
            onclick={() => setOpen((o) => !o)}
            style="border:1px solid var(--colors-line); border-radius:10px; padding:6px 8px"
          >
            {open() ? "▴" : "▾"}
          </button>
        </div>
      </div>

      <Show when={open()}>
        <QuizWrapper>
          <Question>
            <ScreenshootWrapper src={props.q.image_path} />
            <AnswersWrapper>
              <h4>Soal - OCR</h4>
              <p style="opacity:.8; white-space:pre-wrap">
                {props.q.ocr_text ?? "..."}
              </p>
            </AnswersWrapper>
          </Question>
          <AnswersWrapper>
            <HeadingAnswer>Result</HeadingAnswer>
            <Answers>
              {props.q.answers?.map((r) => (
                <div style="border:1px solid var(--colors-line); border-radius:12px; padding:10px">
                  <div style="opacity:.8">{r.source}</div>
                  <div style="font-size:28px; color:var(--colors-brand); font-weight:700">
                    {r.answer_text ?? "-"}
                  </div>
                  <p style="opacity:.8; font-size:12px">
                    {r.reason_text ?? ""}
                  </p>
                </div>
              )) ?? <div>Waiting…</div>}
            </Answers>
          </AnswersWrapper>
        </QuizWrapper>
      </Show>
    </Card>
  );
}

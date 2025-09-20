import { createSignal, Show } from "solid-js";
import { styled } from "styled-system/jsx";
import StatusPill from "./StatusPill";
import { Quiz } from "~/services/api";
import { useQuizRoom } from "~/hooks/useWebSocket";

import { FaSolidChevronDown } from "solid-icons/fa";
import { FaSolidChevronUp } from "solid-icons/fa";

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
      mt: 4,
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
      flexDirection: "column",

      gap: 15,
      lg: { flexDirection: "row" },
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
      objectFit: "contain",
    },
  });

  const Answers = styled("div", {
    base: {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "12px",
      lg: { gridTemplateColumns: "repeat(4, 1fr)" },
    },
  });

  const Title = styled("h3", {
    base: {
      fontSize: "xl",
      fontWeight: "700",
    },
  });

  const DateText = styled("small", {
    base: {
      fontSize: "10px",
      color: "gray.300",
      ml: 2,
    },
  });

  const QuizTitleBar = styled("div", {
    base: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });

  const ButtonToggle = styled("button", {
    base: {
      border: "1px solid",
      borderColor: "line",
      borderRadius: "10px",
      padding: "6px 8px",
      cursor: "pointer",
    },
  });

  const dateFormatter = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateToLocal = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  };

  const createdDate = dateFormatter.format(dateToLocal(props.q.created_at));

  const OcrResultWrapper = styled("div", {
    base: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      padding: 3,
      border: "1px solid",
      borderColor: "line",
      borderRadius: "10px",
      backgroundColor: "rgba(0,0,0,0.05)",
      whiteSpace: "pre-wrap",
      width: "100%",
      minHeight: "100px",
      fontSize: "14px",
      color: "var(--colors-text)",
      fontFamily: "monospace",
      overflowX: "auto",
      wordBreak: "break-word",
      lineHeight: "1.4",
      letterSpacing: "0.5px",
      userSelect: "text",
      scrollbarWidth: "thin",
      scrollbarColor: "var(--colors-line) transparent",
      "&::-webkit-scrollbar": {
        height: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "var(--colors-line)",
        borderRadius: "3px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
      },
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.1)",
      },
    },
  });

  const TextResultWrapper = styled("div", {
    base: {
      display: "flex",
      flexDirection: "column",
      borderColor: "line",
      borderRadius: "10px",
      backgroundColor: "rgba(0,0,0,0.05)",
      whiteSpace: "pre-wrap",
      width: "100%",
      minHeight: "100px",
      fontSize: "14px",
      color: "var(--colors-text)",
      fontFamily: "monospace",
      overflowX: "auto",
      wordBreak: "break-word",
      lineHeight: "1.4",
      letterSpacing: "0.5px",
      userSelect: "text",
      scrollbarWidth: "thin",
      scrollbarColor: "var(--colors-line) transparent",
      "&::-webkit-scrollbar": {
        height: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "var(--colors-line)",
        borderRadius: "3px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
      },
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.1)",
      },
    },
  });

  return (
    <Card>
      <div style="display:flex; gap:16px; align-items:center; justify-content:space-between">
        <QuizTitleBar>
          <Title>Quiz {props.q.id}</Title>
          <DateText>{createdDate}</DateText>
        </QuizTitleBar>
        <div style="display:flex; gap:10px; align-items:center">
          <StatusPill status={props.q.status} />
          <ButtonToggle onclick={() => setOpen((o) => !o)}>
            <Show when={open()} fallback={<FaSolidChevronDown />}>
              <FaSolidChevronUp />
            </Show>
          </ButtonToggle>
        </div>
      </div>

      <Show when={open()}>
        <QuizWrapper>
          <Question>
            <ScreenshootWrapper src={props.q.image_path} />
            <AnswersWrapper>
              <HeadingAnswer>Soal - OCR</HeadingAnswer>
              <OcrResultWrapper>
                {props.q.ocr_text ? (
                  props.q.ocr_text
                ) : (
                  <div style="font-size:14px; opacity:.8">Waiting…</div>
                )}
              </OcrResultWrapper>
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
                  <TextResultWrapper>{r.reason_text ?? ""}</TextResultWrapper>
                </div>
              )) ?? <div>Waiting…</div>}
            </Answers>
          </AnswersWrapper>
        </QuizWrapper>
      </Show>
    </Card>
  );
}

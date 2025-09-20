import { createSignal, For, onMount, Show } from "solid-js";
import { styled } from "styled-system/jsx";
import UploadDialog from "../components/UploadDialog";
import QuizCard from "../components/QuizCard";
import { quizzes } from "../store/quizzes";
import { useUserRoom } from "~/hooks/useWebSocket";
import Bot from "../assets/bot_3.png";

import { FiUpload } from "solid-icons/fi";

export default function Home() {
  const [openUpload, setOpenUpload] = createSignal(false);
  onMount(quizzes.loadInitial);
  useUserRoom();

  const Upload = styled("button", {
    base: {
      alignSelf: "center",
      gap: "2",
      bg: "brand",
      px: "4",
      py: "2",
      rounded: "md",
      border: "1px solid",
      borderColor: "line",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "black",
      cursor: "pointer",
      width: "200px",
      mt: "3",
      mb: "3",
    },
  });

  const BottomFloat = styled("div", {
    base: {
      position: "fixed",
      bottom: "0",
      left: "0",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      zIndex: 10,
      boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
      bg: "panel",
    },
  });

  const ButtonFeedback = styled("button", {
    base: {
      rounded: "md",
      border: "1px solid",
      borderColor: "line",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 10,
      bg: "card",
      alignSelf: "center",
      gap: "2",
      px: "4",
      py: "2",
      color: "text",
      mt: "3",
      mb: "3",
      ml: "3",
    },
  });

  const openNewTabFedback = () => {
    const url = import.meta.env.VITE_FEEDBACK_GFORMS_URL;
    window.open(url, "_blank");
  };

  const EmptyState = styled("div", {
    base: {
      textAlign: "center",
      color: "gray.500",
      mt: "10",
    },
  });

  const onClose = () => {
    setOpenUpload(false);
  };
  return (
    <>
      <BottomFloat>
        <Upload onClick={() => setOpenUpload(true)}>
          <FiUpload size={20} />
          Upload Quiz
        </Upload>
        <ButtonFeedback onClick={openNewTabFedback}>Feedback</ButtonFeedback>
      </BottomFloat>
      <For each={quizzes.items()}>{(q) => <QuizCard q={q} />}</For>
      <Show when={(quizzes.items()?.length ?? 0) === 0}>
        <EmptyState>
          <img
            src={Bot}
            alt="No quizzes"
            style={{ width: "150px", margin: "0 auto" }}
          />
          <p style={{ "margin-top": "1rem" }}>
            Hi! Glad you there!! let me introduce{" "}
            <b style="color:var(--colors-brand)">Lemme Project</b>,{" "}
          </p>
          <p>
            An AI-powered quiz solver that can help you answer multiple-choice
            questions from your quizzes. Just upload a screenshot of your quiz,
            and let the AI do the rest!
          </p>

          <p>
            By default, you will have{" "}
            <b style="color:var(--colors-brand)">10 coins</b>, which means you
            can upload quizzes 10 times. But don't worry, you can ask me
            whatsapp to add more coins! 😉
          </p>

          <hr style={{ "margin-top": "2rem", "margin-bottom": "2rem" }} />

          <p style={{ "margin-top": "1rem" }}>
            Click the <b style="color:var(--colors-brand)">Upload Quiz</b>{" "}
            button below to get started 🚀
          </p>
        </EmptyState>
      </Show>

      <UploadDialog open={openUpload()} onClose={onClose} />
    </>
  );
}

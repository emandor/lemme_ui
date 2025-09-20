import { createSignal, For, onMount } from "solid-js";
import { styled } from "styled-system/jsx";
import UploadDialog from "../components/UploadDialog";
import QuizCard from "../components/QuizCard";
import { quizzes } from "../store/quizzes";
import { useUserRoom } from "~/hooks/useWebSocket";

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
      // backdropFilter: "blur(10px)",
      boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
      bg: "panel",
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
      </BottomFloat>
      <For each={quizzes.items()}>{(q) => <QuizCard q={q} />}</For>
      <UploadDialog open={openUpload()} onClose={onClose} />
    </>
  );
}

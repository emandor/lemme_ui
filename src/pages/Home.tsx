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
    },
  });
  const onClose = () => {
    setOpenUpload(false);
  };
  return (
    <>
      <Upload onClick={() => setOpenUpload(true)}>
        <FiUpload />
        <span>Upload Screenshot</span>
      </Upload>
      <For each={quizzes.items()}>{(q) => <QuizCard q={q} />}</For>
      <UploadDialog open={openUpload()} onClose={onClose} />
    </>
  );
}

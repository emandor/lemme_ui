import { createSignal, Show } from "solid-js";
import { styled } from "styled-system/jsx";
import { uploadQuiz } from "../services/api";

export default function UploadDialog(props: {
  open: boolean;
  onClose: () => void;
}) {
  const [file, setFile] = createSignal<File | null>();
  const [preview, setPreview] = createSignal<string | null>();
  const Dialog = styled("div", {
    base: {
      position: "fixed",
      inset: "0",
      display: "grid",
      placeItems: "center",
      bg: "rgba(0,0,0,0.6)",
    },
  });
  const Panel = styled("div", {
    base: {
      w: ["90vw", "550px"],
      bg: "panel",
      p: "6",
      rounded: "xl",
      border: "1px solid",
      borderColor: "line",
    },
  });

  const Button = styled("button", {
    base: {
      px: "4",
      py: "2",
      rounded: "md",
      border: "1px solid",
      borderColor: "line",
      cursor: "pointer",
    },
  });

  const ButtonPrimary = styled(Button, {
    base: { bg: "brand", color: "black", borderColor: "brand" },
  });

  const DropArea = styled("div", {
    base: {
      border: "2px dashed",
      borderColor: "line",
      rounded: "lg",
      p: "6",
      textAlign: "center",
      color: "muted",
      cursor: "pointer",
    },
  });

  const Input = styled("input", {
    base: { display: "none" },
  });

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer?.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  async function submit() {
    if (!file()) return;
    await uploadQuiz(file()!);
    props.onClose();
  }
  const onClose = () => {
    setFile(null);
    setPreview(null);
    props.onClose();
  };

  return (
    <Show when={props.open}>
      <Dialog onClick={props.onClose}>
        <Panel onClick={(e) => e.stopPropagation()}>
          <h3 style={{ "font-weight": 700, "margin-bottom": "12px" }}>
            Upload your screenshot
          </h3>
          <Show when={!preview()}>
            <DropArea
              onClick={() => {
                document
                  .querySelector<HTMLInputElement>("#file-input")
                  ?.click();
              }}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              Click to select or drag and drop your image here
            </DropArea>
          </Show>
          <Input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.currentTarget.files?.[0];
              if (!f) return;
              setFile(f);
              setPreview(URL.createObjectURL(f));
            }}
          />
          <Show when={preview()}>
            <img
              src={preview() || ""}
              style={{
                width: "100%",
                "margin-top": "12px",
                "border-radius": "12px",
                border: "1px solid var(--colors-line)",
              }}
            />
          </Show>
          <div style="display:flex; gap:12px; margin-top:16px; justify-content:flex-end">
            <Button onClick={onClose}>Cancel</Button>
            <ButtonPrimary onClick={submit}>Lemme Process</ButtonPrimary>
          </div>
        </Panel>
      </Dialog>
    </Show>
  );
}

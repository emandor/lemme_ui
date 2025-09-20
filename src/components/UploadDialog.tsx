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
          <input
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
            <button
              onclick={onClose}
              style="padding:8px 14px; border:1px solid var(--colors-line); border-radius:10px;"
            >
              No, Change
            </button>
            <button
              onclick={submit}
              style="padding:8px 14px; background:var(--colors-success); color:black; border-radius:10px;"
            >
              Lemme Process
            </button>
          </div>
        </Panel>
      </Dialog>
    </Show>
  );
}

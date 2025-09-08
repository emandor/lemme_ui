import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";

// import { Trash2Icon } from "lucide-solid";
import { For } from "solid-js";
import { Button } from "./components/ui/button";
import { FileUpload } from "~/components/ui/file-upload";
import { IconButton } from "~/components/ui/icon-button";

export const Demo = (props: FileUpload.RootProps) => {
  return (
    <FileUpload.Root maxFiles={3} {...props}>
      <FileUpload.Dropzone>
        <FileUpload.Label>Drop your files here</FileUpload.Label>
        <FileUpload.Trigger
          asChild={(triggerProps) => (
            <Button size="sm" {...triggerProps()}>
              Open Dialog
            </Button>
          )}
        />
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {(fileUpload) => (
            <For each={fileUpload().acceptedFiles}>
              {(file) => (
                <FileUpload.Item file={file}>
                  <FileUpload.ItemPreview type="image/*">
                    <FileUpload.ItemPreviewImage />
                  </FileUpload.ItemPreview>
                  <FileUpload.ItemName />
                  <FileUpload.ItemSizeText />
                  <FileUpload.ItemDeleteTrigger
                    asChild={(triggerProps) => (
                      <IconButton variant="link" size="sm" {...triggerProps()}>
                        {/* <Trash2Icon /> */}
                      </IconButton>
                    )}
                  />
                </FileUpload.Item>
              )}
            </For>
          )}
        </FileUpload.Context>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  );
};

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <Demo />
        <Button>Solid Button</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;

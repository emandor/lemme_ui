import "./index.css";

import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { Layout } from "./components/Layout";
import routes from "./routes";

render(
  // @ts-ignore
  () => <Router root={Layout}>{routes}</Router>,
  document.getElementById("root") as HTMLElement,
);

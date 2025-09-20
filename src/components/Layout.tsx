import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { styled } from "styled-system/jsx";
import { useAuth } from "../hooks/useAuth";
import { createMemo, createSignal, onMount } from "solid-js";
import { publicRoutes, routesByName } from "../routes";

import TopBar from "../components/TopBar";

const homeRoute = routesByName["Home"];
const loginRoute = routesByName["Login"];

export const Layout = (props: RouteSectionProps) => {
  const nav = useNavigate();
  const [path, setPath] = createSignal(props.location.pathname);

  const Page = styled("div", { base: { minH: "100dvh", bg: "bg" } });
  const Wrap = styled("div", {
    base: { maxW: "980px", mx: "auto", p: "5", display: "grid", gap: "12px" },
  });

  const { ensureAuth, user } = useAuth({
    onAuthenticated() {
      nav(homeRoute.path, { replace: true });
      setPath(homeRoute.path);
    },
    onUnauthenticated() {
      nav(loginRoute.path, { replace: true });
      setPath(loginRoute.path);
    },
  });

  onMount(ensureAuth);
  const showTopBar = createMemo(
    () => !publicRoutes.some((r) => r.path === path()),
    [path()],
  );

  return (
    <Page>
      {showTopBar() && <TopBar />}
      <Wrap style={{ padding: "1rem" }}>{props.children}</Wrap>
      <footer
        style={{
          padding: "1rem",
        }}
      >
        <p>&copy; 2025</p>
      </footer>
    </Page>
  );
};

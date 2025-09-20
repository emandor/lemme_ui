import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { styled } from "styled-system/jsx";
import { useAuth } from "../hooks/useAuth";
import { createMemo, createSignal, onMount } from "solid-js";
import { publicRoutes, routesByName } from "../routes";

import Bot from "../assets/bot_3.png";

import TopBar from "../components/TopBar";

const homeRoute = routesByName["Home"];
const loginRoute = routesByName["Login"];

export const Layout = (props: RouteSectionProps) => {
  const nav = useNavigate();
  const [path, setPath] = createSignal(props.location.pathname);

  const Page = styled("div", { base: { minH: "10dvh", bg: "bg" } });
  const Wrap = styled("div", {
    base: { maxW: "980px", mx: "auto", p: "5", display: "grid", gap: "12px" },
  });

  const { ensureAuth } = useAuth({
    onAuthenticated() {
      // nav(homeRoute.path, { replace: true });
      // setPath(homeRoute.path);
    },
    onUnauthenticated() {
      // nav(loginRoute.path, { replace: true });
      // setPath(loginRoute.path);
    },
  });

  onMount(ensureAuth);
  const showTopBar = createMemo(
    () => !publicRoutes.some((r) => r.path === path()),
    [path()],
  );

  const FooterWrapper = styled("div", {
    base: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      mt: "10",
      mb: "5",
      color: "muted",
      fontSize: "sm",
    },
  });

  return (
    <Page>
      {showTopBar() && <TopBar />}
      <Wrap style={{ padding: "1rem" }}>{props.children}</Wrap>
      <FooterWrapper>
        Made with ❤️ by
        <img src={Bot} alt="me" style={{ width: "35px" }} />
      </FooterWrapper>
    </Page>
  );
};

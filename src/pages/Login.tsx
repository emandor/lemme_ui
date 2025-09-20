import GoogleLoginButton from "../components/GoogleLoginButton";
import { styled } from "styled-system/jsx";
import logo from "../assets/logo.png";

export default function Login() {
  const Box = styled("div", {
    base: {
      minH: "10dvh",
      display: "grid",
      placeItems: "center",
      bg: "bg",
      mt: "20dvh",
    },
  });
  const Panel = styled("div", {
    base: {
      bg: "panel",
      p: "10",
      rounded: "2xl",
      border: "1px solid",
      borderColor: "line",
      w: ["92vw", "520px"],
    },
  });
  const Brand = styled("div", {
    base: {
      mb: "6",
      display: "flex",
      justifyContent: "center",
    },
  });
  return (
    <Box>
      <Panel>
        <Brand>
          <img src={logo} alt="Logo" style={{ height: "90px" }} />
        </Brand>
        <div style="display:flex; justify-content:center">
          <GoogleLoginButton />
        </div>
      </Panel>
    </Box>
  );
}

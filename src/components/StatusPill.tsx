import { styled } from "styled-system/jsx";

export default function StatusPill(props: {
  status: "pending" | "processing" | "completed";
}) {
  const bg =
    props.status === "completed"
      ? "success"
      : props.status === "pending"
        ? "warning"
        : "brand";
  const Pill = styled("span", {
    base: {
      px: "3",
      py: "1",
      rounded: "full",
      border: "1px solid",
      borderColor: "line",
      color: "white",
      bg,
      fontSize: "xs",
    },
  });
  return <Pill>{props.status}</Pill>;
}

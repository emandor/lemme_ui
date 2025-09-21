import { styled } from "styled-system/jsx";

const Pill = styled("span", {
  base: {
    px: "3",
    py: "1",
    rounded: "full",
    border: "1px solid",
    borderColor: "line",
    color: "white",
    fontSize: "xs",
  },
  variants: {
    status: {
      completed: { bg: "success" },
      pending: { bg: "warning" },
      processing: { bg: "brand" },
    },
  },
});

export default function StatusPill(props: {
  status: "pending" | "processing" | "completed";
}) {
  return <Pill status={props.status}>{props.status}</Pill>;
}

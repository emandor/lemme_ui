export type WSClientMessage =
  | { action: "join"; room: string }
  | { action: "leave"; room: string };

export type WSPayloadEvents =
  | {
      event: "quiz.event.answered";
      source: "OPENAI" | "CLAUDE" | "GEMINI";
      data: {
        quiz_id: string;
        answer?: string;
        reason?: string;
        raw?: string;
      };
    }
  | {
      event: "quiz.event.ocr_done";
      data: {
        ocr_text: string;
        quiz_id: string;
      };
    }
  | {
      event: "quiz.event.created";
      data: {
        quiz_id: string;
        image_path?: string;
      };
    }
  | {
      event: "quiz.event.completed";
      data: {
        quiz_id: string;
      };
    };

export function connectWS(
  onMessage: (data: WSPayloadEvents) => void,
  onOpen?: (ws: WebSocket) => void,
) {
  const WS_URL = import.meta.env.VITE_WS_URL as string;

  const ws = new WebSocket(WS_URL);

  ws.onmessage = (event) => {
    try {
      const data: WSPayloadEvents = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error("Invalid WS message:", err);
    }
  };

  ws.onopen = () => {
    if (onOpen) onOpen(ws);
  };

  return () => {
    ws.close();
  };
}

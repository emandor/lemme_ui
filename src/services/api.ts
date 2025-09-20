import ky from "ky";

const API_URL = import.meta.env.VITE_API_URL || "";
export const api = ky.create({
  prefixUrl: API_URL, // akan hilang saat proxy dev
  credentials: "include", // kirim cookie session
  timeout: 20000,
  hooks: {
    beforeRequest: [
      (req) => {
        // JSON default
        req.headers.set("Accept", "application/json");
      },
    ],
    afterResponse: [
      async (_req, _opt, res) => {
        if (!res.ok && res.status === 401) {
          // biarkan UI handle
        }
      },
    ],
  },
});

export type Quiz = {
  id: string;
  title?: string;
  status: "pending" | "processing" | "completed";
  ocr_text?: string;
  answers?: {
    source: "OPENAI" | "CLAUDE" | "GEMINI";
    answer_text?: string;
    reason_text?: string;
  }[];
  created_at: string;
  image_path?: string;
};

export const getQuizzes = () => api.get("api/v1/quizzes").json<Quiz[]>();

type UploadResponse = {
  id: number;
  status: string;
  image_path: string;
};

export const uploadQuiz = (file: File) => {
  const form = new FormData();
  form.append("image", file);
  return api.post("api/v1/quizzes", { body: form }).json<UploadResponse>();
};

export type UserProfile = {
  id: number;
  email: string;
  name?: string | null;
  picture?: string | null;
  quiz_used: number;
  quiz_quota: number;
  created_at?: string;
};

export const me = () => api.get("api/v1/me").json<UserProfile>();

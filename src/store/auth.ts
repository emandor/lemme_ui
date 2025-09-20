import { createSignal } from "solid-js";
import { me, UserProfile } from "../services/api";

const [token, setToken] = createSignal<string | null>(
  localStorage.getItem("token"),
);
const [user, setUser] = createSignal<UserProfile | null>(null);

const [checked, setChecked] = createSignal(false);

export async function hydrateSession() {
  if (!token()) return;
  try {
    setUser(await me());
  } catch {
    logout();
  }
}
export function loginWithToken(t: string) {
  localStorage.setItem("token", t);
  setToken(t);
}
export function logout() {
  localStorage.removeItem("token");
  setToken(null);
  setUser(null);
}

export const session = { token, user, setUser, checked, setChecked };

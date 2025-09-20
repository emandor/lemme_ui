import { createSignal } from "solid-js";
import { UserProfile } from "../services/api";

const [user, setUser] = createSignal<UserProfile | null>(null);

const [checked, setChecked] = createSignal(false);

export const session = { user, setUser, checked, setChecked };

import { session } from "../store/auth";
import { me } from "../services/api";

type UseAuthProps = {
  onUnauthenticated?: () => void;
  onAuthenticated?: () => void;
};

export function useAuth(props?: UseAuthProps) {
  const { user, setUser, checked, setChecked } = session;

  async function ensureAuth() {
    if (checked()) return;
    try {
      const profile = await me();
      setUser(profile);
      props?.onAuthenticated?.();
    } catch {
      setUser(null);
      props?.onUnauthenticated?.();
    } finally {
      setChecked(true);
    }
  }

  function loginWithGoogle() {
    const API = import.meta.env.VITE_API_URL || "";
    const FE = import.meta.env.VITE_FRONTEND_URL || window.location.origin;
    const redirectUrl = `${API}/api/v1/auth/google/login?redirect=${encodeURIComponent(FE + "/auth/done")}`;
    window.location.href = redirectUrl;
  }

  function logoutLocal() {
    setUser(null);
    setChecked(false);
  }

  return { user, checked, ensureAuth, loginWithGoogle, logoutLocal };
}

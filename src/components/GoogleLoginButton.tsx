const API = import.meta.env.VITE_API_URL || "";
const FE = import.meta.env.VITE_FRONTEND_URL || window.location.origin;

export default function GoogleLoginButton() {
  function loginWithGoogle() {
    const redirectUrl = `${API}/api/v1/auth/google/login?redirect=${encodeURIComponent(FE + "/auth/done")}`;
    window.location.href = redirectUrl;
  }
  return (
    <a
      type="button"
      onClick={loginWithGoogle}
      style="
      display:inline-flex; align-items:center; gap:10px;
      padding:12px 16px; border:1px solid var(--colors-line);
      cursor:pointer; font-weight:600; color:#eee;
      border-radius:14px; background:#111; "
    >
      <img src="https://www.google.com/favicon.ico" width="18" height="18" />
      Login Gmail UBL
    </a>
  );
}

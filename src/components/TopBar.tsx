import logo from "~/assets/logo.png";
import { styled } from "styled-system/jsx";
import { createMemo } from "solid-js";
import { useAuth } from "~/hooks/useAuth";
import { logout } from "~/services/api";

export default function TopBar() {
  const { user } = useAuth();
  const userName = createMemo(
    () => (user() ? user()?.name || "User" : "Guest"),
    [user()],
  );
  const userAvatar = createMemo(
    () =>
      user
        ? user()?.picture || "https://via.placeholder.com/40"
        : "https://via.placeholder.com/40",
    [user()],
  );
  //
  //
  //
  const quotaRemaining = createMemo(() => {
    if (!user()) return 0;
    return (user()?.quiz_quota ?? 0) - (user()?.quiz_used ?? 1);
  }, [user()]);

  const Bar = styled("div", {
    base: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      bg: "panel",
      px: "6",
      py: "3",
      borderBottom: "1px solid",
      borderColor: "line",
      position: "sticky",
      top: "0",
      zIndex: 10,
    },
  });
  const Brand = styled("div", {
    base: { fontWeight: 700, fontSize: "xl", color: "brand" },
  });

  const User = styled("div", {
    base: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  });

  const UserName = styled("h4", {
    base: { fontWeight: "500", margin: 0 },
  });

  const UserQuota = styled("span", {
    base: { fontSize: "sm", color: "brand" },
  });
  const UserLogout = styled("button", {
    base: {
      bg: "transparent",
      border: "none",
      color: "red.500",
      cursor: "pointer",
      padding: 0,
      fontSize: "sm",
      textDecoration: "underline",
    },
  });

  const UserInfo = styled("div", {
    base: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
    },
  });

  const handleLogout = () => {
    logout()
      .then(() => {
        window.location.href = "/login";
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        window.location.href = "/login";
      });
  };

  return (
    <Bar>
      <Brand>
        <img src={logo} alt="Logo" style={{ height: "40px" }} />
      </Brand>
      <User>
        <UserName>{userName()}</UserName>
        <UserInfo>
          <UserQuota>
            <b>{quotaRemaining()}</b>
            {quotaRemaining() === 1 ? " coin" : " coins"} left
          </UserQuota>
          <span>|</span>
          <UserLogout onClick={handleLogout}>Logout</UserLogout>
        </UserInfo>

        {/* <img */}
        {/*   src={userAvatar() || "https://via.placeholder.com/40"} */}
        {/*   alt="User Avatar" */}
        {/*   style={{ width: "40px", height: "40px", "border-radius": "50%" }} */}
        {/* /> */}
      </User>
    </Bar>
  );
}

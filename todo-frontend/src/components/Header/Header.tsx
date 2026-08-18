import "./Header.scss";
import { useState } from "react";
import type { TFormStatus, IUserData } from "../../types/type";
import { Terminal } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { userApi } from "../../store/api/user.api";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const Header = () => {
  const [formStatus, setFormStatus] = useState<TFormStatus>("");

  const [userData, setUserData] = useState<IUserData>({
    username: "",
    email: "",
    password: "",
  });

  const {
    registerUser,
    logInUser,
    logOutUser,

    isRegisterLoading,
    isRegisterError,
    registerError,

    isLogInLoading: isLoginLoading,
    isLogInError: isLoginError,
    logInError: loginError,
  } = useAuth();

  const { data, isLoading } = userApi.useGetMeQuery();

  const handleRegister = async (data: IUserData, e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await registerUser(data);
      setFormStatus("");
      setUserData({ username: "", email: "", password: "" });
    } catch {
      // Handled by Redux error state
    }
  };

  const handleLogin = async (data: IUserData, e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { username, ...loginData } = data;
      await logInUser(loginData);
      setFormStatus("");
      setUserData({ username: "", email: "", password: "" });
    } catch {
      // Handled by Redux error state
    }
  };

  const handleLogOut = () => {
    logOutUser();
    setUserData({
      username: "",
      email: "",
      password: "",
    });
    setFormStatus("");
  };

  if (isRegisterLoading || isLoginLoading || isLoading) {
    return (
      <div className="header-loading">
        <div className="header-loading__spinner" />
        <p className="header-loading__text">Loading...</p>
      </div>
    );
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__logo">
            <div className="header__logo-icon">
              <Terminal size={22} />
            </div>
            <h1 className="header__logo-text">
              <span className="header__logo-first">~/</span>
              <span className="header__logo-second">todo</span>
            </h1>
          </div>

          {!data?.id ? (
            <div className="header__auth">
              <div className="header__auth-buttons">
                <button
                  className={`header__auth-tab ${formStatus === "login" ? "header__auth-tab--active" : ""}`}
                  onClick={() => setFormStatus("login")}
                >
                  Login
                </button>
                <button
                  className={`header__auth-tab ${formStatus === "register" ? "header__auth-tab--active" : ""}`}
                  onClick={() => setFormStatus("register")}
                >
                  Register
                </button>
              </div>

              {formStatus !== "" && (
                <form className="header__form">
                  <input
                    className="header__form-input"
                    type="email"
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    value={userData.email}
                    placeholder="Email"
                    autoComplete="email"
                  />
                  {formStatus === "register" && (
                    <input
                      className="header__form-input"
                      type="text"
                      onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                      value={userData.username}
                      placeholder="Username"
                      autoComplete="username"
                    />
                  )}
                  <input
                    className="header__form-input"
                    type="password"
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    id="password__input"
                    value={userData.password}
                    placeholder="Password"
                    autoComplete="current-password"
                  />

                  {isLoginError && (
                    <div className="header__form-error">
                      {getErrorMessage(loginError)}
                    </div>
                  )}
                  {isRegisterError && (
                    <div className="header__form-error">
                      {getErrorMessage(registerError)}
                    </div>
                  )}

                  {formStatus === "register" ? (
                    <button
                      type="submit"
                      className="header__form-submit"
                      onClick={(event) => handleRegister(userData, event)}
                    >
                      Create Account
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="header__form-submit"
                      onClick={(event) => handleLogin(userData, event)}
                    >
                      Sign In
                    </button>
                  )}
                </form>
              )}
            </div>
          ) : (
            <div className="header__user">
              <div className="header__user-avatar">
                {data?.username?.charAt(0).toUpperCase()}
              </div>
              <div className="header__user-info">
                <p className="header__user-name">{data?.username}</p>
                <p className="header__user-email">{data?.email}</p>
              </div>
              <button className="header__user-logout" onClick={handleLogOut}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

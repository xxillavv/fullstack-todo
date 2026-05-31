import "./Header.scss";
import { useState, useEffect } from "react";
import type { TFormStatus, IUserData } from "../../types/type";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { userApi } from "../../store/api/user.api";
import { useUsers } from "../../hooks/useUsers";

export const Header = () => {
  const { user, setUser, resetUser } = useUsers();

  const {
    registerUser: regUser,
    logInUser: loginUser,
    logOutUser,

    isRegisterLoading,
    isRegisterError,
    registerError,

    isLogInLoading: isLoginLoading,
    isLogInError: isLoginError,
    logInError: loginError,
  } = useAuth();
  const [getMe] = userApi.useGetMeMutation();

  const [formStatus, setFormStatus] = useState<TFormStatus>("");

  const [userData, setUserData] = useState<IUserData>({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) return;

    const fetchMe = async () => {
      try {
        const result = await getMe(accessToken).unwrap();
        setUser(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMe();
  }, []);

  const handleRegister = async (data: IUserData, e: React.SyntheticEvent) => {
    e.preventDefault();

    const result = await regUser(data);
    setUser(result.data);
  };

  const handleLogin = async (data: IUserData, e: React.SyntheticEvent) => {
    e.preventDefault();

    const { username, ...loginData } = data;
    const result = await loginUser(loginData);

    setUser(result.data);
  };

  const handleLogOut = () => {
    logOutUser();
    resetUser();
  };

  if (isRegisterLoading || isLoginLoading) {
    return <p className="loading__title">Loading...</p>;
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <img src={logo} alt="website_logo" className="header__inner-logo" />

          {user?.id === null ? (
            <div className="header__auth">
              <button
                className="header__auth-button"
                onClick={() => setFormStatus("login")}
              >
                Login
              </button>
              <button
                className="header__auth-button"
                onClick={() => setFormStatus("register")}
              >
                Register
              </button>

              {formStatus !== "" && (
                <form className="auth__form">
                  <input
                    className="auth__form-input"
                    type="text"
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    value={userData.email}
                    placeholder="enter email"
                  />
                  {formStatus === "register" && (
                    <input
                      className="auth__form-input"
                      type="text"
                      onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                      value={userData.username}
                      placeholder="enter username"
                    />
                  )}
                  <input
                    className="auth__form-input"
                    type="text"
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    id="password__input"
                    value={userData.password}
                    placeholder="enter password"
                  />
                  {isLoginError && (
                    <label
                      className="auth__form-label"
                      htmlFor="password__input"
                    >
                      {(loginError as any)?.data?.message}
                    </label>
                  )}
                  {isRegisterError && (
                    <label
                      className="auth__form-label"
                      htmlFor="password__input"
                    >
                      {(registerError as any)?.data?.message}
                    </label>
                  )}

                  {formStatus === "register" ? (
                    <button
                      type="submit"
                      className="auth__form-button"
                      onClick={(event) => handleRegister(userData, event)}
                    >
                      Register
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="auth__form-button"
                      onClick={(event) => handleLogin(userData, event)}
                    >
                      Login
                    </button>
                  )}
                </form>
              )}
            </div>
          ) : (
            <div className="header__user">
              <p className="header__user-name">{user?.username}</p>
              <p className="header__user-email">{user?.email}</p>
              <button className="header__user-button" onClick={handleLogOut}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

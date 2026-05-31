import notLoginLogo from "../../assets/Grey_close_x.svg";
import "./NotLoginPage.scss";

export const NotLoginPage = () => {
  return (
    <section className="login">
      <div className="container">
        <div className="login__inner">
          <img
            src={notLoginLogo}
            alt="empty_state"
            className="login__inner-img"
          />

          <p className="login__inner-title">
            You are not login or register yet.
          </p>
          <p className="login__inner-subtitle">
            Please login or register account to create new tasks.
          </p>
        </div>
      </div>
    </section>
  );
};

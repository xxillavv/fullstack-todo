import { LogIn } from "lucide-react";
import "./NotLoginPage.scss";

export const NotLoginPage = () => {
  return (
    <section className="not-logged">
      <div className="container">
        <div className="not-logged__card">
          <div className="not-logged__icon">
            <LogIn size={40} />
          </div>

          <h2 className="not-logged__title">
            You're not logged in yet
          </h2>
          <p className="not-logged__subtitle">
            Please login or register to start creating tasks
          </p>
        </div>
      </div>
    </section>
  );
};

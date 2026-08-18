import type { JSX } from "react";
import { Header } from "../components/Header/Header";
import { Inputs } from "../components/Inputs/Inputs";
import { Tasks } from "../components/Tasks/Tasks";
import { Footer } from "../components/Footer/Footer";

export const MainPage = (): JSX.Element => {
  return (
    <div className="page-layout">
      <Header />
      <main className="page-main">
        <Inputs />
        <Tasks />
      </main>
      <Footer />
    </div>
  );
};

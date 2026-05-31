import type { JSX } from "react";
import { Header } from "../components/Header/Header";
import { Inputs } from "../components/Inputs/Inputs";
import { Tasks } from "../components/Tasks/Tasks";

export const MainPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Inputs />
        <Tasks />
      </main>
    </>
  );
};

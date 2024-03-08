import React from "react";
import { AppRoutes } from "./components/routes";
import "./App.css";
interface Props {}
export const App: React.FC<Props> = () => {
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;

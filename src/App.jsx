import React from "react";
import MonthlyExpense from "./charts/bar/MonthlyExpense";

function App() {
  return (
    <div style={{ display: "flex", paddingTop: "2.5rem" }}>
      <MonthlyExpense />
    </div>
  );
}

export default App;

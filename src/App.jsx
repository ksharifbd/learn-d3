import React from "react";
import ProductPrice from "./charts/bar/ProductPrice";
import MonthlyExpense from "./charts/bar/MonthlyExpense";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <ProductPrice />
      <MonthlyExpense />
    </div>
  );
}

export default App;

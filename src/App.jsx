import React from "react";
import Circle from "./shapes/Circle";
import Rectangle from "./shapes/Rectangle";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Circle />
      <Rectangle />
    </div>
  );
}

export default App;

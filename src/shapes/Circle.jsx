import React, { useRef, useEffect } from "react";
import appendSvg from "../util/appendSvg";

const Circle = () => {
  const circleAreaElement = useRef(null);

  useEffect(() => {
    const svg = appendSvg(circleAreaElement.current, {
      height: 400,
      width: 400,
    });

    svg
      .append("circle")
      .attr("cx", 200)
      .attr("cy", 200)
      .attr("r", 100)
      .attr("fill", "blue");
  }, []);

  return <div ref={circleAreaElement} />;
};

export default Circle;

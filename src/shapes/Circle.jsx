import React, { useRef, useEffect } from "react";
import appendSvg from "../util/appendSvg";

const Circle = () => {
  const circleAreaElement = useRef(null);

  useEffect(() => {
    const svg = appendSvg(circleAreaElement.current, {
      height: 400,
      width: 400,
    });

    const data = [25, 20, 10, 12, 15];

    let circles = svg.selectAll("circle").data(data);

    circles
      .enter()
      .append("circle")
      .attr("cx", (data, index) => index * 50 + 25)
      .attr("cy", 25)
      .attr("r", (data) => data)
      .attr("fill", "blue");
  }, []);

  return <div ref={circleAreaElement} />;
};

export default Circle;

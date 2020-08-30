import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import appendSvg from "../util/appendSvg";

const Circle = () => {
  const circleAreaElement = useRef(null);

  useEffect(() => {
    (async () => {
      const svg = appendSvg(circleAreaElement.current, {
        height: 400,
        width: 400,
      });

      const data = await d3.json(
        "https://run.mocky.io/v3/a67e82e6-847e-4e7f-951e-3f7f34815f27",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      let circles = svg.selectAll("circle").data(data);

      circles
        .enter()
        .append("circle")
        .attr("cx", (data, index) => index * 50 + 25)
        .attr("cy", 25)
        .attr("r", ({ age }) => age * 2)
        .attr("fill", "blue");
    })();
  }, []);

  return <div ref={circleAreaElement} />;
};

export default Circle;

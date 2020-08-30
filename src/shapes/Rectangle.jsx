import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import appendSvg from "../util/appendSvg";

const Reactangle = () => {
  const rectAreaElement = useRef(null);

  useEffect(() => {
    (async () => {
      const svg = appendSvg(rectAreaElement.current, {
        height: 400,
        width: 400,
      });

      const data = await d3.json(
        "https://run.mocky.io/v3/54a05b08-9c02-4143-b206-a6f8d149522e",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      let rects = svg.selectAll("rect").data(data);

      rects
        .enter()
        .append("rect")
        .attr("x", (data, index) => index * 50 + 25)
        .attr("y", 20)
        .attr("height", ({ height }) => Number(height) / 2)
        .attr("width", 20)
        .attr("fill", "grey");
    })();
  }, []);

  return <div ref={rectAreaElement} />;
};

export default Reactangle;

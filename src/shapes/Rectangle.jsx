import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import appendSvg from "../util/appendSvg";

const Reactangle = () => {
  const rectAreaElement = useRef(null);

  useEffect(() => {
    (async () => {
      const svg = appendSvg(rectAreaElement.current, {
        height: 300,
        width: 300,
      });

      const data = await d3.json(
        "https://5f4d0702eeec51001608e7a7.mockapi.io/api/learn-d3/products",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      let rects = svg.selectAll("rect").data(data);

      const yScaleLienear = d3.scaleLinear().domain([0, 1000]).range([0, 200]);

      console.log(yScaleLienear);

      rects
        .enter()
        .append("rect")
        .attr("x", (data, index) => index * 50 + 25)
        .attr("y", 20)
        .attr("height", ({ price }) => yScaleLienear(Number(price)))
        .attr("width", 20)
        .attr("fill", "grey");
    })();
  }, []);

  return <div ref={rectAreaElement} />;
};

export default Reactangle;

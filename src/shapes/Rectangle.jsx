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

      const yScale = d3.scaleLinear().domain([0, 1000]).range([0, 200]);

      const xScale = d3
        .scaleBand()
        .domain([
          "Intelligent Metal Chair",
          "Small Fresh Hat",
          "Practical Soft Gloves",
          "Refined Rubber Sausages",
          "Small Frozen Table",
          "Unbranded Granite Shoes",
          "Handcrafted Metal Chicken",
          "Incredible Fresh Chips",
          "Awesome Cotton Bacon",
          "Generic Concrete Mouse",
        ])
        .range([0, 300])
        .paddingInner(0.3)
        .paddingOuter(0.2);

      rects
        .enter()
        .append("rect")
        .attr("x", ({ productName }) => xScale(productName))
        .attr("y", 20)
        .attr("height", ({ price }) => yScale(Number(price)))
        .attr("width", xScale.bandwidth)
        .attr("fill", "grey");
    })();
  }, []);

  return <div ref={rectAreaElement} />;
};

export default Reactangle;

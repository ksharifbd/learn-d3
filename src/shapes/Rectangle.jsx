import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import appendSvg from "../util/appendSvg";

const margin = {
  top: 10,
  right: 10,
  bottom: 100,
  left: 100,
};

const height = 400 - (margin.top + margin.bottom);
const width = 600 - (margin.right + margin.left);

const Reactangle = () => {
  const rectAreaElement = useRef(null);

  useEffect(() => {
    (async () => {
      const svg = appendSvg(rectAreaElement.current, {
        height: height + margin.top + margin.bottom,
        width: width + margin.right + margin.left,
      });

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const products = await d3.json(
        "https://5f4d0702eeec51001608e7a7.mockapi.io/api/learn-d3/products",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      let rects = g.selectAll("rect").data(products);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(products, ({ price }) => price)])
        .range([0, height]);

      const xScale = d3
        .scaleBand()
        .domain(products.map(({ productName }) => productName))
        .range([0, width])
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

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import appendSvg from "../../util/appendSvg";

const margin = {
  top: 10,
  right: 10,
  bottom: 150,
  left: 100,
};

const height = 400 - (margin.top + margin.bottom);
const width = 600 - (margin.right + margin.left);

const ProductPrice = () => {
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
        .range([height, 0]);

      const xScale = d3
        .scaleBand()
        .domain(products.map(({ productName }) => productName))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.2);

      const xAxisCall = d3.axisBottom(xScale);
      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height + 20})`)
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

      const yAxisCall = d3.axisLeft(yScale);
      g.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(0, ${20})`)
        .call(yAxisCall);

      // X-axis label
      g.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + 140)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Products");

      // Y-axis label
      g.append("text")
        .attr("class", "y-axis-label")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Price (USD)");

      rects
        .enter()
        .append("rect")
        .attr("x", ({ productName }) => xScale(productName))
        .attr("y", ({ price }) => yScale(Number(price)) + 20)
        .attr("height", ({ price }) => height - yScale(Number(price)))
        .attr("width", xScale.bandwidth)
        .attr("fill", "grey");
    })();
  }, []);

  return <div ref={rectAreaElement} />;
};

export default ProductPrice;

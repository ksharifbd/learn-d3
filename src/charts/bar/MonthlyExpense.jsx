import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import appendSvg from "../../util/appendSvg";

const svgHeight = 400;
const svgWidth = 600;

const margin = {
  top: 10,
  right: 10,
  bottom: 100,
  left: 100,
};

const scaleHeight = svgHeight - (margin.top + margin.bottom);
const scaleWidth = svgWidth - (margin.left + margin.right);

const MonthlyExpense = () => {
  const chartAreaElement = useRef(null);

  useEffect(() => {
    (async () => {
      const expensesFromApi = await d3.json(
        "https://5f4d0702eeec51001608e7a7.mockapi.io/api/learn-d3/expenses",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const svg = appendSvg(chartAreaElement.current, {
        height: svgHeight,
        width: svgWidth,
      });

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const rects = g.selectAll("rect").data(expensesFromApi);

      const yScale = d3.scaleLinear().range([scaleHeight, 0]);

      const xScale = d3
        .scaleBand()

        .range([0, scaleWidth])
        .paddingInner(0.2)
        .paddingOuter(0.2);

      const xAxisGroup = g
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${scaleHeight})`);

      const yAxisGroup = g.append("g").attr("class", "y-axis");

      const update = (expenses) => {
        yScale.domain([0, d3.max(expenses, ({ expense }) => Number(expense))]);

        xScale.domain(expenses.map(({ month }) => month));

        // x axis tick
        const xAxisCall = d3.axisBottom(xScale);
        xAxisGroup
          .call(xAxisCall)
          .selectAll("text")
          .attr("y", "10")
          .attr("x", "-10")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-40)");

        const yAxisCall = d3.axisLeft(yScale);
        yAxisGroup.call(yAxisCall);

        // rects
        //   .enter()
        //   .append("rect")
        //   .attr("x", ({ month }) => Math.floor(xScale(month)))
        //   .attr("y", ({ expense }) => Math.floor(yScale(Number(expense))))
        //   .attr(
        //     "height",
        //     ({ expense }) => scaleHeight - Math.floor(yScale(Number(expense)))
        //   )
        //   .attr("width", xScale.bandwidth)
        //   .attr("fill", "orange");
      };

      d3.interval(() => {
        update(expensesFromApi);
      }, 1000);

      update(expensesFromApi);
    })();
  }, []);

  return <div ref={chartAreaElement}></div>;
};

export default MonthlyExpense;

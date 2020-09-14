import React, { useRef, useState, useEffect } from "react";
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

let svg;
let g;
let yScale;
let xScale;
let yAxisGroup;
let xAxisGroup;
let xAxisLabel;

const MonthlyExpense = () => {
  const chartAreaElement = useRef(null);
  const [expenses, setExpenses] = useState([]);
  const [lastThreeMonths, setLastThreeMonths] = useState(false);

  const toggleView = () => {
    setLastThreeMonths((value) => !value);
  };

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

      setExpenses(expensesFromApi);

      svg = appendSvg(chartAreaElement.current, {
        height: svgHeight,
        width: svgWidth,
      });

      g = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      yScale = d3.scaleLinear().range([scaleHeight, 0]);

      xScale = d3
        .scaleBand()
        .range([0, scaleWidth])
        .paddingInner(0.2)
        .paddingOuter(0.2);

      xAxisGroup = g
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${scaleHeight})`);

      yAxisGroup = g.append("g").attr("class", "y-axis");

      // X-axis label
      xAxisLabel = g
        .append("text")
        .attr("class", "x-axis-label")
        .attr("x", scaleWidth / 2)
        .attr("y", scaleHeight + 75)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle");

      // Y-axis label
      g.append("text")
        .attr("class", "y-axis-label")
        .attr("x", -(scaleHeight / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Expense (BDT)");
    })();
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      const lastThreeMonthsData = expenses.slice(-3);

      const expenseData = lastThreeMonths ? lastThreeMonthsData : expenses;

      yScale.domain([0, d3.max(expenseData, ({ expense }) => Number(expense))]);

      xScale.domain(expenseData.map(({ month }) => month));

      // x axis tick
      const xAxisCall = d3.axisBottom(xScale);
      xAxisGroup
        .transition(d3.transition().duration())
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-10")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

      const yAxisCall = d3.axisLeft(yScale);
      yAxisGroup.transition(d3.transition().duration()).call(yAxisCall);

      xAxisLabel.text(lastThreeMonths ? "Last 3 months" : "12 months");

      const rects = g.selectAll("rect").data(expenseData, ({ month }) => month);

      rects
        .exit()
        .attr("fill", "red")
        .transition(d3.transition().duration())
        .attr("height", 0)
        .attr("y", yScale(0))
        .remove();

      rects
        .enter()
        .append("rect")
        .attr("y", yScale(0))
        .attr("height", 0)
        .merge(rects)
        .transition(d3.transition().duration())
        .attr("x", ({ month }) => Math.floor(xScale(month)))
        .attr("y", ({ expense }) => Math.floor(yScale(Number(expense))))
        .attr(
          "height",
          ({ expense }) => scaleHeight - Math.floor(yScale(Number(expense)))
        )
        .attr("width", xScale.bandwidth)
        .attr("fill", "orange");
    }
  }, [expenses, lastThreeMonths]);

  return (
    <div>
      <div ref={chartAreaElement}></div>
      <div style={{ textAlign: "center" }}>
        <button onClick={toggleView}>{`See ${
          lastThreeMonths ? "all month" : "last 3 months"
        }`}</button>
      </div>
    </div>
  );
};

export default MonthlyExpense;

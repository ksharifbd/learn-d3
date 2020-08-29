import * as d3 from "d3";

const appendSvg = (element, options) =>
  d3
    .select(element)
    .append("svg")
    .attr("height", options.height)
    .attr("width", options.width);

export default appendSvg;

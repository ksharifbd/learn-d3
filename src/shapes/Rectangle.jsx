import React, { useRef, useEffect } from "react";
import appendSvg from "../util/appendSvg";

const Reactangle = () => {
  const rectAreaElement = useRef(null);

  useEffect(() => {
    const svg = appendSvg(rectAreaElement.current, {
      height: 400,
      width: 400,
    });

    svg
      .append("rect")
      .attr("x", 20)
      .attr("y", 20)
      .attr("height", 200)
      .attr("width", 200)
      .attr("rx", 8)
      .attr("fill", "purple");
  }, []);

  return <div ref={rectAreaElement} />;
};

export default Reactangle;

import AnimatedCursor from "react-animated-cursor";
import { Outlet } from "react-router-dom";

export default function MouseLayout() {
  return (
    <>
      <AnimatedCursor
        innerSize={10}
        outerSize={27}
        outerAlpha={0.2}
        outerScale={2.7}
        innerScale={0.9}
        trailingSpeed={10}
        clickables={["a", "input", "button"]}
        color="143,67,238"
      />
      <Outlet />
    </>
  );
}

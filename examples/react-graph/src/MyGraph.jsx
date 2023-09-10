import { useEffect, useRef } from "react";
import { Graph } from "./modules/graph.js";

export function MyGraph({ data }) {
  const ref = useRef(null);
  const instanceRef = useRef();

  useEffect(() => {
    if (!ref.current) return;
    instanceRef.current = new Graph({
      width: 300,
      height: 300,
      backgroundColor: "black",
      max: 6,
      min: 0,
    });

    ref.current.appendChild(instanceRef.current.domElement);
  }, []);

  useEffect(() => {
    if (!instanceRef.current || !data) return;
    if (!instanceRef.current?.data.length) {
      instanceRef.current.setData(data);
    } else {
      instanceRef.current.updateData(data);
    }
  }, [data]);

  return <div ref={ref}></div>;
}

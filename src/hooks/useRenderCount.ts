import { useRef } from "react";

export function useRenderCount(name = "Component") {
  const count = useRef(0);
  count.current++;
  console.log(`${name} render count: ${count.current}`);
}

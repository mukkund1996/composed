import { ReactFlowProvider } from "react-flow-renderer";
import ComposedFlow from "./ComposedFlow";

export default function () {
  return (
    <ReactFlowProvider>
      <ComposedFlow />
    </ReactFlowProvider>
  );
}

import { ReactFlowProvider } from "react-flow-renderer";
import ComposedFlow from "./ComposedFlow";

const App = () => {
  return (
    <ReactFlowProvider>
      <ComposedFlow />
    </ReactFlowProvider>
  );
}

export default App;

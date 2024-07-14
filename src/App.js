import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import ContextApi from "./components/test/ContextApi";
import ContextStore from "./components/test/ContextStore";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ContextStore />
      <hr />
      <ContextApi />
    </>
  );
}

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default Root;

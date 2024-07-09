import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import ContextApi from "./components/test/ContextApi";

const queryClient = new QueryClient();

function App() {
  return <ContextApi />;
}

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default Root;

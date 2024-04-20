import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";

const fetchTodo = (id) => {
  console.log("fetchTodo call");

  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
    (response) => response.json()
  );
};

const queryClient = new QueryClient();

function TodoItem({ id }) {
  const { data } = useQuery({
    queryKey: ["todo", id],
    // queryFn: fetchTodo,
    staleTime: Infinity,
  });

  console.log("TodoItem data", data);

  return <div>TodoItem</div>;
}

function App() {
  const [shown, setShown] = useState(false);
  const [id, setId] = useState(0);
  const { data } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id),
    enabled: !!id,
  });

  // console.log("App data", data);
  // console.log("App id", id);

  return (
    <div>
      <button onClick={() => setShown((prev) => !prev)}>Todo 토글</button>
      <button onClick={() => setId((prev) => ++prev)}>Id 추가</button>
      {shown && <TodoItem id={id} />}
    </div>
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

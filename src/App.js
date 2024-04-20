import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import "./App.css";

const fetchTodo = (id) => {
  console.log("fetchTodo call");
  const randomId = Math.floor(Math.random() * 5) + 1;
  console.log("randomId", randomId);

  return fetch(
    `https://jsonplaceholder.typicode.com/todos/${id || randomId}`
  ).then((response) => response.json());
};

const queryClient = new QueryClient();

const TodoItem = memo(({ id }) => {
  const { data } = useQuery({
    queryKey: ["todo"],
    // queryFn: fetchTodo,
    staleTime: Infinity,
  });

  useEffect(() => {
    console.log("TodoItem data", data);
  }, [data]);

  return <div>TodoItem</div>;
});

function App() {
  const [shown, setShown] = useState(false);
  const [id, setId] = useState(0);
  const { data, refetch } = useQuery({
    queryKey: ["todo"],
    queryFn: () => fetchTodo(),
    // enabled: !!id,
  });

  // console.log("App data", data);
  // console.log("App id", id);

  return (
    <div>
      <button onClick={() => setShown((prev) => !prev)}>Todo 토글</button>
      {/* <button onClick={() => setId((prev) => ++prev)}>Id 추가</button> */}
      <button onClick={refetch}>리패치</button>
      {shown && <TodoItem />}
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

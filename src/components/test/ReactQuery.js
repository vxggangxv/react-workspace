import { QueryClient, queryOptions, useQuery } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import "./App.css";

const queryClient = new QueryClient();

const fetchTodo = (id) => {
  console.log(`fetchTodo call id: ${id}`);
  // const randomId = Math.floor(Math.random() * 5) + 1;
  // console.log("randomId", randomId);

  return fetch(
    `https://jsonplaceholder.typicode.com/todos/${
      id || Math.floor(Math.random() * 5) + 1
    }`
  ).then((response) => {
    console.log("response");

    return response.json();
  });
};

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

function groupOptions(id) {
  return queryOptions({
    queryKey: ["groups", id],
    // queryFn: () => fetchTodo(id),
    // staleTime: 1000,
  });
}

const Todo1 = memo(() => {
  const { data } = useQuery(groupOptions(1));
  return <p>{data?.id}</p>;
});

const Todo2 = memo(() => {
  // const { data } = useQuery(groupOptions(2));
  // const data = {}
  const { data } = useQuery({ queryKey: ["todo"], staleTime: Infinity });
  console.log("data", data);
  // const data = queryClient.getQueryData(["todo"]);
  // console.log("data", data);
  // console.log("queryClient", queryClient.getQueryData(["todo"]));

  // const queryCache = queryClient.getQueryCache();
  // console.log("queryCache", queryCache);

  // return "";
  return <p>{data?.id}</p>;
});

export default function ReactQuery() {
  const [shown, setShown] = useState(false);
  const [id, setId] = useState(1);
  const { data, refetch, isSuccess } = useQuery({
    queryKey: ["todo"],
    queryFn: () => fetchTodo(id),
    // enabled: !!id,
  });

  // console.log("App data", data);
  // console.log("App id", id);

  return (
    <div>
      {/* <button onClick={() => setShown((prev) => !prev)}>Todo 토글</button> */}
      <button
        onClick={() => {
          setId((prev) => ++prev);
          setTimeout(() => {
            refetch();
          }, 1000);
        }}
      >
        갱신 리패치
      </button>
      {/* <button onClick={() => setId((prev) => ++prev)}>Id 추가</button> */}
      <button onClick={refetch}>리패치</button>
      <p>App 데이타 {data?.id}</p>
      {/* {shown && <TodoItem />} */}
      {/* <Todo1 /> */}
      {isSuccess && <Todo2 />}
    </div>
  );
}

import { memo, useCallback, useContext, useState } from "react";
import createContextSelector from "../../libs/createContextSelector";
import useContextSelector from "../../libs/hooks/useContextSelector";
//
const Context = createContextSelector(null);
// const Context = createContext(null);

const Backdrop = memo(() => {
  const { onClose } = useContext(Context);

  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
      }}
    />
  );
});

const Header = memo(() => {
  const { title } = useContext(Context);
  console.log("🚀 ~ Header ~ title:", title);

  return <h1>해더: {title}</h1>;
});

const Body = memo(() => {
  const { content } = useContext(Context);
  console.log("🚀 ~ Body ~ content:", content);

  return <h2>바디: {content}</h2>;
});
const Footer = memo(() => {
  const { content } = useContext(Context);
  console.log("🚀 ~ Footer:");

  return <h2>푸터: {content}</h2>;
});

const Sidebar = memo(() => {
  // const contextValue = useContext(Context);
  // console.log("🚀 ~ Sidebar:", contextValue);
  // const value = "";
  // const [value] = useContextSelector(Context, (state) => state.title);
  const [value] = useContextSelector(Context, (state) => state.name);
  console.log("🚀 ~ Sidebar:", value);
  const test = () => {};

  return (
    <div>
      <h2
        style={{
          background: "yellow",
        }}
      >
        Sidebar: {value}
      </h2>
      <h3>Hihihihi</h3>
      <div>
        <button onClick={test}>테스트 버튼</button>
      </div>
    </div>
  );
});

const Container = memo(({ title, content, onClose }) => {
  const [name, setName] = useState("ryan");
  // const [age, setAge] = useState("ryan");

  const handleName = () => {
    setName((prev) => prev + 1);
  };

  // const value = useMemo(() => {
  //   return { title, content, onClose };
  // }, [title, content, onClose]);

  return (
    <Context.Provider value={{ title, content, onClose }}>
      <p>{name}</p>
      <button onClick={handleName}>네임 변경</button>
      {/* <Backdrop /> */}
      <Header />
      <Body />
      <Footer />
      <Sidebar />
    </Context.Provider>
  );
});

export default function ContextStore() {
  const [title, setTitle] = useState("상품제목");
  const [content1, setContent1] = useState("콘텐츠");

  const onClose = useCallback(() => {
    console.log("🚀 ~ onClose ~ onClose:");
    setTitle("삼품 닫기");
  }, []);

  return (
    <>
      <Container title={title} onClose={onClose} content="Content" />
      <p>{title}</p>
      <button onClick={() => setTitle((prev) => prev + 1)}>제목 변경</button>
      <p>{content1}</p>
      <button onClick={() => setContent1((prev) => prev + 1)}>
        컨텐츠 변경
      </button>
    </>
  );
}

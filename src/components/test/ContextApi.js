import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const Context = createContext(null);

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

  return <h1>{title}</h1>;
});

const Body = memo(() => {
  const { content } = useContext(Context);
  console.log("🚀 ~ Body ~ content:", content);

  return <h2>{content}</h2>;
});
const Footer = memo(() => {
  const { content } = useContext(Context);
  console.log("🚀 ~ Footer:");

  return <h2>Footer</h2>;
});
const Sidebar = () => {
  // const { content } = useContext(Context);
  console.log("🚀 ~ Sidebar:");

  return <h2>Footer</h2>;
};

const Container = memo(({ title, content, onClose }) => {
  const [name, setName] = useState("ryan");
  // const [age, setAge] = useState("ryan");

  const value = useMemo(() => {
    return { title, content, onClose, name };
  }, [title, content, onClose, name]);

  const handleName = () => {
    setName((prev) => prev + 1);
  };

  return (
    <Context.Provider value={{ value }}>
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

export default function ContextApi() {
  const [title, setTitle] = useState("상품리스트");
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

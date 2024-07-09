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
  // const { content } = useContext(Context);
  console.log("🚀 ~ Footer:");

  return <h2>Footer</h2>;
});

const Container = memo(({ title, content, onClose }) => {
  const value = useMemo(() => {
    return { title, content, onClose };
  }, [title, content, onClose]);

  return (
    <Context.Provider value={value}>
      {/* <Backdrop /> */}
      <Header />
      <Body />
      <Footer />
    </Context.Provider>
  );
});

export default function ContextApi() {
  const [title, setTitle] = useState("상품리스트");
  const [content, setContent] = useState("콘텐츠");

  const onClose = useCallback(() => {
    console.log("🚀 ~ onClose ~ onClose:");
    setTitle("삼품 닫기");
  }, []);

  return (
    <>
      <Container title={title} onClose={onClose} content="Content" />
      <p>{title}</p>
      <button onClick={() => setTitle((prev) => prev + 1)}>제목 변경</button>
      <p>{content}</p>
      <button onClick={() => setContent((prev) => prev + 1)}>
        컨텐츠 변경
      </button>
    </>
  );
}

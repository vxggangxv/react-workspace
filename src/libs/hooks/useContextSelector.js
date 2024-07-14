import { useContext, useEffect, useRef, useState } from "react";

export default function useContextSelector(context, selector = () => {}) {
  const { value, set, subscribe } = useContext(context);
  const selectorRef = useRef(selector);
  const [selectedValue, setSelectedValue] = useState(() => selector(value));

  // useEffect(() => {
  //   selectorRef.current = selector;
  // }, []);

  useEffect(() => {
    const updateValue = (newValue) => {
      const newSelectedValue = selectorRef.current(newValue);
      setSelectedValue(newSelectedValue);
    };

    const unsubscribe = subscribe(updateValue);

    return unsubscribe;
  }, [subscribe, value]);

  return [selectedValue, set];
}

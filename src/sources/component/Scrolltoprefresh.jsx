import { useEffect, useRef } from "react";

const Scrolltoprefresh = () => {
  const Ref = useRef(null);

  const scrollToBottom = () => {
    Ref.current.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return <div ref={Ref}></div>;
};

export default Scrolltoprefresh;

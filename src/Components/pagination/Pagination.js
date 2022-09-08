import Pagino from "pagino";
import { useState, useMemo } from "react";

const Pagination = () => {
  const [pages, setPages] = useState([]);

  const pagino = useMemo(() => {
    const _ = new Pagino({
      onChange: (page, count) => setPages(_.getPages())
    });

    _.setCount(15);

    return _;
  }, []);

  const hanglePaginoNavigation = (type) => {
    if (typeof type === "string") {
      pagino[type]?.();
      return;
    }

    pagino.setPage(type);
  };

  const renderElement = (page) => {
    if (page === "start-ellipsis" || page === "end-ellipsis") {
      return <button key={page}>...</button>;
    }

    return (
      <button
        style={{
          backgroundColor: page === pagino.page ? "#0971f1" : ""
        }}
        key={page}
        onClick={() => hanglePaginoNavigation(page)}
      >
        {page=='first'?'صفحه اول':
        page=='last'?'صفحه آخر':
        page=='next'?'صفحه بعد':
        page=='previous'?'صفحه قبل'
        :page}
      </button>
    );
  };

  return (
    <div>
      <h1>Page: {pagino.page}</h1>
      <ul>{pages.map(renderElement)}</ul>
    </div>
  );
}
export default Pagination;
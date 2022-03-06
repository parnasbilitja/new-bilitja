import React from "react";

const NotFountPage = () => {
  return (
    <div className="not-found-container">
      <img
        width=""
        height=""
        alt="بلیطجا-لوگو"
        src="/images/bilitja-logo.webp"
      />

      <h5 className="font-bold-iransanse text-center mt-4">
        مسافر گرامی، صفحه مورد نظر شما یافت نشد.
      </h5>
      <a href="/" className="font-bold-iransanse text-center mt-4">
        بازگشت به صفحه اصلی
      </a>
    </div>
  );
};

export default NotFountPage;

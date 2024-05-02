import Link from "next/link";
import React from "react";

const NotFountPage = () => {
  return (
    <>
      <div className="not-found-container">
        <img
          width=""
          height=""
          alt="بلیطجا-لوگو"
          src="../../../Images/hamnavaz-logo.webp"
        />

        <h5 className="font-bold-iransanse text-center mt-4">
          مسافر گرامی، صفحه مورد نظر شما یافت نشد.
        </h5>
        <Link href="/" className="font-bold-iransanse text-center mt-4">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </>
  );
};

export default NotFountPage;

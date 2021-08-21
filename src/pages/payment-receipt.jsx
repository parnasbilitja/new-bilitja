import React from "react";
import PaymentReceiptPage from "./../sources/payment_receipt/PaymentReceipt.page";

const PaymentReceipt = ({ PaymentInfo }) => {
  return (
    <div>
      <PaymentReceiptPage {...PaymentInfo} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch(
    "Https://bilitja.ravis.ir/api/onlinePay/reference/QOMG9L"
  );
  const data = await response.json();

  return {
    props: {
      PaymentInfo: data,
    },
  };
};

export default PaymentReceipt;

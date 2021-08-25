import { withRouter } from "next/router";
import React from "react";
import PaymentReceiptPage from "./../sources/payment_receipt/PaymentReceipt.page";

const PaymentReceipt = ({ PaymentInfo }) => {
  return (
    <div>
      <PaymentReceiptPage {...PaymentInfo} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `Https://bilitja.ravis.ir/api/onlinePay/reference/${context.query.reqPnr}`
  );
  const data = await response.json();

  return {
    props: {
      PaymentInfo: data,
    },
  };
};

export default withRouter(PaymentReceipt);

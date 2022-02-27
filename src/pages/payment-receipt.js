//import { withRouter } from "next/router";
import React from "react";
import PaymentReceiptPage from "../sources/payment_receipt/PaymentReceipt.page";

const PaymentReceipt = ({ PaymentInfo }) => {
  return (
    <div>
      <PaymentReceiptPage {...PaymentInfo} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `Https://tpa.ravis.ir/api/OnlinePay/api/onlinePay/reference/${context.query.reqPnr}/1a157116-a01a-4027-ab10-74098ac63815`
  );
  const data = await response.json();

  return {
    props: {
      PaymentInfo: data,
    },
  };
};

export default PaymentReceipt;

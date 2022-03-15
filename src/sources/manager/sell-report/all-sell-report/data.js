export const headCells = [
  {
    label: "مشتری",
  },
  {
    label: "درخواست",
  },
  {
    label: "رفرنس",
  },
  {
    label: "تایخ فروش",
  },
  {
    label: "وضعیت",
  },
  {
    label: "ردیف",
  },
  {
    label: "نام سرپرست",
  },
  {
    label: "کدملی",
  },
  {
    label: "کلاس سنی",
  },
  {
    label: "شماره بلیط",
  },
  {
    label: "جنسیت",
  },
  {
    label: "کاربر فروش",
  },
  {
    label: "فروش",
  },
  {
    label: "فروش Fare",
  },
  {
    label: "خرید",
  },
  {
    label: "سود",
  },
  {
    label: "مسیر",
  },
  {
    label: "ش.پرواز",
  },
  {
    label: "تاریخ پرواز",
  },
  {
    label: "ایرلاین",
  },
  {
    label: "کلاس",
  },
  {
    label: "خرید از",
  },
  {
    label: "سرویس",
  },
  {
    label: "PNR سرویس",
  },
  {
    label: "نوع مسیر",
  },
  {
    label: "جریمه استرداد",
  },
  {
    label: "تاریخ استرداد",
  },
  {
    label: "کاربر استرداد",
  },
  {
    label: "IP استرداد",
  },
  {
    label: "ویرایش",
  },
  {
    label: "جریمه ویرایش",
  },
  {
    label: "تاریخ ویرایش",
  },
];

export const createData = ({
  reqNoRow,
  reqNo,
  reqPnr,
  customerName,
  nameFamilyEn,
  meliCode,
  ticketName,
  ticketNo,
  sex,
  changeFlag,
  changeStat,
  finePrice,
  changeTime,
  changeUser,
  changeIp,
  changeNameFlag,
  changeStatName,
  finePriceName,
  changeTimeName,
  changeUserName,
  changeIpName,
  route,
  flightDate,
  flightNo,
  airline,
  className,
  kndSysName,
  serviceName,
  servicePnr,
  userFr,
  pathKind,
  dateTimeSabt,
  ticketPrice,
  ticketPriceFare,
  ticketPriceKh,
  stock,
  isSystem,
  reqNoMain,
  reqPnrMain,
}) => {
  return {
    reqNoRow,
    reqNo,
    reqPnr,
    customerName,
    nameFamilyEn,
    meliCode,
    ticketName,
    ticketNo,
    sex,
    changeFlag,
    changeStat,
    finePrice,
    changeTime,
    changeUser,
    changeIp,
    changeNameFlag,
    changeStatName,
    finePriceName,
    changeTimeName,
    changeUserName,
    changeIpName,
    route,
    flightDate,
    flightNo,
    airline,
    className,
    kndSysName,
    serviceName,
    servicePnr,
    userFr,
    pathKind,
    dateTimeSabt,
    ticketPrice,
    ticketPriceFare,
    ticketPriceKh,
    stock,
    isSystem,
    reqNoMain,
    reqPnrMain,
  };
};

export const fetchedList = async (status) => {
  const fetched = await fetch("/api/report/getAllReport", {
    method: "POST",
    body: JSON.stringify({
      customerId: "1a157116-a01a-4027-ab10-74098ac63815",
      changeStat: +status,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await fetched.json();
  return response;
};

export const getRows = async () => {
  const list = await fetchedList(0);
  const array = list.data.map((option) =>
    createData({
      reqNoRow: option.reqNoRow,
      reqNo: option.reqNo,
      reqPnr: option.reqPnr,
      customerName: option.customerName,
      nameFamilyEn: option.nameFamilyEn,
      meliCode: option.meliCode,
      ticketName: option.ticketName,
      ticketNo: option.ticketNo,
      sex: option.sex,
      changeFlag: option.changeFlag,
      changeStat: option.changeStat,
      finePrice: option.finePrice,
      changeTime: option.changeTime,
      changeUser: option.changeUser,
      changeIp: option.changeIp,
      changeNameFlag: option.changeNameFlag,
      changeStatName: option.changeStatName,
      finePriceName: option.finePriceName,
      changeTimeName: option.changeTimeName,
      changeUserName: option.changeUserName,
      changeIpName: option.changeIpName,
      route: option.route,
      flightDate: option.flightDate,
      flightNo: option.flightNo,
      airline: option.airline,
      className: option.className,
      kndSysName: option.kndSysName,
      serviceName: option.serviceName,
      servicePnr: option.servicePnr,
      userFr: option.userFr,
      pathKind: option.pathKind,
      dateTimeSabt: option.dateTimeSabt,
      ticketPrice: option.ticketPrice,
      ticketPriceFare: option.ticketPriceFare,
      ticketPriceKh: option.ticketPriceKh,
      stock: option.stock,
      isSystem: option.isSystem,
      reqNoMain: option.reqNoMain,
      reqPnrMain: option.reqPnrMain,
    })
  );
  return array;
};

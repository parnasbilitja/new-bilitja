import moment from "moment-jalaali";

////check if object is empty
export function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

//jalali convert to miladi
export const jalaliToMiladiConvertor = (jalaliDate) => {
  const jalali = moment(jalaliDate, "jYYYY/jMM/jDD");
  const miladiToJalali = jalali.format("YYYY/MM/DD");
  const reformattedMiladiDate = miladiToJalali?.replace(/\//g, "-");
  return reformattedMiladiDate;
};
//miladi convert to jalali
export const MiladiToJalaliConvertor = (miladiDate) => {

  const miladi = moment(miladiDate, "YYYY/MM/DD");
  const jalaliToMiladi = miladi.format("jYYYY/jMM/jDD");
  const reformattedMiladiDate = jalaliToMiladi?.replace(/\//g, "/");
  return reformattedMiladiDate;
};
///add 1 day miladi => convert to jalali
export const MiladiToJalaliConvertorInc = (miladiDate) => {
  const jalali = moment(miladiDate, "YYYY/MM/DD").add(1, "days");
  const miladiToJalali = jalali.format("jYYYY/jMM/jDD");
  const reformattedMiladiDate = miladiToJalali?.replace(/\//g, "/");
  return reformattedMiladiDate;
};
///substr 1 day miladi => convert to jalali
export const MiladiToJalaliConvertorDec = (miladiDate) => {
  const jalali = moment(miladiDate, "YYYY/MM/DD").subtract(1, "days");
  const miladiToJalali = jalali.format("jYYYY/jMM/jDD");
  const reformattedMilatdiDate = miladiToJalali?.replace(/\//g, "/");
  return reformattedMilatdiDate;
};

////sperate price with (,)
export function numberWithCommas(number) {
  // debugger;
  var parts = number?.toString().split(".");
  parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  /////////////this condition is temporaily
  if (parts.length > 0) {
    return parts?.join(".");
  } else {
    return "";
  }
}

////star builder
export const startBuilder = (star, setvalue) => {
  const startarr = [];
  for (let i = 0; i < star; i++) {
    startarr.push(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Filled"
            viewBox="0 0 24 24"
            width="17"
            height="17"
        >
          <path
              fill="#edb143"
              d="M1.327,12.4,4.887,15,3.535,19.187A3.178,3.178,0,0,0,4.719,22.8a3.177,3.177,0,0,0,3.8-.019L12,20.219l3.482,2.559a3.227,3.227,0,0,0,4.983-3.591L19.113,15l3.56-2.6a3.227,3.227,0,0,0-1.9-5.832H16.4L15.073,2.432a3.227,3.227,0,0,0-6.146,0L7.6,6.568H3.231a3.227,3.227,0,0,0-1.9,5.832Z"
          />
        </svg>
    );
  }
  return startarr;
};

///replce (/) in dates to ('%2F)
export const jalaliDateReformater = (date) => {
  return date.replace(/\//g, "%2F");
};

///room price Generator
export const currencyExchanger = (currency_code, currency) => {
  if (currency_code === null || currency === null) {
    return 1;
  } else {
    switch (currency_code) {
      case "euro":
        return currency[currency_code];
        break;
      case "dollar":
        return currency[currency_code];
        break;
      case "derham":
        return currency[currency_code];

      default:
        return currency["toman"]; //toman
        break;
    }
  }
};

///extbed =تخت اضافه
export const extBedPrcGen = (rooms, flight, roomTypeId) => {
  let price = 0;
  let services
  rooms?.map((room) => {
    if (roomTypeId === room.room_type_id) {
      let rates = room.rates.filter(
          (rate) =>
              moment(rate.date).isSameOrBefore(
                  flightDateChecker(flight).checkout
              ) &&
              moment(rate.date).isSameOrAfter(flightDateChecker(flight).checkin)
      );
      rates.map((rate) => {
        return (price +=
            rate.extra_price *
            currencyExchanger(rate.currency_code, room.currencies));
      });

      // price = price - PrcController(room, flight, true);
      price += flight.adl_price; //flights=>adl_price
      services= room.services.filter(service=>service.airport_id===flight.destination_id || service.airport_id===0)

      services.map((service) => {
        price +=
            service.rate * currencyExchanger(service.rate_type, room.currencies);
        return price;
      });
    }
    return price;
  });

  return price;
};

export const roomPrcGen = (room, flight) => {
// debugger
  let services
  let price = 0;
  let isCheckIn = room.rates[0]?.checkin_base;
// debugger
  let rates = room.rates.filter(
      (rate) =>
          moment(rate.date).isSameOrBefore(flightDateChecker(flight).checkout) &&
          moment(rate.date).isSameOrAfter(flightDateChecker(flight).checkin)
  );
  if (isCheckIn) {
    price +=
        rates[0].offer_price *
        currencyExchanger(room.rates[0].currency_code, room.currencies) *
        rates.length;
  } else {
    rates.map((rate) => {
      return (price +=
          rate.price * currencyExchanger(rate.currency_code, room.currencies));
    });
  }

  // price = price - PrcController(room, flight, false, isCheckIn);
  price += flight.adl_price; //flights=>adl_price


  services= room.services.filter(service=>service.airport_id===flight.destination_id || service.airport_id===0)

  services.map((service) => {
    price +=
        service.rate * currencyExchanger(service.rate_type, room.currencies);
    return price;
  });

  return price;
};
export const chdPrcGen = (rooms, flight, roomTypeId) => {
  // debugger
  let price = 0;
  let services
  rooms?.map((room) => {
    if (roomTypeId === room.room_type_id) {
      let isCheckIn = room.rates[0]?.checkin_base;
      let rates = room.rates.filter(
          (rate) =>
              moment(rate.date).isSameOrBefore(
                  flightDateChecker(flight).checkout
              ) &&
              moment(rate.date).isSameOrAfter(flightDateChecker(flight).checkin)
      );
      if (isCheckIn) {
        price +=
            rates[0].offer_price *
            currencyExchanger(room.rates[0].currency_code, room.currencies) *
            rates.length;
      } else {
        rates.map((rate) => {
          return (price +=
              rate.price * currencyExchanger(rate.currency_code, room.currencies));
        });
      }

      // price -= PrcController(room, flight, false, false);
      price += flight.chd_price; //flights=>adl_price
      services= room.services.filter(service=>service.airport_id===flight.destination_id || service.airport_id===0)

      services.map((service) => {
        price +=
            service.rate * currencyExchanger(service.rate_type, room.currencies);
        return price;
      });
    }
    return price;
  });

  return price;
};
export const roomNameChecker = (roomsarr, room_id) => {
  // debugger
  const roomName = roomsarr?.filter((room) => room.id === room_id);
  return roomName[0]?.room_type;
};

export const errValidation = (ErrObj, errtype) => {
  // debugger;
  return ErrObj?.hasOwnProperty(errtype);
};

export const dateDiffChecker = (stDate, enDate, stayCount) => {
  // debugger;
  // let diff = moment(enDate).diff(stDate, "days") + 1;
  if (moment(enDate).diff(stDate, "days") + 1 === +stayCount) {
    return true;
  } else {
    return false;
  }
};

export const flightDateChecker = (flight) => {
  //
  // debugger;
  let checkin;
  let checkout;
  if (flight.checkin_tomorrow && flight.checkout_yesterday) {
    checkin = moment(flight.date).add(1, "days");
    checkout = moment(flight.flight.date).subtract(2, "d").format("YYYY-MM-DD");
    return { checkin, checkout };
  } else if (flight.checkin_tomorrow && !flight.checkout_yesterday) {
    checkin = moment(flight.date).add(1, "d").format("YYYY-MM-DD");
    checkout = flight.flight.date;
    return { checkin, checkout };
  } else if (!flight.checkin_tomorrow && flight.checkout_yesterday) {
    checkin = flight.date;
    checkout = moment(flight.flight.date).subtract(2, "d").format("YYYY-MM-DD");
    return { checkin, checkout };
  } else {
    checkout = moment(flight.flight.date).subtract(1, "d").format("YYYY-MM-DD");
    checkin = flight.date;
    return { checkin, checkout };
  }
};

export const reservePrc = (rooms, flight) => {
  let fiPrice;
  // debugger;
  rooms.map((room) => {
    if (room.room_type_id === 148) {
      fiPrice = roomPrcGen(room, flight);
    }
  });

  if (fiPrice) {
    return fiPrice;
  } else {
    fiPrice = Math.min(
        rooms.map((room) => {
          return roomPrcGen(room, flight);
        })
    );
    return fiPrice;
  }
};

export const errStruct = (roomId, passenId, inputName) => {
  return `reserves.${roomId}.passengers.${passenId}.${inputName}`;
};

export const passengerObjModelGen = (personCount, type) => {
  let personarr = [];
  if (personCount > 0) {
    [...Array(personCount)].map((p, index) => {
      personarr.push({
        name: "",
        family: "",
        birth_day: "",
        nationality: "",
        gender: "",
        passport: "",
        expired_passport: "",
        id_code: "",
        bed_type: type === "ext" ? "extra" : "normal",
        type,
        id: `${index}${type}`,
        price: "",
      });
    });
  }
  return personarr;
};

export const TotalPrcGen = (prcArr) => {
  let total = prcArr.reduce((accumulator, currentValue) => {
    return accumulator + +currentValue;
  }, 0);

  return total;
};

export const humanType = (type) => {
  switch (type) {
    case "adl":
      return "بزرگسال";
    case "inf":
      return "نوزاد";
    case "chd":
      return "کودک";
    case "ext":
      return "تخت اضافه";
  }
};

export const humanType1 = (id) => {
  // switch (type) {
  //   case "adl":
  //     return "بزرگسال";
  //   case "inf":
  //     return "نوزاد";
  //   case "chd":
  //     return "کودک";
  //   case "ext":
  //     return "تخت اضافه";
  // }
  if(id.includes('adl')){
    return 'بزرگسال'
  } else if(id.includes('chd')){
    return 'کودک'
  }else if(id.includes('chd')){
    return 'نوزاد'
  }else{
    return 'تخت اضافه'
  }
};




////////////////////////motion animate VAriant
export const collapseVariants={
  initial:{
    height:'0',
  },
  animate:{
    height:'auto'
    ,transition:{duration:.5}},
  exit:{height:'0',transition:{duration:.5}}
}
export const rotateVariants={
  initial:{
    rotate:0,
  },
  animate:{
    rotate:90
    ,transition:{duration:.2}},
  exit:{rotate:0,transition:{duration:.5}}
}

export     const removeDuplicateObj=(data,prop)=>{
  // debugger
  const seenIds = {}; // Helper object to keep track of seen IDs

  const filteredData = data.filter(obj => {
    if (!seenIds[obj.reserve_id
        ]) {
      seenIds[obj.reserve_id
          ] = true; // Mark the ID as seen
      return true; // Keep the object in the filtered data
    }
    return false; // Ignore the object as duplicate
  });
  return filteredData
}

export const humantype = (type) => {
  // debugger
  switch (type) {
    case "adl":
      return "بزرگسال";
    case "inf":
      return "نوزاد";
    case "chd":
      return "کودک";
    default:
      return "تخت اضافه";
  }
};
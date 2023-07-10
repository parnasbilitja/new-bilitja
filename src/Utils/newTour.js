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
  const reformattedMiladiDate = miladiToJalali?.replace(/\//g, "/");
  return reformattedMiladiDate;
};

////sperate price with (,)
export function numberWithCommas(number) {
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

////star builder
export const startBuilder = (star) => {
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



// export const PrcController = (room, flight, isExtra, isCheckIn) => {
//   const firstRate =
//     (isExtra ? room.rates[0].extra_price : room.rates[0].price) *
//     currencyExchanger(room.rates[0].currency_code, room.currencies);
//   const lastRate =
//     (isExtra
//       ? room.rates[room.rates.length - 1].extra_price
//       : room.rates[room.rates.length - 1].price) *
//     currencyExchanger(
//       room.rates[room.rates.length - 1].currency_code,
//       room.currencies
//     );

//   if (isCheckIn) {
//     if (flight.checkin_tomorrow && flight.checkout_yesterday) {
//       const offerPrice = room.rates[0].offer_price * 2;
//       return (
//         offerPrice *
//         currencyExchanger(room.rates[0].currency_code, room.currencies)
//       );
//     } else if (flight.checkin_tomorrow || flight.checkout_yesterday) {
//       return (
//         room.rates[0].offer_price *
//         currencyExchanger(room.rates[0].currency_code, room.currencies)
//       );
//     } else {
//       return 0;
//     }
//   } else {
//     if (flight.checkin_tomorrow && flight.checkout_yesterday) {
//       return firstRate + lastRate;
//     } else if (flight.checkin_tomorrow && !flight.checkout_yesterday) {
//       return firstRate;
//     } else if (flight.checkout_yesterday && !flight.checkin_tomorrow) {
//       return lastRate;
//     } else {
//       return 0;
//     }
//   }
// };

///extbed =تخت اضافه
export const extBedPrcGen = (rooms, flight, roomTypeId) => {
  let price = 0;
  rooms.map((room) => {
    if (roomTypeId === room.room_type_id) {
      room.rates.map((rate) => {
        return (price +=
          rate.extra_price *
          currencyExchanger(rate.currency_code, room.currencies));
      });

      // price = price - PrcController(room, flight, true);
      price += flight.adl_price; //flights=>adl_price
      room.services.map((service) => {
        if (service.airport_id === flight.destination_id) {
          price +=
            service.rate *
            currencyExchanger(service.rate_type, room.currencies);
          return price;
        }
      });
    }
    return price;
  });

  return price;
};

export const roomPrcGen = (room, flight) => {
  let price = 0;
  let isCheckIn = room.rates[0].checkin_base;
  if (isCheckIn) {
    price +=
      room.rates[0].offer_price *
      currencyExchanger(room.rates[0].currency_code, room.currencies) *
      room.rates.length;
  } else {
    room.rates.map((rate) => {
      return (price +=
        rate.price * currencyExchanger(rate.currency_code, room.currencies));
    });
  }

  // price = price - PrcController(room, flight, false, isCheckIn);
  price += flight.adl_price; //flights=>adl_price
  room.services.map((service) => {
    if (service.airport_id === flight.destination_id) {
      price +=
        service.rate * currencyExchanger(service.rate_type, room.currencies);
      return price;
    }
  });

  return price;
};
export const chdPrcGen = (rooms, flight, roomTypeId) => {
  let price = 0;
  rooms.map((room) => {
    if (roomTypeId === room.room_type_id) {
      room.rates.map((rate) => {
        return (price +=
          rate.price * currencyExchanger(rate.currency_code, room.currencies));
      });

      // price -= PrcController(room, flight, false, false);
      price += flight.chd_price; //flights=>adl_price
      room.services.map((service) => {
        if (service.airport_id === flight.destination_id) {
          price +=
            service.rate *
            currencyExchanger(service.rate_type, room.currencies);
          return price;
        }
      });
    }
    return price;
  });

  return price;
};





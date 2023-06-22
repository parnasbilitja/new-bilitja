import moment from "moment-jalaali";

export function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export const jalaliToMiladiConvertor = (jalaliDate) => {
  const jalali = moment(jalaliDate, "jYYYY/jMM/jDD");
  const miladiToJalali = jalali.format("YYYY/MM/DD");
  const reformattedMiladiDate = miladiToJalali?.replace(/\//g, "-");
  return reformattedMiladiDate;
};

export function numberWithCommas(number) {
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function isValidIranianNationalCode(input) {
  if (!/^\d{10}$/.test(input)) return false;

  const check = +input[9];
  const sum =
    Array(9)
      .fill()
      .map((_, i) => +input[i] * (10 - i))
      .reduce((x, y) => x + y) % 11;
  return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
}
export function isValidPassportCode(input) {
  if (!/^[A-Za-z][0-9]{8}$/.test(input)) {
    return true;
  } else {
    return false;
  }
}
export function moneyFormat(input) {
  return parseFloat(input / 10)
    .toFixed(1)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    .split(".")[0];
}
export function moneyFormatrial(input) {
  return parseFloat(input)
    .toFixed(1)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    .split(".")[0];
}
export const getCustomFormat = (inputValue, isGregorian) => {
  if (!inputValue) return "";
  const inputFormat = isGregorian ? "YYYY/MM/DD" : "jYYYY/jMM/jDD";
  return isGregorian
    ? inputValue.locale("es").format(inputFormat)
    : inputValue.locale("fa").format(inputFormat);
};
export const compareTwoStringDates = (first, second) => {
  let firstDate = parseInt(first.replace("/", "").replace("/", ""));
  let secondDate = parseInt(second.replace("/", "").replace("/", ""));

  if (firstDate > secondDate) {
    return 1;
  } else if (firstDate < secondDate) {
    return -1;
  } else {
    return 0;
  }
};
export const checkCharacter = (char) => {
  let res = /^[a-z \s A-Z]+$/.test(char);
  return res;
};
export const checkNumber = (char) => {
  let res = /^[0-9]+$/.test(char);
  return res;
};
export const getweekday = (value) => {
  switch (value?.toLowerCase()) {
    case "saturday":
      return "شنبه";
    case "sunday":
      return "یکشنبه";
    case "monday":
      return "دوشنبه";
    case "tuesday":
      return "سه شنبه";
    case "wednesday":
      return "چهارشنبه";
    case "thursday":
      return "پنج شنبه";
    case "friday":
      return "جمعه";
    default:
      return "";
  }
};
export const checkNumberfatoen = (str) => {
  var
  persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
  arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]

    if(typeof str === 'string')
    {
      for(var i=0; i<10; i++)
      {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      }
    }
    return str;
  

}
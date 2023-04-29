import { useState, useEffect } from "react";

const calculateRange = (len, rowsPerPage) => {
    let range = [];
    let num = Math.ceil(parseFloat(len / rowsPerPage));
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };
  
  const sliceData = (SearchData, page, rowsPerPage) => {
      return SearchData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    
  };
  
const useTable = (data, page, rowsPerPage,searchBar) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  const SearchData = data.length>1&&
  [
    ...data
    .filter((item) =>
    item[`${'reqNo'}`].toString().toLowerCase().includes(searchBar.toString().toLowerCase())
    ),
    ...data
    .filter((item) =>
    item[`reqPnr`].toLowerCase().includes(searchBar.toLowerCase())
    ),
    ...data
    .filter((item) =>
    item.nameFamilyEn?.toString().toLowerCase().includes(searchBar.toString().toLowerCase())
    ),
    ...data
    .filter((item) =>
    item.dateTimeSabt?.toString().toLowerCase().includes(searchBar.toString().toLowerCase())
    ),
    ...data
    .filter((item) =>
    item.flightDate?.toString().toLowerCase().includes(searchBar.toString().toLowerCase())
    ),
    ...data
    .filter((item) =>
    item.mobileNo?.toString().toLowerCase().includes(searchBar.toString().toLowerCase())
    ),
    ...data
    .filter((item) =>
    item.route?.toString().toLowerCase().includes(searchBar.toString().toLowerCase())
    ),
    ...data
    .filter((item) =>
    item.flightNo?.toString().toLowerCase().includes(searchBar.toString().toLowerCase())
    ),
    ...data
    .filter((item) =>
    item.airline?.toString().toLowerCase().includes(searchBar.toString().toLowerCase())
    ),
    ...data
    .filter((item) =>
    item.serviceName?.toString().toLowerCase().includes(searchBar.toString().toLowerCase())
    ),

  ];
  let len = SearchData.length
  let foroshAll = 0;
  let buyAll = 0;
  let Profit = 0;
  slice.map((item) => {
    foroshAll+= !item.amount ? parseFloat(item.feeGet):parseFloat(item.amount)
    buyAll+= parseFloat(item.feeGetKh)
    Profit+= parseFloat(item.feeGet-item.feeGetKh)
  })
  let foroshAll2 = 0;
  let buyAll2 = 0;
  let Profit2 = 0;
  
  SearchData.map((item) => {
    foroshAll2+= !item.amount ? parseFloat(item.feeGet):parseFloat(item.amount)
    buyAll2+= parseFloat(item.feeGetKh)
    Profit2+= parseFloat(item.feeGet-item.feeGetKh)
  })
  
  useEffect(() => {

    const range = calculateRange(len, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(SearchData, page, rowsPerPage);
    setSlice([...slice]);
  }, [page,searchBar,rowsPerPage]);

  return { slice, range: tableRange, foroshAll, buyAll, Profit, foroshAll2, buyAll2, Profit2 };
};

export default useTable;
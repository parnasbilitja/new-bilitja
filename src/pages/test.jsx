// try {
//     const { data, status } = await GetAdvertsList(page_number);
//     if (status === 200) {
//       setState((prevState) => ({ ...prevState, adverts: data.data }));
//     }
//   } catch ({ response }) {
//     if (response) {
//       if (response.status === 400) {
//         ErrorMessage(ProblemError);
//       } else {
//         ErrorMessage(ProblemError);
//       }
//     } else {
//       ErrorMessage(NetworkError);
//     }
//   }

//   export const GetAdvertsList = (page_number) => {
//     return get(`${config.api_v1}/Adverts?PageNumber=${page_number}&PageSize=9`);
//   };
  
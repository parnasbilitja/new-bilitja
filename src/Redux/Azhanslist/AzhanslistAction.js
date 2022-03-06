import axios from "axios";
import ActionTypes from "./ActionType";

const getazhanslist = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.GETAZHANSLOADING });
      const { data } = await axios.get(
        `https://tpa.ravis.ir/api/BilitAirLines/getRavisKndSysDeclare/1a157116-a01a-4027-ab10-74098ac63815`
      );
      dispatch({ type: ActionTypes.GETAZHANSLISTDATA, payload: data });
      console.log("data :", data);
    } catch (e) {
      console.log("Ew :", e);
      dispatch({ type: ActionTypes.GETAZHANSLISTERROR, payload: e });
    }
  };
};

export default { getazhanslist };

import globals from "./../../../sources/Global";

const getReportsInfo = async (req, res) => {
  try {
    const fetched = await fetch(
      `${globals.baseUrlNew}AdminReportFlight/reportFlight/flightFr/lstDetail/${req.query.reqNo}/${req.query.reqPnr}`
    );
    const response = await fetched.json();
    res.status(200).send({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.status(203).send({
      status: "un-success",
      data: [],
    });
  }
};
export default getReportsInfo;

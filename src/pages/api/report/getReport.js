import globals from "./../../../sources/Global";

const getReports = async (req, res) => {
  try {
    const fetched = await fetch(
      `${globals.baseUrlNew}AdminReportFlight/reportFlight/flightFr`,
      {
        method: "POST",
        body: JSON.stringify({
          customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
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
export default getReports;

const GetHotels = async (req, res) => {
  
    try {
      const fetched = await fetch(
        'https://api.hamnavaz.com/api/v1/hotel/getHotels',
        {
          method: "POST",
          body: JSON.stringify({
            offered :1
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
  export default GetHotels;
  
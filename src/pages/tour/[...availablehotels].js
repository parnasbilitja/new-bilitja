import dynamic from "next/dynamic";


const AvHotel = dynamic(() =>
        import("../../Components/NewTours/Components/AvailableHotel1"),
    {
        ssr:false
    }
);

const availableHotels = () => {
    return (
        <>
            <AvHotel/>
        </>
    )

};

export default availableHotels;

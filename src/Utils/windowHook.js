import { useState, useEffect } from 'react';

 function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function getWindowDimensions() {
            const { innerWidth: width, innerHeight: height } = window;
            return { width, height };
        }

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        // Call handleResize to set the initial dimensions
        handleResize();

        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array ensures this effect runs only once

    return windowDimensions;
}
export default useWindowDimensions

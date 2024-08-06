import { useState, useEffect } from 'react';

export  default function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState('up');
    const [prevScrollY, setPrevScrollY] = useState(0);
    const handleScroll = () => {

        const currentScrollY = window.scrollY;
        if (currentScrollY > prevScrollY) {
            setScrollDirection('down');
        } else {
            setScrollDirection('down');
        }
        setPrevScrollY(currentScrollY);
    };
    useEffect(() => {


        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollY]);

    return scrollDirection;
}

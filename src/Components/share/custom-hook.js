import { useState, useEffect } from "react";

export function useScroll() {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [scrollDirection, setScrollDirection] = useState();

    const listener = e => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        setScrollDirection(lastScrollTop > st ? 'up' : 'down');
        setLastScrollTop(st <= 0 ? 0 : st);
    };

    useEffect(() => {
        window.addEventListener("scroll", listener);
        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, []);

    return { scrollDirection };
}
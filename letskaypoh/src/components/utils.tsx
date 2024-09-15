import { useEffect, useState } from 'react'
import './styles.css'
import { NavigateFunction } from 'react-router-dom'

export const separatedArray = (arr: (string | JSX.Element)[] | undefined, separator?: JSX.Element | string) => {
    if (!arr || arr.length === 0) return
    
    const items = arr.map((elem, index) => {
        return (
            (arr.length === index+1) ? 
            <span>{elem}</span> : 
            <span className={'commaArrayElement'}>{elem}{separator ?? ', '} </span>
        )
    })
    return items
}

export function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<"down" | "up" | null>(null);
  
    useEffect(() => {
      let lastScrollY = window.pageYOffset;
  
      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        const direction = scrollY > lastScrollY ? "down" : "up";
        if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
          setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener("scroll", updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener("scroll", updateScrollDirection); // clean up
      }
    }, [scrollDirection]);
  
    return scrollDirection;
  };

export const navigateToRoute = (path: string, navigate: NavigateFunction) => {
  navigate(path)
}
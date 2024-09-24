import { useEffect, useState } from 'react'
import './styles.css'
import { NavigateFunction } from 'react-router-dom'
import { message } from 'antd'
import { updateVisit } from '../api'
import { VisitInterface, VisitStatus } from '../models/interfaces'

export const separatedArray = (arr: (string | JSX.Element)[] | undefined, separator?: JSX.Element | string) => {
    if (!arr || arr.length === 0) return
    
    const items = arr.map((elem, index) => {
        return (
            (arr.length === index+1) ? 
            <span key={index}>{elem}</span> : 
            <span  key={index} className={'commaArrayElement'}>{elem}{separator ?? ', '} </span>
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

export const handleCompleteVisit = (visit: VisitInterface, navigate: NavigateFunction) => {
  // api to mark visit as completed
  try {
      updateVisit({
          "visit_id": visit.visit_id,
          "status": VisitStatus.COMPLETED 
      })
      
  } catch (error) {
      console.error("Error updating visit status:", error);
  }
  message.success('Visit completed!')
  navigateToRoute(`/visit-completed/${visit.visit_id}`, navigate)
}

export const handleCheckInVisit = (visit: VisitInterface) => {
  // add api to check in visit 
  try {
      updateVisit({
          "visit_id": visit.visit_id,
          "status": VisitStatus.ONGOING 
      }).then(() => {
        window.location.reload();
      })
  } catch (error) {
      console.error("Error updating visit status:", error);
      message.error(`Error updating visit status: ${error}` )
  }

  message.success('Checked in!')
}

export const handleCancelVisit = (visit: VisitInterface) => {
  // api to mark visit as cancelled
  try {
      updateVisit({
          "visit_id": visit.visit_id,
          "status": VisitStatus.CANCELLED
      })
      
  } catch (error) {
      console.error("Error updating visit status:", error);
  }
  console.log('cancel visit')
  message.success('Visit cancelled!')
  // navigateToRoute(`/visit-completed/${visit.visit_id}`, navigate)
}
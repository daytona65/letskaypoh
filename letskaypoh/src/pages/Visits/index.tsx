import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { navigateToRoute } from '../../components/utils';
import { VisitCard } from '../../components/Card/VisitCard';
import { getAllVisitsData } from '../../api';
import { VisitInterface } from '../../models/interfaces';

const Visits = () => {
  const navigate = useNavigate();

   // add api endpoint - get upcoming visits
   const [visits, setVisits] = useState<VisitInterface[] | []>([]);

   useEffect(() => {
       const fetchData = async () => {
           try {
               const visitsData = await getAllVisitsData();
               console.log(visitsData)
               setVisits(visitsData);
           } catch (error) {
               console.error("Error fetching visit data:", error);
           }
       };

       fetchData();
   }, [])

  const visitCards = visits.map((visit) => {
    return <VisitCard 
      visit={visit}
    />
  })

 

  return (
    <div className={'container'}>
      <div className={'header'}>
        <h1>let's kaypoh!</h1>
        <h3>Upcoming Visits</h3>
      </div>
      <div className={'visits'}>
        {visitCards}
        <p>
          You have no upcoming visits.
        </p>
        <div className={'buttons'}>
          <Button onClick={() => navigateToRoute('/home', navigate)}>
            Explore
          </Button>
          <Button onClick={() => navigateToRoute('/register-visit', navigate)}>
            Register Visit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Visits
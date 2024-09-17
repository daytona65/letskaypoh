import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { visitsData } from '../../models/dummyData';
import { navigateToRoute } from '../../components/utils';
import { VisitCard } from '../../components/Card/VisitCard';

const Visits = () => {
  const navigate = useNavigate();

  const visitCards = visitsData.map((visit) => {
    return <VisitCard 
      key={visit.id}
      visit={visit}
    />
  })

  // add api endpoint - get upcoming  - filter by upcoming

  return (
    <div className={'container'}>
      <div className={'header'}>
        <h1>let's kaypoh!</h1>
        <h3>Upcoming Visits</h3>
      </div>
      <div className={'visits'}>
        
        {visitsData.length === 0 ? <>
          <p>
            You have no upcoming visits.
          </p>
          <div className={'buttons'}>
            <Button onClick={() => navigateToRoute('/home', navigate)}>
              Explore
            </Button>
          </div>
        </> : visitCards}
      </div>
    </div>
  )
}

export default Visits
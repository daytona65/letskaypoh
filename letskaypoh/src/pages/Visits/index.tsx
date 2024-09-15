import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { data } from '../../models/dummyData';
import { SeniorCard } from '../../components/Card/SeniorCard';
import { navigateToRoute } from '../../components/utils';

const Visits = () => {
  const navigate = useNavigate();

  const seniorCards = data.map((senior) => {
    return <SeniorCard 
      senior={senior}
    />
  })

  return (
    <div className={'container'}>
      <div className={'header'}>
        <h1>let's kaypoh!</h1>
        <h3>Upcoming Visits</h3>
      </div>
      <div className={'visits'}>
        {seniorCards}
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
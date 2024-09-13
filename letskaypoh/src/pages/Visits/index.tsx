import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { data } from '../../models/dummyData';
import { SeniorCard } from '../../components/Card/Card';

const Visits = () => {
  const navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  }

  const seniorCards = data.map((senior) => {
    return <SeniorCard 
      title={senior.title}
      surname={senior.name}
      gender={senior.gender}
      age={senior.age}
      languages={senior.languages}
      lastVisited={senior.lastVisitedDate}
      postal={senior.postalCode}
      key={senior.id}
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
          <Button onClick={() => routeChange('/home')}>
            Explore
          </Button>
          <Button onClick={() => routeChange('/register-visit')}>
            Register Visit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Visits
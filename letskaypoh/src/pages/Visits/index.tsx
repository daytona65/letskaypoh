import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'

const Visits = () => {
  const navigate = useNavigate(); 
    const routeChange = (path: string) =>{ 
      navigate(path);
    }
    
  return (
    <div className={'container'}>
      <div className={'header'}>
        <h1>let's kaypoh!</h1>
        <h3>Upcoming Visits</h3>
      </div>
      <div className={'visits'}>
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
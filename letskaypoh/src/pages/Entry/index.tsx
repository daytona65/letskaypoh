import React from 'react'
import '../../App.css'
import './styles.css'
import { Button } from 'antd'
import { useNavigate } from "react-router-dom";

const Entry = () => {
    const navigate = useNavigate(); 
    const routeChange = () =>{ 
      const path = `/home`; 
      navigate(path);
    }
    
  return (
      <>
        <div>
          let's rebuild the kampung spirit with
        </div>
        <h1 className={'title'}>let's kaypoh!</h1>
        <Button onClick={routeChange}>Get Started</Button>
      </>
    )
}

export default Entry
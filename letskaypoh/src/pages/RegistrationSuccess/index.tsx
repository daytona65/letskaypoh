import React from 'react'
import '../../App.css'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
    const navigate = useNavigate();
    const routeChange = () => {
        const path = `/entry`;
        navigate(path);
    }

    return (
        <>
            <div>
                <h1 className={'title'}>let's kaypoh!</h1>
                <h3>You are officially a kaypoh!</h3>
                <p>Thank you for volunteering with us! The world needs more people like you!</p>
            </div>
            <Button onClick={routeChange}>Get Started</Button>
        </>
    )
}

export default RegistrationSuccess
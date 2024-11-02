import '../../App.css'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import { navigateToRoute } from '../../components/utils';
import BannerImg from '../../assets/banner.png'
import { checkTokenValid } from '../../api';
import { useEffect } from 'react';

const RegistrationSuccess = () => {
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                navigateToRoute('/', navigate);
            } else {
                try {
                    const isValid = await checkTokenValid(token);
                    if (!isValid) {
                        navigateToRoute('/', navigate);
                    }
                } catch (error) {
                    console.error("Error validating token:", error);
                    navigateToRoute('/', navigate);
                }
            }
        };

        validateToken();
    }, [navigate, token]);

    const onClickGetStarted = () => {
        navigateToRoute('/home', navigate)
    }

    return (
        <div className={'container-login'}>
            <div>
                <img className={'bannerImg'} src={BannerImg} />
                <h1 style={{marginTop: 0}}>let's kaypoh!</h1>
                <div className='accent'><h3>You are officially a kaypoh!</h3></div>
                <p >Thank you for volunteering with us! The world needs more people like you!</p>
            </div>
            <Button className='joinButton' onClick={onClickGetStarted}>Get Started</Button>
        </div>
    )
}

export default RegistrationSuccess
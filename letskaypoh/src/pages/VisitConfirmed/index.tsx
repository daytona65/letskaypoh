import React from 'react'
import '../commonStyles.css'
import '../../App.css'
import './styles.css'
import { SeniorInterface, UserInterface, VisitInterface } from '../../models/interfaces'
import { SeniorCard } from '../../components/Card/SeniorCard'
import Check from '../../assets/check.webp'
import { Alert, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { navigateToRoute } from '../../components/utils'

interface Props {
    visit?: VisitInterface //un optional this
    senior: SeniorInterface
    user: UserInterface
}

const VisitConfirmed: React.FC<Props> = (props) => {
    const navigate = useNavigate()

    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1>let's kaypoh!</h1>
            </div>

            <div className={'confirmVisit'}>
                <div className={'thankYou'}>
                    <h2>Visit Confirmed</h2>
                    <h3>
                        Thank you for volunteering, {props.user.name}!
                    </h3>
                </div>
                <img className={'checkImg'} src={Check}/>

                <Alert 
                    className='alert'
                    // message={<h3 >Visit confirmed!</h3>}
                    description={`Drop ${props.senior.title} ${props.senior.name} a call to notify ${props.senior.gender.toLowerCase() === "m" ? 'him' : 'her'} that you're visiting!`} 
                    type="info"
                    showIcon 
                />
                
                <h3 className={'visitDetails'}>Visit Details</h3>

                <SeniorCard senior={props.senior}/>
                <Button 
                    className={'regularBtn'} 
                    onClick={() => navigateToRoute('/home', navigate)}>
                    Back to Home
                </Button>
            </div>

        </div>
    )
}

export default VisitConfirmed
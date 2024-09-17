import React from 'react'
import '../commonStyles.css'
import '../../App.css'
import './styles.css'
import { SeniorInterface, UserInterface, VisitInterface } from '../../models/interfaces'
import { SeniorCard } from '../../components/Card/SeniorCard'
import Check from '../../assets/check.webp'
import { Alert, Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { navigateToRoute } from '../../components/utils'
import { data, visitsData } from '../../models/dummyData'
import { VisitCard } from '../../components/Card/VisitCard'

const VisitConfirmed: React.FC = () => {
    const visitId = Number(useLocation().pathname.split("/")[2]);

    const navigate = useNavigate()

    const userName = localStorage.getItem('name')

    // api: get visit by id
    const visit: VisitInterface = visitsData[visitId + 1]

    // api: get senior details by seniorid
    const senior: SeniorInterface = data[0]

    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1>let's kaypoh!</h1>
            </div>

            <div className={'confirmVisit'}>
                <div className={'thankYou'}>
                    <h2>Visit Confirmed</h2>
                    <h3>
                        Thank you for volunteering, {userName}!
                    </h3>
                </div>
                <img className={'checkImg'} src={Check}/>

                <Alert 
                    className='alert'
                    // message={<h3 >Visit confirmed!</h3>}
                    // description={`Drop ${props.senior.name} a call to notify ${props.senior.gender.toLowerCase() === "m" ? 'him' : 'her'} that you're visiting!`} 
                    description={'A social worker will be reaching out to you on details of your first visit!'}
                    type="info"
                    showIcon 
                />
                
                <h3 className={'visitDetails'}>Visit Details</h3>

                <SeniorCard senior={senior}/>
                <VisitCard visit={visit}/>
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
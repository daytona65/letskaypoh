import React, { useEffect, useState } from 'react'
import '../commonStyles.css'
import '../../App.css'
import './styles.css'
import { SeniorInterface, VisitInterface } from '../../models/interfaces'
// import { SeniorCard } from '../../components/Card/SeniorCard'
import Check from '../../assets/check.webp'
import { Alert, Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { navigateToRoute } from '../../components/utils'
import { VisitCard } from '../../components/Card/VisitCard'
import { getAllSeniorsData, getVisitByIdData } from '../../api'

const VisitConfirmed: React.FC = () => {
    const visitId = Number(useLocation().pathname.split("/")[2]);

    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    if (!token) {
        navigateToRoute('/', navigate)
    }

    const userName = localStorage.getItem('name')

    const [visit, setVisit] = useState<VisitInterface | null>(null)
    const [senior, setSenior] = useState<SeniorInterface | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const visitData = await getVisitByIdData(visitId);
                const seniorData = await getAllSeniorsData();
                setVisit(visitData);
                setSenior(seniorData);
            } catch (error) {
                console.error("Error fetching senior data:", error);
            }
        };

        fetchData();
    }, [visitId])

    console.log(senior)

    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1>let's kaypoh!</h1>
            </div>

            <div className={'confirmVisit'}>
                <div className={'thankYou'}>
                    <h2>Visit Confirmed</h2>
                    <h3>
                        Thank you for volunteering, {userName?.split(' ')[0]}!
                    </h3>
                </div>
                <img className={'checkImg'} src={Check} />

                <Alert
                    className='alert'
                    // message={<h3 >Visit confirmed!</h3>}
                    // description={`Drop ${props.senior.name} a call to notify ${props.senior.gender.toLowerCase() === "m" ? 'him' : 'her'} that you're visiting!`} 
                    description={'A social worker will be reaching out to you on details of your first visit!'}
                    type="info"
                    showIcon
                />

                <h3 className={'visitDetails'}>Visit Details</h3>

                {visit &&
                    <VisitCard visit={visit} />}
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
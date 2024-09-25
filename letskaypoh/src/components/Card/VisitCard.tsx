import React, { useEffect, useState } from 'react'
import './styles.css'
import { Avatar, Button, Popconfirm, Tag } from 'antd'
import { SeniorInterface, VisitInterface, VisitStatus, visitToColorMapping } from '../../models/interfaces'
import { getSeniorByIdData } from '../../api'
import { handleCancelVisit, handleCheckInVisit, handleCompleteVisit, navigateToRoute, separatedArray } from '../utils'
import { CheckCircleTwoTone, ClockCircleOutlined, DownOutlined, EnvironmentOutlined, FrownTwoTone, UpOutlined, ZhihuOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Granny from '../../assets/logo.png'
import Grandpa from '../../assets/grandpa.jpg'

interface Props {
    visit: VisitInterface
    cancellable?: boolean
}

export const VisitCard: React.FC<Props> = (props) => {
    const { visit } = props
    const navigate = useNavigate(); 

    const [isActionsExpanded, setIsActionsExpanded] = useState<boolean>(false)

    const [senior, setSenior] = useState<SeniorInterface | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seniorData = await getSeniorByIdData(visit.senior_id);
                setSenior(seniorData);
            } catch (error) {
                console.error("Error fetching senior data:", error);
            }
        };

        fetchData();
    }, [visit.senior_id])

    const seniorAvatar = senior && <Avatar style={{height: '30px', marginRight: '0.5rem'}} src={senior.gender.toLowerCase() == 'm' ? Grandpa : Granny}/>


    const handleViewVisitDetails = () => {
        // add api to mark visit as completed
        navigateToRoute(`/visit-details/${visit.visit_id}`, navigate)
    }

    let visitDetails
    if (senior) {
        visitDetails = (
            <div className='visitInfo'>
                <div className='visitHeader'>
                    <Tag style={{ marginRight: 0, marginBottom: '0.5rem' }} color={visitToColorMapping[visit.status as VisitStatus]}>{visit.status}</Tag>
                    <div className={'visitDate'}>
                        {visit.date}
                    </div>
                </div>
                <div className={'visitTitle'}>
                    <span className={'seniorTitle'}> {seniorAvatar} Visit to {senior.name}</span>
                </div>

                <div className='visitRow'>
                    <ZhihuOutlined style={{ marginRight: '0.5rem' }}/>
                    <span style={{ marginRight: '0.25rem' }}>
                        This senior speaks {' '}
                    </span>
                    {separatedArray(senior.languages)}
                </div>

                <div className='visitRow'>
                    <ClockCircleOutlined style={{ marginRight: '0.5rem' }}/>
                    <span style={{ marginRight: '0.25rem' }}>
                        Visit time: 
                    </span>
                    {visit.time}
                </div>

                <div className='visitRow' style={{ marginBottom: '0.5rem' }}>
                    <EnvironmentOutlined style={{ marginRight: '0.5rem' }}/>
                    <span>
                        Postal: {senior.postal_code}
                    </span>
                </div>

                {props.cancellable &&
                    <>
                        <div className='visitRow'>
                            <a className='visitRow' onClick={() => setIsActionsExpanded(!isActionsExpanded)} >
                                View Actions 
                                {
                                    !isActionsExpanded ?  <DownOutlined style={{fontSize: '10px', marginLeft: '0.25rem', marginTop: '0.05rem'}} /> :
                                    <UpOutlined style={{fontSize: '10px', marginLeft: '0.25rem', marginTop: '0.05rem'}} />
                                }
                            </a>
                        </div>

                        {
                            isActionsExpanded &&
                            <div >
                                <Button className={'cancelBtn'} onClick={handleViewVisitDetails}>
                                    View Details
                                </Button>
                                {visit.status === VisitStatus.UPCOMING && 
                                <>
                                    <Button className={'cancelBtn'} onClick={() => handleCheckInVisit(visit)}>
                                        Check In <CheckCircleTwoTone twoToneColor={'#faad14'} />
                                    </Button>
                                    <Popconfirm 
                                        title={'Are you sure you want to cancel this visit?'}
                                        description={
                                            <div className='column'>
                                                The senior will be disappointed to see you cancel! 
                                                <FrownTwoTone style={{fontSize: '50px', marginTop: '1rem'}} twoToneColor="#eb2f96" />
                                            </div>
                                        }
                                        onConfirm={() => handleCancelVisit(visit)}
                                    >
                                        <Button className={'cancelBtn'}>
                                            Cancel Visit <FrownTwoTone twoToneColor="#eb2f96"/>
                                        </Button>
                                    </Popconfirm>
                                </>}
                                {visit.status === VisitStatus.ONGOING && <Button className={'cancelBtn'} onClick={() => handleCompleteVisit(visit, navigate)}>
                                    Mark as Completed <CheckCircleTwoTone twoToneColor="#52c41a" />
                                </Button>}
                            </div>
                        }
                    </>
                }
            </div>
        )
    }

    return (
        <div className='visitCard'>
            {visitDetails}
        </div>
    )
}

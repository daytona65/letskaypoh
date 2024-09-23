import React, { useEffect, useState } from 'react'
import './styles.css'
import { Button, message, Tag } from 'antd'
import { SeniorInterface, VisitInterface, VisitStatus, visitToColorMapping } from '../../models/interfaces'
import { getSeniorByIdData, updateVisit } from '../../api'
import { navigateToRoute, separatedArray } from '../utils'
import { CheckCircleTwoTone, ClockCircleOutlined, DownOutlined, EnvironmentOutlined, EnvironmentTwoTone, FrownTwoTone, UpOutlined, ZhihuOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

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


            //     label: 'Volunteers',
            //     children: <Avatar.Group
            //             max={{
            //                 count: 2,
            //                 style: { color: '#f56a00', backgroundColor: '#fde3cf' },
            //               }}
            //         >
            //             <Avatar src="https://avatar.iran.liara.run/public" />
            //             <a href="https://ant.design">
            //                 <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
            //             </a>
            //             <Tooltip title="Ant User" placement="top">
            //                 <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            //             </Tooltip>
            //             <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
            //         </Avatar.Group>
            // },
        // ]
    // }

    const handleViewVisitDetails = () => {
        // add api to mark visit as completed
        navigateToRoute(`/visit-details/${visit.visit_id}`, navigate)
    }

    const handleCompleteVisit = () => {
        // api to mark visit as completed
        try {
            updateVisit({
                "visit_id": visit.visit_id,
                "status": VisitStatus.COMPLETED 
            })
            
        } catch (error) {
            console.error("Error updating visit status:", error);
        }
        message.success('Visit completed!')
        navigateToRoute(`/visit-completed/${visit.visit_id}`, navigate)
    }

    const handleCheckInVisit = () => {
        // add api to check in visit 
        try {
            updateVisit({
                "visit_id": visit.visit_id,
                "status": VisitStatus.ONGOING 
            })
            
        } catch (error) {
            console.error("Error updating visit status:", error);
        }
        message.success('Checked in!')
    }

    const handleCancelVisit = () => {
        // api to mark visit as cancelled
        try {
            updateVisit({
                "visit_id": visit.visit_id,
                "status": VisitStatus.CANCELLED
            })
            
        } catch (error) {
            console.error("Error updating visit status:", error);
        }
        console.log('cancel visit')
        message.success('Visit cancelled!')
        // navigateToRoute(`/visit-completed/${visit.visit_id}`, navigate)
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
                    <span>Visit to {senior.name}</span>
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
                                    <Button className={'cancelBtn'} onClick={handleCheckInVisit}>
                                        Check In <EnvironmentTwoTone />
                                    </Button>
                                    <Button className={'cancelBtn'} onClick={handleCancelVisit}>
                                        Cancel Visit <FrownTwoTone twoToneColor="#eb2f96"/>
                                    </Button>
                                </>}
                                {visit.status === VisitStatus.ONGOING && <Button className={'cancelBtn'} onClick={handleCompleteVisit}>
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

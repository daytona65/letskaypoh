import React, { useEffect, useState } from 'react'
import './styles.css'
import { Button, Tag } from 'antd'
import { SeniorInterface, VisitInterface, VisitStatus, visitToColorMapping } from '../../models/interfaces'
import { getSeniorByIdData } from '../../api'
import { separatedArray } from '../utils'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface Props {
    visit: VisitInterface
    cancellable?: boolean
}

export const VisitCard: React.FC<Props> = (props) => {
    const { visit } = props

    const [isActionsExpanded, setIsActionsExpanded] = useState<boolean>(false)

    // add api endpoint
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

    // let infoItems: DescriptionsProps['items']
    // if (senior) {
        // infoItems = [
        //     {
        //         key: 'upcoming',
        //         label: 'Date',
        //         children: visit.datetime
        //     },
        //     {
        //         key: 'senior',
        //         label: 'Senior',
        //         children: separatedArray([senior.name, `${senior.age}${senior.gender}`])
        //     },
        //     {
        //         key: 'postal',
        //         label: 'Postal',
        //         children: senior.postal_code
        //     },
        //     {
        //         key: 'status',
        //         label: 'Status',
        //         children: <Tag color={visitToColorMapping[visit.status as VisitStatus]}>{visit.status}</Tag>
        //     },
            // {
            //     key: 'volunteers',
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

    let visitDetails
    if (senior) {
        visitDetails = (
            <div className='visitInfo'>
                <div className='visitHeader'>
                    <Tag style={{ marginRight: 0, marginBottom: '0.5rem' }} color={visitToColorMapping[visit.status as VisitStatus]}>{visit.status}</Tag>
                    <div className={'visitDate'}>
                        {visit.datetime}
                    </div>
                </div>
                <div className={'visitTitle'}>
                    <span>Visit to {senior.name}</span>
                </div>

                <div className='visitRow'>
                    <span style={{ marginRight: '0.25rem' }}>
                        This senior speaks {' '}
                    </span>
                    {separatedArray(senior.languages)}
                </div>

                <div className='visitRow' style={{ marginBottom: '0.5rem' }}>
                    <span>
                        Postal Code: {senior.postal_code}
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
                                <Button className={'cancelBtn'} onClick={() => console.log('cancel')}>
                                    Get Directions
                                </Button>
                                <Button className={'cancelBtn'} onClick={() => console.log('cancel')}>
                                    Mark as Completed
                                </Button>
                                <Button className={'cancelBtn'} onClick={() => console.log('cancel')}>
                                    Cancel Visit
                                </Button>
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

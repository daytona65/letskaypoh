import React, { useEffect, useState } from 'react'
import './styles.css'
import { Avatar, Button, Descriptions, DescriptionsProps, Tooltip } from 'antd'
import { navigateToRoute, separatedArray } from '../utils'
import { SeniorInterface, VisitInterface } from '../../models/interfaces'
import { useNavigate } from 'react-router-dom'
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'
import { getSeniorByIdData } from '../../api'

interface Props {
    visit: VisitInterface
}

export const VisitCard: React.FC<Props> = (props) => {
    const {visit} = props
    const navigate = useNavigate()

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
    let infoItems: DescriptionsProps['items']
    if (senior) {
        infoItems = [
            {
                key: 'upcoming',
                label: 'Scheduled',
                children: visit.datetime
            },
            {
                key: 'postal',
                label: 'Postal',
                children: senior.postal_code
            },
            {
                key: 'volunteers',
                label: 'Volunteers',
                children: <Avatar.Group
                        max={{
                            count: 2,
                            style: { color: '#f56a00', backgroundColor: '#fde3cf' },
                          }}
                    >
                        <Avatar src="https://avatar.iran.liara.run/public" />
                        <a href="https://ant.design">
                            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                        </a>
                        <Tooltip title="Ant User" placement="top">
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </Tooltip>
                        <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
                    </Avatar.Group>
            },
        ]
    }
    

    return (
        <div className={'card'}>
            <div className={'seniorProfile'}>
                {/* <h3>
                    {senior.title} {senior.name}, {senior.age}{senior.gender}
                </h3> */}
            </div>
            <div className={'visitInfo'}>
                <Descriptions 
                    items={infoItems}
                    layout={'horizontal'}
                    column={1}
                />
                
                

                <Button className={'cancelBtn'} onClick={() => navigateToRoute('/register-visit', navigate)}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}

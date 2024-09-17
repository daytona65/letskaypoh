import React from 'react'
import './styles.css'
import { Avatar, Button, Descriptions, DescriptionsProps, Tooltip } from 'antd'
import { navigateToRoute, separatedArray } from '../utils'
import { SeniorInterface, VisitInterface } from '../../models/interfaces'
import { useNavigate } from 'react-router-dom'
import { data } from '../../models/dummyData'
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'

interface Props {
    visit: VisitInterface
}

export const VisitCard: React.FC<Props> = (props) => {
    const {visit} = props
    const navigate = useNavigate()

    // add api endpoint to getSenior details from visit.seniorId

    const senior: SeniorInterface = data[0]

    const infoItems: DescriptionsProps['items'] = [
        {
            key: 'upcoming',
            label: 'Scheduled',
            children: visit.visitDate
        },
        {
            key: 'postal',
            label: 'Postal',
            children: senior.postalCode
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
                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                    <Tooltip title="Ant User" placement="top">
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </Tooltip>
                    <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
                </Avatar.Group>
        },
    ]

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

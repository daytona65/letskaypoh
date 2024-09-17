import React from 'react'
import './styles.css'
import { Button, Descriptions, DescriptionsProps } from 'antd'
import { navigateToRoute, separatedArray } from '../utils'
import { SeniorInterface } from '../../models/interfaces'
import { useNavigate } from 'react-router-dom'

interface Props {
    senior: SeniorInterface
}

export const SeniorCard: React.FC<Props> = (props) => {
    const {senior} = props
    const navigate = useNavigate()

    const infoItems: DescriptionsProps['items'] = [
        {
            key: 'lastVisited',
            label: 'Last Visited',
            children: senior.lastVisitedDate
        },
        {
            key: 'language',
            label: 'Languages',
            children: separatedArray(senior.languages)
        },
        {
            key: 'postal',
            label: 'Postal',
            children: senior.postalCode
        }
    ]

    return (
        <div className={'card'}>
            <div className={'seniorProfile'}>
                <h3>
                    {senior.title} {senior.name}, {senior.age}{senior.gender}
                </h3>
            </div>
            <div className={'visitInfo'}>
                <Descriptions 
                    items={infoItems}
                    layout={'horizontal'}
                    column={1}
                />
                <Button onClick={() => navigateToRoute('/register-visit', navigate)}>
                    Visit
                </Button>
                {/* <Avatar.Group
                    max={{
                        count: 2,
                        style: { color: '#f56a00', backgroundColor: '#fde3cf' },
                      }}
                >
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                    <a href="https://ant.design">
                        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                    </a>
                    <Tooltip title="Ant User" placement="top">
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </Tooltip>
                    <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
                    </Avatar.Group> */}
            </div>
        </div>
    )
}

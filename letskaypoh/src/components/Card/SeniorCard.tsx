import React from 'react'
import './styles.css'
import { Button, Descriptions, DescriptionsProps } from 'antd'
import { navigateToRoute, separatedArray } from '../utils'
import { SeniorInterface } from '../../models/interfaces'
import { useNavigate } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'

interface Props {
    senior: SeniorInterface
    closable: boolean
    onClose: () => void
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

    const closeBtn = <Button onClick={() => props.onClose()}>
    <CloseOutlined/>
</Button>

    return (
        <div className={'card'}>
            <div className={'seniorProfile'}>
                <h3>
                    {senior.name}, {senior.age}{senior.gender}
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
                {closeBtn}
            </div>
        </div>
    )
}

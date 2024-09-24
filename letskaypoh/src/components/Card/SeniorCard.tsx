import React, { CSSProperties } from 'react'
import './styles.css'
import { Button, Descriptions, DescriptionsProps } from 'antd'
import { navigateToRoute, separatedArray } from '../utils'
import { SeniorInterface } from '../../models/interfaces'
import { useNavigate } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'

interface Props {
    style?: CSSProperties
    senior: SeniorInterface
    closable?: boolean
    onClose?: () => void
    showVisitBtn?: boolean
}

export const SeniorCard: React.FC<Props> = (props) => {
    const {senior} = props
    const navigate = useNavigate()

    const infoItems: DescriptionsProps['items'] = [
        {
            key: 'lastVisited',
            label: 'Last Visited',
            children: senior.last_visited_date
        },
        {
            key: 'language',
            label: 'Languages',
            children: separatedArray(senior.languages)
        },
        {
            key: 'postal',
            label: 'Postal',
            children: senior.postal_code
        }
    ]

    const closeBtn = props.onClose && <CloseOutlined className='closeBtn' onClick={props.onClose}/>

    return (
        <div className={'card'} style={props.style}>
            <div className={'closeBtnDiv'}>
                {closeBtn}
            </div>

            <div className={'seniorProfile'}>
                <h3>
                    {senior.name}, {senior.age}{senior.gender}
                </h3>
            </div>
            <div>
                <Descriptions 
                    items={infoItems}
                    layout={'horizontal'}
                    column={1}
                />
                <div>

                {props.showVisitBtn && <Button onClick={() => navigateToRoute(`/register-visit/${senior.senior_id}`, navigate)}>
                    Visit
                </Button>}
                </div>
            </div>
        </div>
    )
}

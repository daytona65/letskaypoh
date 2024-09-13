import React from 'react'
import './styles.css'
import { Descriptions, DescriptionsProps } from 'antd'

interface Props {
    title: string
    surname: string
    age: number
    gender: string
    lastVisited: string
    languages: string[]
    postal: string
}

export const SeniorCard: React.FC<Props> = (props) => {
    const infoItems: DescriptionsProps['items'] = [
        {
            key: 'lastVisited',
            label: 'Last Visited',
            children: props.lastVisited
        },
        {
            key: 'language',
            label: 'Languages',
            children: props.languages.map((lang) => <div>{lang} {' '}</div>)
        },
        {
            key: 'postal',
            label: 'Postal',
            children: props.postal
        }
    ]

    return (
        <div className={'seniorCard'}>
            <div className={'seniorProfile'}>
                <h3>
                    {props.title} {props.surname} ({props.gender})
                </h3>
                <p>Age: {props.age}</p>
            </div>
            <div className={'visitInfo'}>
                <Descriptions 
                    items={infoItems}
                    layout={'horizontal'}
                    column={1}
                />
            </div>
        </div>
    )
}

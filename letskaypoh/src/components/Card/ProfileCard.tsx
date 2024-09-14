import React from 'react'
import './styles.css'
import cn from 'classnames'
import { UserInterface } from '../../models/interfaces'

interface Props {
    user: UserInterface
}

export const ProfileCard: React.FC<Props> = (props) => {
    const {user} = props
    return (
        <div className={cn('card','profileCard')}>
            <div className={'profile'}>
                <h3>
                    {user.name}
                </h3>
                <p>Age: {user.age}</p>
            </div>
            
        </div>
    )
}

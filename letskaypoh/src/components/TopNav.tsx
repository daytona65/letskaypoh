import React from 'react'
import './styles.css'
import { Button } from 'antd'
import { useScrollDirection } from './utils'

interface Props {
    onClickFeatures: () => void
    onClickAbout: () => void
    onClickTeam: () => void
    onClickJoin: () => void
}

const TopNav: React.FC<Props> = (props) => {
    const scrollDirection = useScrollDirection();

    return (
        <div className={`topNav ${scrollDirection === "down" ? "hide" : "show"}`}>
            <h1>let's kaypoh!</h1>
            <div className={'navRow'}>
                <a onClick={props.onClickFeatures}>Features</a>
                <a onClick={props.onClickAbout}>About Us</a>
                <a onClick={props.onClickTeam}>Our Team</a>
                <Button onClick={props.onClickJoin}>Join Us</Button>
            </div>
        </div>
    )
}

export default TopNav
import React from 'react'
import cn from 'classnames'
import { ArrowDownOutlined } from '@ant-design/icons'

interface Props {
    aboutRef: React.RefObject<HTMLDivElement>
    onClickTeam: () => void
}

const About: React.FC<Props> = (props) => {
    return (
        <div className={'entryContainer'} ref={props.aboutRef}>
            <div className={cn('about', 'fullHeight')}>
                <div className={'sectionHeading'}>About Us</div>
                <h1>let's kaypoh!</h1>

                <div className={cn('accentText')}>
                    <a>
                        A project for Open Government Products' Build For Good 2024
                    </a>
                </div>

                <p>
                    Social isolation in the elderly is a serious and growing issue.
                </p>

                <h2>
                    How do we help?
                </h2>

                <p>
                    Let's Kaypoh! aims to democratise and lower the barriers to volunteering by reducing the dependency on befriender organisations to allocate and schedule resources such as volunteer visitations and errand running.
                </p>

                <a onClick={props.onClickTeam} style={{ marginTop: '1rem' }}> <ArrowDownOutlined /> Meet the team</a>
            </div>
            <div className={cn('illustration', 'fullHeight')}>
                <img
                    className={'imgLeft'}
                    src="https://avatar.iran.liara.run/public/90" />
                <img
                    className={'imgRight'}
                    src="https://avatar.iran.liara.run/public/45" />
            </div>
        </div>
    )
}

export default About
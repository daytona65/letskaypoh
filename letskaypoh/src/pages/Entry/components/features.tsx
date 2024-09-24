import React from 'react'
import cn from 'classnames'
import { ArrowDownOutlined, CalendarOutlined, EnvironmentOutlined, FileDoneOutlined, HeartOutlined, HomeOutlined} from '@ant-design/icons'
import Granny from '../../../assets/logo.png'

export interface EntryBannerProps {
    sectionRef: React.RefObject<HTMLDivElement>
    onClickNextSection: () => void
}

export interface featuresItem {
	key: React.Key
    title: string
	icon: JSX.Element
	children: JSX.Element
}


const Features: React.FC<EntryBannerProps> = (props) => {

    const items: featuresItem[] = [
        {
            key: 1,
            title: 'Step 1: Locate a senior around you',
            icon: <EnvironmentOutlined />,
            children: (
                <div>Find a senior near you that speaks the same language as you. </div>
            )
        },
        {
            key: 2,
            title: 'Step 2: Set up a visit ',
            icon: <CalendarOutlined />,
            children: (
                <div>Select a convenient time for your visit. Once confirmed, a social worker will accompany you on your first visit.</div>
            )
        },
        {
            key: 3,
            title: 'Step 3: Show up and chat! ',
            icon: <HomeOutlined />,
            children: (
                <div>Go for your visit and have a chat with the senior to check in how they're doing. It can be for as short as 10 minutes.</div>
            )
        },
        {
            key: 3,
            title: 'Step 4: Record Visit Notes ',
            icon: <FileDoneOutlined />,
            children: (
                <div>Once your visit is completed, record your observations in our post-visit form to highlight if the senior requires any extra attention or resources.</div>
            )
        }
    ]

    const featureItems = items.map((item) => {
        return (<div className='descRow'>
            <div className='descIcon'>
                {item.icon}
            </div>
            <div className='desc'>
                <a className='descTitle'>
                    {item.title}
                </a>
                {item.children}
            </div>
        </div>)
    })
    
    return (
        <div className={'entryContainer'} ref={props.sectionRef}>
            <div className={cn('smallTitle', 'fullHeight')}>
                <div className={'sectionHeading'}>How it works</div>
                <h1>let's kaypoh!</h1>

                {featureItems}

                <a onClick={props.onClickNextSection} style={{ marginTop: '3rem' }}> <ArrowDownOutlined /> So what differentiates us? </a>
            </div>
            <div className={cn('illustration', 'fullHeight')}>
                <img
                    className={'imgLeft'}
                    src={Granny}/>
                <img
                    className={'imgRight'}
                    src="https://avatar.iran.liara.run/public/45" />
            </div>
        </div>
    )
}

export default Features
import React from 'react'
import cn from 'classnames'
import { ArrowDownOutlined, EnvironmentOutlined, HeartOutlined} from '@ant-design/icons'
import Granny from '../../../assets/logo.png'
import { EntryBannerProps, featuresItem } from './features'

const Features: React.FC<EntryBannerProps> = (props) => {

    const items: featuresItem[] = [
        {
            key: 1,
            title: 'LOWERED BARRIERS TO VOLUNTEERING',
            icon: <EnvironmentOutlined />,
            children: (
                <ul>
                    <li><b>Convenience</b> - volunteer with nearby seniors at a time of your choice, with low commitment.</li>
                    <li><b>Reduced language barriers</b> - volunteer with seniors who speak the same languages as you.</li>
                </ul>
            )
        },
        {
            key: 2,
            title: 'THE MORE THE MERRIER - Greater volunteer pool',
            icon: <HeartOutlined />,
            children: (
                <ul>
                    <li>
                        <b>Reduced dependencies</b> on befriender organisations to allocate and schedule resources such as volunteer visitations and errand running
                    </li>

                    <li>
                        <b>Alleviates manpower crunch</b> in befriender organisations
                    </li>

                    <li>
                        <b>Higher frequencies</b> of visits to check in on the seniors
                    </li>
                </ul>
            )
        }
    ]

    const valueItems = items.map((item) => {
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
                <div className={'sectionHeading'}>Our Value Propositions</div>
                <h1>let's kaypoh!</h1>

                <h2>
                    What we bring to the table
                </h2>

                {valueItems}

                <a onClick={props.onClickNextSection} style={{ marginTop: '1rem' }}> <ArrowDownOutlined /> Our Value Propositions </a>
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
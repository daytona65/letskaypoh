import React from 'react'
import cn from 'classnames'
import { ArrowDownOutlined, ClockCircleOutlined, EnvironmentOutlined, HeartOutlined, ZhihuOutlined} from '@ant-design/icons'
import VolunteerF from '../../../assets/volunteerF.jpg'
import VolunteerM from '../../../assets/volunteerM.jpg'
import { EntryBannerProps, featuresItem } from './features'

const Features: React.FC<EntryBannerProps> = (props) => {

    const volunteerItem: featuresItem[] = [
        {
            key: 1,
            title: 'HIGH FLEXIBILITY & GREATER CONVENIENCE',
            icon: <EnvironmentOutlined />,
            children: (
                <div>Volunteer with nearby seniors at a time of your choice. </div> 
            )
        },
        {
            key: 2,
            title: 'REDUCED LANGUAGE BARRIERS',
            icon: <ZhihuOutlined />,
            children: (
                <div>
                    Find seniors who speak the same languages as you.
                </div>
            )
        },
        {
            key: 3,
            title: 'LOW-TOUCH, LOW-COMMITMENTS',
            icon: <ClockCircleOutlined />,
            children: (
                <div>
                    Low touch for as quick as 15 minutes a visit with no minimum commitment period.
                </div>
            )
        },
    ]

    const orgItem: featuresItem[] = [
        {
            key: 4,
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

                    <li>
                        <b>Easier detections</b> of critical cases
                    </li>
                </ul>
            )
        }
    ]

    const volunteerItems = volunteerItem.map((item) => {
        return (<div key={item.key} className='descRow'>
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

    const orgItems = orgItem.map((item) => {
        return (<div key={item.key} className='descRow'>
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

                <h3 style={{marginBottom: 0}}>
                    As a volunteer...
                </h3>

                {volunteerItems}


                <h3 style={{marginBottom: 0, marginTop: '2rem'}}>
                    As a befriender organisation...
                </h3>

                {orgItems}

                <a onClick={props.onClickNextSection} style={{ marginTop: '1rem' }}> <ArrowDownOutlined /> Meet the Team </a>
            </div>
            <div className={cn('illustration', 'fullHeight')}>
                <img
                    className={'imgLeft'}
                    src={VolunteerF}/>
                <img
                    className={'imgRight'}
                    src={VolunteerM} />
            </div>
        </div>
    )
}

export default Features
import React from 'react'
import HomeScreenshot from '../../../assets/home.png'
import { ArrowDownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import cn from 'classnames'
import '../styles.css'
import '../../../App.css'
import BannerImg from '../../../assets/banner.png'

interface Props {
    onClickRegister: () => void
    onClickAbout: () => void
}

const LandingBanner: React.FC<Props> = ({onClickRegister, onClickAbout}) => {
    return (
    <div className={'entryContainer'}>
        <div className={cn('fullHeight', 'banner')}>
            <img className={'bannerImg'} src={BannerImg} />
            <div className={'subtitle'}>rebuild the kampung spirit with</div>
            <h1>let's kaypoh!</h1>
            <a>
                Redefining volunteering with the seniors.
            </a>
            <Button className={'joinButton'} onClick={onClickRegister}>
                Start Volunteering
            </Button>
            <a onClick={onClickAbout}><ArrowDownOutlined /> Read About Us</a>
        </div>
        <div>
            <img src={HomeScreenshot} className={'screenshot'} />
        </div>
    </div>
  )
}

export default LandingBanner
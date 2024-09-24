import React from 'react'
import cn from 'classnames'
import { ArrowDownOutlined } from '@ant-design/icons'
import Granny from '../../../assets/logo.png'
import Grandpa from '../../../assets/grandpa.jpg'
import { EntryBannerProps } from './features'

const About: React.FC<EntryBannerProps> = (props) => {
    return (
        <div className={'entryContainer'} ref={props.sectionRef}>
            <div className={cn('about', 'fullHeight')}>
                <div className={'sectionHeading'}>About Us</div>
                <h1>let's kaypoh!</h1>

                <div className={cn('accentText')}>
                    <a>
                        Kay-poh / noun & adjective
                    </a>
                </div>

                <p>
                    Kaypoh is a Singaporean slang usually used to described a person who is nosy or prying. But Kaypoh does not necessary needs to be negative.
                </p>
                <p>
                    As the Singapore population ages, the demand for senior care has become more pressing.
                    Most seniors are worrying about being alone at home and having no one to help them when they are in need. 
                </p>
                <p>
                    But.. how can we show some care and concern to our next door seniors?
                </p>

                <h2>
                    We can help.
                </h2>

                <p>
                    Let’s Kaypoh aims to rally the help from the community to <b><i>"kaypoh"</i></b> and check-in on seniors who are living alone around their neighbourhood.

                    We hope to build a closer knit community by encouraging the younger generations to cultivate an organic relationship with the elderly.
                </p>

                <h4>
                    Let’s be a kind Kaypoh today!
                </h4>

                <a onClick={props.onClickNextSection} style={{ marginTop: '1rem' }}> <ArrowDownOutlined /> See how it works </a>
            </div>
            <div className={cn('illustration', 'fullHeight')}>
                <img
                    className={'imgLeft'}
                    src={Granny} />
                <img
                    className={'imgRight'}
                    src={Grandpa} />
            </div>
        </div>
    )
}

export default About
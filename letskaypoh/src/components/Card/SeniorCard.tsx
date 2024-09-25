import React, { CSSProperties, useEffect, useState } from 'react'
import './styles.css'
import { Avatar, Button, Divider } from 'antd'
import { navigateToRoute, separatedArray } from '../utils'
import { SeniorInterface } from '../../models/interfaces'
import { useNavigate } from 'react-router-dom'
import { CalendarOutlined, CloseOutlined, DislikeOutlined, DownOutlined, EnvironmentOutlined, HeartOutlined, MessageOutlined, UpOutlined, ZhihuOutlined } from '@ant-design/icons'
import { APIProvider } from '@vis.gl/react-google-maps'
import CustomMap, { Coordinates } from '../../pages/Home/components/Map/Map'
import { profileItem } from '../../pages/VisitDetails'
import Granny from '../../assets/logo.png'
import Grandpa from '../../assets/grandpa.jpg'

interface Props {
    style?: CSSProperties
    senior: SeniorInterface
    onClose?: () => void
    showVisitBtn?: boolean
    showDetails?: boolean
}

export const SeniorCard: React.FC<Props> = (props) => {
    const { senior } = props
    const navigate = useNavigate()

    const [isMapExpanded, setIsMapExpanded] = useState<boolean>(false)
    const [isDetailExpanded, setIsDetailExpanded] = useState<boolean>(false)
    const [daysLastVisited, setDaysLastVisited] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const days = senior.daysLastVisited
                
                if (days === "NEVER VISITED") {
                    setDaysLastVisited(days);
                } else {
                    setDaysLastVisited(String(days) + " days ago")
                }

            } catch (error) {
                console.error("Error fetching days:", error);
            }
        };

        fetchData();
    }, [senior])

    const [currentLocation, setCurrentLocation] = useState<Coordinates>({ lat: 1.287953, lng: 103.851784 })

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }

                setCurrentLocation(pos);
                localStorage.setItem('lat', String(position.coords.latitude))
                localStorage.setItem('lon', String(position.coords.longitude))

            });
        } else {
            console.error("Geolocation is not available in your browser.");
        }
    }, []);

    const closeBtn = props.onClose && <CloseOutlined className='closeBtn' onClick={props.onClose} />

    const seniorProfileItems: profileItem[] = senior ? [
        {
            key: 'likes',
            label: 'Story',
            icon: <HeartOutlined />,
            children: <span>{senior.story}</span>
        },
        {
            key: 'dislikes',
            label: 'Dislikes',
            icon: <DislikeOutlined />,
            children: <span>{senior.dislikes}</span>
        },
        {
            key: 'social',
            label: 'Social',
            icon: <MessageOutlined />,
            children: <span>{senior.social}</span>
        },
    ] : []

    const seniorProfileAttributes = seniorProfileItems.map((attr) => {
        return (
            <>
                <div key={attr.key} className={'seniorProfileDetailMini'}>
                    <span>{attr.icon} <h4>{attr.label}</h4></span>
                    {attr.children}
                </div>
            </>
        )
    })
    const seniorAvatar = <Avatar style={{height: '30px', marginRight: '0.5rem'}} src={senior.gender.toLowerCase() == 'm' ? Grandpa : Granny}/>

    return (
        <div className={'card'} style={props.style}>
            <div className='visitInfo'>
                <div className='visitHeader' style={{ marginBottom: '0.5rem' }}>
                    <div className={'visitTitle'}>
                        <span className={'seniorTitle'}>{seniorAvatar} {senior.name}, {senior.age}{senior.gender}</span>
                    </div>
                    <div className={'closeBtnDiv'}>
                        {closeBtn}
                    </div>
                </div>

                <div className='visitRow'>
                    <ZhihuOutlined style={{ marginRight: '0.5rem' }} />
                    <span style={{ marginRight: '0.25rem' }}>
                        This senior speaks {' '}
                    </span>
                    {separatedArray(senior.languages)}
                </div>

                <div className='visitRow'>
                    <CalendarOutlined style={{ marginRight: '0.5rem' }} />
                    <span style={{ marginRight: '0.25rem' }}>
                        Last Visited:
                    </span>
                    {daysLastVisited}
                </div>

                <div className='visitRow' style={{ marginBottom: '0.5rem' }}>
                    <EnvironmentOutlined style={{ marginRight: '0.5rem' }} />
                    <span>
                        Postal: {senior.postal_code}
                    </span>
                </div>

                {props.showVisitBtn && <Button onClick={() => navigateToRoute(`/register-visit/${senior.senior_id}`, navigate)}>
                    Visit
                </Button>}

                {props.showDetails &&
                    <>
                        <a className='visitRow' onClick={() => setIsMapExpanded(!isMapExpanded)} >
                            View Map
                            {
                                !isDetailExpanded ? <DownOutlined style={{ fontSize: '10px', marginLeft: '0.25rem', marginTop: '0.05rem' }} /> :
                                    <UpOutlined style={{ fontSize: '10px', marginLeft: '0.25rem', marginTop: '0.05rem' }} />
                            }
                        </a>
                        <div className='visitInfo'>
                            {
                                isMapExpanded &&
                                <div className='map'>
                                    <APIProvider
                                        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                                        onLoad={() => console.log('maps api 2 has loaded')}
                                    >
                                        <CustomMap
                                            locations={[senior]}
                                            defaultCenter={{ lat: senior.lat, lng: senior.lon }}
                                            showDirections={true}
                                            defaultZoom={15}
                                            hideDetails={true}
                                            currentLocation={currentLocation}
                                        />

                                    </APIProvider>
                                </div>
                            }
                        </div>

                        <Divider style={{ margin: '0' }} />

                        <div className='visitRow' style={{marginTop: '4px'}}>
                            <a className='visitRow' onClick={() => setIsDetailExpanded(!isDetailExpanded)} >
                                About the Senior
                                {
                                    !isDetailExpanded ? <DownOutlined style={{ fontSize: '10px', marginLeft: '0.25rem', marginTop: '0.05rem' }} /> :
                                        <UpOutlined style={{ fontSize: '10px', marginLeft: '0.25rem', marginTop: '0.05rem' }} />
                                }
                            </a>
                        </div>

                        <div className='visitInfo'>
                            {
                                isDetailExpanded &&
                                <>
                                    {seniorProfileAttributes}
                                </>
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

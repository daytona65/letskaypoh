import { CalendarOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './styles.css'
import { navigateToRoute, useScrollDirection } from './utils'
import { Avatar } from 'antd'

interface navItem {
    key: React.Key
    title: string
    icon: JSX.Element
    path: string
}

interface Props {
    isLoggedIn: boolean
}

export const NavBar: React.FC<Props> = ({isLoggedIn}) => {
    const navigate = useNavigate(); 

    const scrollDirection = useScrollDirection();

    
    const navItems: navItem[] = [
        {
            key: 1,
            title: 'Explore',
            icon: <SearchOutlined onClick={() => navigateToRoute('/home', navigate)}/>,
            path: '/home'
        },
        {
            key: 2,
            title: 'Visits',
            icon: <CalendarOutlined onClick={() => navigateToRoute('/visits', navigate)}/>,
            path: '/visits'
        },
        {
            key: 3,
            title: 'Profile',
            icon: <UserOutlined onClick={() => navigateToRoute(isLoggedIn ? 'profile' : '/register', navigate)}/>,
            path: '/profile'
        }
    ]

    const bottomMenu = navItems.map((navItem) => {
        if (isLoggedIn && navItem.title === 'Profile') {
            return (
                <div key={navItem.key} className={'nav-btn'}>
                    <div onClick={() => navigateToRoute(navItem.path, navigate)}>
                        <Avatar className={'avatar'} src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}/>
                    </div>
                    {navItem.title}
                </div>
            )
        }

        return (
            <div key={navItem.key} className={'nav-btn'}>
                {navItem.icon}
                {navItem.title}
            </div>
        )
    })

    const topMenu = navItems.map((navItem) => {
        if (isLoggedIn && navItem.title === 'Profile') {
            return (
                <div key={navItem.key} className={'nav-btn'} onClick={() => navigateToRoute(navItem.path, navigate)}>
                    <Avatar className={'avatar'} src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}/>
                </div>
            )
        }

        return (
            <a key={navItem.key} onClick={() => navigateToRoute(navItem.path, navigate)}>
                {navItem.title}
            </a>
        )
    })

    return (
        <>
            <div className={'bottom-nav'}>
                {bottomMenu}
            </div>
            <div className={`topAppNav ${scrollDirection === "down" ? "hide" : "show"}`}>
                <h1>let's kaypoh!</h1>
                <div className={'appNavRow'}>
                    {topMenu}
                </div>
            </div>
        </>
    )
}

export const NavBarWrapper: React.FC<Props> = ({isLoggedIn}) => {
    return (
      <div>
        <NavBar isLoggedIn={isLoggedIn}/>
        <Outlet/>
      </div>
    )
}

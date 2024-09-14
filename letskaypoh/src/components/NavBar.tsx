import { CalendarOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './styles.css'

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
    const routeChange = (path: string) =>{ 
      navigate(path);
    }
    
    const navItems: navItem[] = [
        {
            key: 1,
            title: 'Explore',
            icon: <SearchOutlined onClick={() => routeChange('/home')}/>,
            path: '/home'
        },
        {
            key: 2,
            title: 'Visits',
            icon: <CalendarOutlined onClick={() => routeChange('/visits')}/>,
            path: '/visits'
        },
        {
            key: 3,
            title: 'Profile',
            icon: <UserOutlined onClick={() => routeChange(isLoggedIn ? 'profile' : '/register')}/>,
            path: '/profile'
        }
    ]

    const menu = navItems.map((navItem) => {
        return (
            <div key={navItem.key} className={'nav-btn'}>
                {navItem.icon}
                {navItem.title}
            </div>
        )
    })

    return (
        <div className={'bottom-nav'}>
            {menu}
        </div>
    )
}

export const NavBarWrapper: React.FC<Props> = ({isLoggedIn}) => {
    return (
      <div>
        <Outlet/>
        <NavBar isLoggedIn={isLoggedIn}/>
      </div>
    )
}

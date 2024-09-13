import { CalendarOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './styles.css'

interface navItem {
    title: string
    icon: JSX.Element
    path: string
}

export const NavBar = () => {
    const navigate = useNavigate(); 
    const routeChange = (path: string) =>{ 
      navigate(path);
    }
    
    const navItems: navItem[] = [
        {
            title: 'Explore',
            icon: <SearchOutlined onClick={() => routeChange('/home')}/>,
            path: '/home'
        },
        {
            title: 'Visits',
            icon: <CalendarOutlined onClick={() => routeChange('/visits')}/>,
            path: '/visits'
        },
        {
            title: 'Profile',
            icon: <UserOutlined onClick={() => routeChange('/register')}/>,
            path: '/profile'
        }
    ]

    const menu = navItems.map((navItem) => {
        return (
            <div className={'nav-btn'}>
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

export const NavBarWrapper = () => {
    return (
      <div>
        <Outlet/>
        <NavBar/>
      </div>
    )
}

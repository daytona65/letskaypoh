import { ApiOutlined, DesktopOutlined, FormatPainterOutlined, ProjectOutlined } from '@ant-design/icons'
import React from 'react'
import '../../../App.css'
import './../styles.css'
import cn from 'classnames'
import { Avatar } from 'antd';

interface memberItem {
  key: number
  name: string
  role: string
  icon: JSX.Element
  imgPath: string
}

interface Props {
  teamRef: React.RefObject<HTMLDivElement>

}

const Team: React.FC<Props> = (props) => {
  const members: memberItem[] = [
    {
      key: 1,
      name: 'Ker Yang Low',
      role: 'Product & Project Manager',
      icon: <ProjectOutlined />,
      imgPath: 'https://avatar.iran.liara.run/public/15',
    },
    {
      key: 2,
      name: 'Nicholas Halim',
      role: 'Software Engineer (Backend)',
      icon: <ApiOutlined />,
      imgPath: 'https://avatar.iran.liara.run/public/21',
    },
    {
      key: 3,
      name: 'Elaine Chua',
      role: 'UI/UX Designer',
      icon: <FormatPainterOutlined />,
      imgPath: 'https://avatar.iran.liara.run/public/73',
    },
    {
      key: 4,
      name: 'Josephine Hemingway',
      role: 'Frontend Engineer',
      icon: <DesktopOutlined />,
      imgPath: 'https://avatar.iran.liara.run/public/80',
    },
    
  ]

  const teamMembers = members.map((member) => {
    return (
      <div 
        key={member.key} 
        className={'column'} 
      >
        <div>
          <Avatar
              className={'teamImg'}
              src={member.imgPath} />
        </div>
        <div className={'column'} style={{marginBottom: '1rem'}}>
          {member.name}
          <a>{member.role}</a>
        </div>
      </div>
    )
  })

  return (
    <div className={cn('teamContainer', 'fullHeight')} ref={props.teamRef}>
        <div className={cn('teamSection')}>
            <div className={'sectionHeading'} style={{textAlign: 'center'}}>Meet the team</div>
            <h1>let's kaypoh!</h1>

            <div className={cn('accentText')}>
              <a>Team Bob (The Builders) </a>
            </div>

            <p>
              We are a team passionate about ....
            </p>
        </div>
        <div className={cn('team')}>
          {teamMembers}
        </div>
			</div>
  )
}

export default Team
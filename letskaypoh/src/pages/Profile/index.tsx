import React from 'react'
import { EditOutlined, HomeOutlined, MailOutlined, PhoneOutlined, ZhihuOutlined } from '@ant-design/icons'
import { UserInterface } from '../../models/interfaces'
import { separatedArray } from '../../components/utils'
import './styles.css'
import { Button, Divider, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import { data } from '../../models/dummyData'
import { SeniorCard } from '../../components/Card/SeniorCard'

interface Props {
	user: UserInterface
}

interface profileItem {
	key: React.Key
	icon: JSX.Element
	children: JSX.Element
}


const Profile: React.FC<Props> = (props) => {
	const { user } = props

	const navigate = useNavigate();
	const routeChange = (path: string) => {
		navigate(path);
	}

	const seniorCards = data.map((senior) => {
		return <SeniorCard
			senior={senior}
		/>
	})

	const profileItems: profileItem[] = [
		{
			key: 'languages',
			icon: <ZhihuOutlined />,
			children: (
				<span>
					Speaks {' '}
					<span>
						{separatedArray(user.languages)}
					</span>
				</span>
			)
		},
		{
			key: 'address',
			icon: <HomeOutlined />,
			children: (
				<span>
					Lives in {' '}
					<span>
						{user.area}
					</span>
				</span>
			)
		},
		{
			key: 'email',
			icon: <MailOutlined />,
			children: <span>{user.email}</span>
		},
		{
			key: 'mobile',
			icon: <PhoneOutlined />,
			children: <span>{user.mobile}</span>
		}
	]

	const profileAttributes = profileItems.map((attr) => {
		return (
			<>
				<div key={attr.key} className={'profileDetail'}>
					{attr.icon}
					{attr.children}
				</div>
				<Divider style={{ margin: '0.5rem' }} />
			</>
		)
	})

	return (
		<div className={'container'}>
			<div className={'section'}>
				<div className={'row'}>
					<h3>Profile</h3>
					<a> <EditOutlined /> Edit</a>
				</div>
				<Image
					className={'profileImg'}
					width={150}
					src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
				/>
				<div className={'column'}>
					<h2 className={'name'}>
						{user.name}, {user.age}{user.gender}
					</h2>

					{profileAttributes}
				</div>
			</div>

			<div className={'section'}>
				<div className={'row'}>
					<h3>Visit History</h3>
					<a> <EditOutlined /> Edit</a>
				</div>
				{seniorCards}
			</div>
			
			<Button className={'logOut'} onClick={() => routeChange('/entry')}>
				Log Out
			</Button>
		</div>
	)
}

export default Profile
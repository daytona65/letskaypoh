import React, { useEffect, useState } from 'react'
import { HomeOutlined, LogoutOutlined, MailOutlined, PhoneOutlined, ZhihuOutlined } from '@ant-design/icons'
import { SeniorInterface, UserInterface } from '../../models/interfaces'
import { navigateToRoute, separatedArray } from '../../components/utils'
import './styles.css'
import { Divider, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import { SeniorCard } from '../../components/Card/SeniorCard'
import { getAllSeniorsData, getSeniorByIdData, getUserByIdData } from '../../api'

interface profileItem {
	key: React.Key
	icon: JSX.Element
	children: JSX.Element
}


const Profile: React.FC = () => {

	const user: UserInterface = {
		user_id: 1,
		nric: localStorage.getItem('nric')!,
		name: localStorage.getItem('name')!,
		email: localStorage.getItem('email')!,
		mobile: localStorage.getItem('mobile')!,
		gender: localStorage.getItem('gender')!,
		age: Number(localStorage.getItem('age'))!,
		languages: JSON.parse(localStorage.getItem('languages')!),
		postal_code: Number(localStorage.getItem('postalCode'))!,
		address: localStorage.getItem('address')!,
	}

	const navigate = useNavigate();

	// add api endpoint - get user - but i think should be done in main.tsx
	const [seniors, setSeniors] = useState<SeniorInterface[] | []>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seniorData = await getAllSeniorsData();
                setSeniors(seniorData);
            } catch (error) {
                console.error("Error fetching senior data:", error);
            }
        };

        fetchData();
    }, [user])
	const seniorCards = seniors.map((senior) => {
		return <SeniorCard
			senior={senior} closable={false} onClose={function (): void {
				throw new Error('Function not implemented.')
			} }		/>
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
						{user.address}
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
					<a onClick={() => navigateToRoute('/entry', navigate)}> <LogoutOutlined /> Sign Out</a>
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

			<div className={'section'} style={{ marginBottom: '5rem' }}>
				<div className={'row'}>
					<h3>Visit History</h3>
				</div>
				{seniorCards}
			</div>

			{/* <Button className={'logOut'} onClick={() => navigateToRoute('/entry', navigate)}>
				<LogoutOutlined /> Log Out
			</Button> */}
		</div>
	)
}

export default Profile
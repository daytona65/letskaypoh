import React, { useRef, useState } from 'react'
import '../../App.css'
import './styles.css'
import { useNavigate } from "react-router-dom";
import LandingBanner from './components/landingBanner';
import Team from './components/team';
import TopNav from '../../components/TopNav';
import About from './components/about';
import LoginModal from '../../components/LoginModal';

const Entry = () => {
	const navigate = useNavigate();
	const routeChange = (path: string) => {
		navigate(path);
	}

	const aboutRef = useRef<HTMLDivElement>(null);
	const teamRef = useRef<HTMLDivElement>(null);

	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false)

	const onClickJoin = () => {
		setIsRegisterModalOpen(true)
	}

	const onCloseModal = () => {
		setIsRegisterModalOpen(false)
	}

	const onClickAbout = () => {
		const node: HTMLDivElement | null = aboutRef.current;
		window.scrollTo({ top: node!.offsetTop, left: 0, behavior: "smooth" });
	};

	const onClickTeam = () => {
		const node: HTMLDivElement | null = teamRef.current;
		window.scrollTo({ top: node!.offsetTop, left: 0, behavior: "smooth" });
	};

	const onClickRegister = () => {
		routeChange('/register')
	}

	return (
		<>
			<TopNav  
				onClickFeatures={onClickAbout} 
				onClickAbout={onClickAbout} 
				onClickTeam={onClickTeam} 
				onClickJoin={onClickJoin} 
			/>
			<LandingBanner 
				onClickRegister={onClickJoin} 
				onClickAbout={onClickAbout} 
			/>
			<About aboutRef={aboutRef} onClickTeam={onClickTeam}/>
			<Team teamRef={teamRef} />
			<LoginModal 
				open={isRegisterModalOpen} 
				handleClose={onCloseModal} 
				onClickRegister={onClickRegister} 
			/>
		</>
	)
}

export default Entry
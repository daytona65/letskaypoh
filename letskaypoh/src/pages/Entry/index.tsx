import { useRef, useState } from 'react'
import '../../App.css'
import './styles.css'
import { useNavigate } from "react-router-dom";
import LandingBanner from './components/landingBanner';
import Team from './components/team';
import TopNav from '../../components/TopNav';
import About from './components/about';
import LoginModal from '../../components/LoginModal';
import { navigateToRoute } from '../../components/utils';

const Entry = () => {
	const navigate = useNavigate();

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
		navigateToRoute('/register', navigate)
	}

	const onClickLogin = () => {
		navigateToRoute('/home', navigate) // go to login
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
			<Team teamRef={teamRef} onClickRegister={onClickRegister} />
			<LoginModal 
				open={isRegisterModalOpen} 
				handleClose={onCloseModal} 
				onClickRegister={onClickRegister}
				onClickLogin={onClickLogin} 
			/>
		</>
	)
}

export default Entry
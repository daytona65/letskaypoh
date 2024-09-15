import React, { useRef } from 'react'
import '../../App.css'
import './styles.css'
import { useNavigate } from "react-router-dom";
import cn from 'classnames'
import LandingBanner from './components/landingBanner';
import { ArrowDownOutlined } from '@ant-design/icons';
import Team from './components/team';
import TopNav from '../../components/TopNav';

const Entry = () => {
	const navigate = useNavigate();
	const routeChange = (path: string) => {
		navigate(path);
	}

	const aboutRef = useRef<HTMLDivElement>(null);
	const teamRef = useRef<HTMLDivElement>(null);

	const onClickAbout = () => {
		const node: HTMLDivElement | null = aboutRef.current;
		window.scrollTo({ top: node!.offsetTop, left: 0, behavior: "smooth" });
	};

	const onClickTeam = () => {
		const node: HTMLDivElement | null = teamRef.current;
		window.scrollTo({ top: node!.offsetTop, left: 0, behavior: "smooth" });
	};

	return (
		<>
			<TopNav  onClickFeatures={onClickAbout} onClickAbout={onClickAbout} onClickTeam={onClickTeam} onClickJoin={() => routeChange('/register')} />
			<LandingBanner onClickRegister={() => routeChange('/register')} onClickAbout={onClickAbout} />

			<div className={'entryContainer'} ref={aboutRef}>
				<div className={cn('about', 'fullHeight')}>
					<div className={'sectionHeading'}>About Us</div>
					<h1>let's kaypoh!</h1>

					<div className={cn('accentText')}>
						<a>
							A project for Open Government Products' Build For Good 2024
						</a>
					</div>

					<p>
						Social isolation in the elderly is a serious and growing issue.
					</p>

					<h2>
						How do we help?
					</h2>

					<p>
						Let's Kaypoh! aims to democratise and lower the barriers to volunteering by reducing the dependency on befriender organisations to allocate and schedule resources such as volunteer visitations and errand running.
					</p>

					<a onClick={onClickTeam} style={{marginTop: '1rem'}}> <ArrowDownOutlined /> Meet the team</a>
				</div>
				<div className={cn('illustration', 'fullHeight')}>
					<img
						className={'imgLeft'}
						src="https://avatar.iran.liara.run/public/90" />
					<img
						className={'imgRight'}
						src="https://avatar.iran.liara.run/public/45" />
				</div>
			</div>

			<Team teamRef={teamRef} />
		</>
	)
}

export default Entry
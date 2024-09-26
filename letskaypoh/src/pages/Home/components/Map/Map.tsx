import React, { useEffect, useState } from 'react'
import { AdvancedMarker, Map} from '@vis.gl/react-google-maps';
import './styles.css'
import { SeniorInterface } from '../../../../models/interfaces';
import { SeniorCard } from '../../../../components/Card/SeniorCard';
import { Directions } from '../mapDirections';

export interface Coordinates {
	lat: number,
	lng: number
}

type Props = {
	locations: SeniorInterface[]
	defaultCenter: Coordinates
	showDirections?: boolean
	defaultZoom?: number
	hideDetails?: boolean
	currentLocation: Coordinates
}

export type MarkerProps = {
	info: SeniorInterface;
	position: Coordinates
	hideDetails?: boolean
}

const CustomMap: React.FC<Props> = ({ locations, defaultCenter, defaultZoom, showDirections, hideDetails, currentLocation }) => {
	const [closeAllInfoWindows, setCloseAllInfoWindows] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<number | null>(null);

	const CustomMarker: React.FC<MarkerProps> = ({ info, position, hideDetails }) => {
		const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);

		useEffect(() => {
			if (selectedId === info.senior_id && !closeAllInfoWindows && !hideDetails) {
			  setShowInfoWindow(true);
			} else {
			  setShowInfoWindow(false);
			}
		  }, [selectedId, closeAllInfoWindows, hideDetails, info.senior_id]);
		
		return (
			<AdvancedMarker
				position={position}
				onClick={() => {
					setCloseAllInfoWindows(false);
					setSelectedId(info.senior_id);
					setShowInfoWindow(true);
					
				}}
				style={{zIndex: 0}}
			>
				<div>
					{(showInfoWindow) ?
						<SeniorCard 
							senior={info} 
							onClose={() => setShowInfoWindow(false)} 
							showVisitBtn={true}
							style={{zIndex: selectedId === info.senior_id ? 120398 : -500}}
						/> :
						<div 
							className={`seniorMarker ${
								info.daysLastVisited === "NEVER VISITED" || info.daysLastVisited > 5 ? 'red' : 
								info.daysLastVisited > 3 ? 'yellow' : 'green'
							}`} 
						>
							{info.name}
						</div>
					}
				</div>
			</AdvancedMarker>
		);
	}

	return (
		<Map
			clickableIcons={false}
			disableDefaultUI
			gestureHandling={'greedy'}
			mapId={'7c0e62f0200dd8aa'}
			defaultZoom={defaultZoom ?? 15}
			defaultCenter={defaultCenter}
			onClick={() => setCloseAllInfoWindows(true)}
		>
			{locations?.map(marker => (
				<CustomMarker
					key={marker.senior_id}
					info={marker}
					position={{ lat: currentLocation.lat + marker.lat, lng: currentLocation.lng + marker.lon }}
					hideDetails={hideDetails}
				/>
			))}

			<AdvancedMarker
				position={currentLocation}
			>
				<div className={'userMarker'} ></div>
			</AdvancedMarker>

			{showDirections && 
				<Directions 
					origin={currentLocation}
					destination={{lat: locations[0].lat, lng: locations[0].lon}}
				/>
			}
		</Map>
	)
}

export default CustomMap


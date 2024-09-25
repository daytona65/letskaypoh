import React, { useCallback, useEffect, useState } from 'react'
import { AdvancedMarker, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
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

	const CustomMarker: React.FC<MarkerProps> = ({ info, position, hideDetails }) => {
		const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);
		useEffect(() => {
			if (closeAllInfoWindows) {
				setShowInfoWindow(false);
			}
			setCloseAllInfoWindows(false);
		}, [closeAllInfoWindows]);

		return (
			<AdvancedMarker
				position={position}
				onClick={() => {
					setShowInfoWindow(true);
					setCloseAllInfoWindows(false);
				}}
			>
				<div>
					{(showInfoWindow && !closeAllInfoWindows && !hideDetails) ?
						<SeniorCard 
							// style={{zIndex: locations.length + 100, position: 'sticky'}}
							senior={info} 
							closable={true} 
							onClose={() => setShowInfoWindow(false)} 
							showVisitBtn={true}
						/> :
						<div 
							className={'seniorMarker'} 
							// style={{zIndex: locations.indexOf(info),  position: 'sticky'}}
						>
							{info.name}
						</div>
					}
				</div>
			</AdvancedMarker>
		);
	}

	const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
		console.log('camera changed: ', ev.detail);
	}, []);


	return (
		<Map
			clickableIcons={false}
			disableDefaultUI
			gestureHandling={'greedy'}
			onCameraChanged={handleCameraChange}
			mapId={'7c0e62f0200dd8aa'}
			defaultZoom={defaultZoom ?? 13}
			defaultCenter={defaultCenter}
			onClick={() => setCloseAllInfoWindows(true)}
		>
			{locations?.map(marker => (
				<CustomMarker
					key={marker.senior_id}
					info={marker}
					position={{ lat: marker.lat, lng: marker.lon }}
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


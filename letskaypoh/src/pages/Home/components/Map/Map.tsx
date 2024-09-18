import React, { useCallback, useEffect, useState } from 'react'
import { AdvancedMarker, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
import './styles.css'
import { SeniorInterface } from '../../../../models/interfaces';
import { SeniorCard } from '../../../../components/Card/SeniorCard';

interface Coordinates {
	lat: number,
	lng: number
}

type Props = {
	locations: SeniorInterface[]
}

export type MarkerProps = {
	info: SeniorInterface;
	position: Coordinates
}

const CustomMap: React.FC<Props> = ({ locations }) => {
	const [center, setCenter] = useState<Coordinates>({ lat: 1.287953, lng: 103.851784 })
	const [currentLocation, setCurrentLocation] = useState<Coordinates>({ lat: 1.287953, lng: 103.851784 })
	// const [currentZoom, setCurrentZoom] = useState<number>(13)

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}
				setCenter(pos);
				setCurrentLocation(pos);
			});
		} else {
			console.log("Geolocation is not available in your browser.");
		}
	}, []);


	const CustomMarker: React.FC<MarkerProps> = ({ info, position }) => {
		const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false)

		return (
			<AdvancedMarker
				position={position}
				onClick={() => setShowInfoWindow(true)}
			>
				<div
					// onMouseEnter={() => setShowInfoWindow(true)}
					// onMouseLeave={() => setShowInfoWindow(false)}
				>
					{(showInfoWindow) ?
							<SeniorCard senior={info} closable={true} onClose={() => setShowInfoWindow(false)} showVisitBtn={true}/> :
						<div className={'seniorMarker'} >
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
			mapId={'hi'}
			defaultZoom={13}
			defaultCenter={center}
		// zoom={currentZoom}
		// center={center}
		// styles={mapStyles}
		>
			{locations?.map(marker => (
				<CustomMarker
					key={marker.senior_id}
					info={marker}
					position={{ lat: marker.lat, lng: marker.lon }}
				/>
			))}

			<AdvancedMarker
				position={currentLocation}
			>
				<div className={'userMarker'} ></div>
			</AdvancedMarker>
		</Map>
	)
}

export default CustomMap


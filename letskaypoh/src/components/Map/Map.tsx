import React, { useCallback, useEffect, useState } from 'react'
// import mapStyles from './mapStyles';
import { SeniorInterface } from '../../models/interfaces';
import { AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, Marker } from '@vis.gl/react-google-maps';
import './styles.css'
import { SeniorCard } from '../Card/SeniorCard';

interface Coordinates {
	lat: number,
	lng: number
}

type Props = {
	destinationName: string;
	locations: SeniorInterface[]
}

export type MarkerProps = {
	info: SeniorInterface;
	position: Coordinates
}

const CustomMap: React.FC<Props> = ({ destinationName, locations }) => {
	const [center, setCenter] = useState<Coordinates>({ lat: 1.287953, lng: 103.93609 })
	const [currentLocation, setCurrentLocation] = useState<Coordinates>({ lat: 1.287953, lng: 103.93609 })
	const [currentZoom, setCurrentZoom] = useState<number>(13)

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

	  useEffect(() => {
		console.log('aa center', center)
	  }, [center]);

	const CustomMarker: React.FC<MarkerProps> = ({info, position}) => {
		const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false)

		const handleMarkerClick = (position: Coordinates) => {
			setCenter(position)
			setCurrentZoom(15)
			console.log('marker position', position)
			setShowInfoWindow(true)
		}

		return (
			<AdvancedMarker
				position={position}
				onClick={() => handleMarkerClick(position)}
			>
				<div 
					className={'marker'}
					onMouseEnter={() => setShowInfoWindow(true)}
					onMouseLeave={() => setShowInfoWindow(false)}
				>
					{showInfoWindow ? 
						<SeniorCard senior={info} /> : 
						<div className={'seniorMarker'} >
							{info.name}
						</div>
					}	
				</div>
			</AdvancedMarker>
		);
	}

	// const getMarkerIcon = () => {
	// 	if (typeof google !== 'undefined') {
	// 	  return {
	// 		path: google.maps.SymbolPath.CIRCLE,
	// 		fillColor: '#FF0000',
	// 		fillOpacity: 1,
	// 		scale: 10,
	// 		strokeColor: '#000000',
	// 		strokeWeight: 2,
	// 	  };
	// 	}
	// 	return {};
	//   };

	// const blueDot = {
	// 	path: google.maps.SymbolPath.CIRCLE,
	// 	fillColor: '#4285F4',
	// 	fillOpacity: 1,
	// 	scale: 8,
	// 	strokeColor: 'rgb(255,255,255)',
	// 	strokeWeight: 2,
	// };

	const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
		console.log('camera changed: ', ev.detail);
	  }, []);


	return (
		<APIProvider 
			apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
			onLoad={() => console.log('maps api has loaded')}>
				<Map
					onCameraChanged={handleCameraChange}
					mapId={'hi'}
					defaultZoom={13}
					defaultCenter={center}
					// zoom={currentZoom}
					center={center}
					// styles={mapStyles}
					>
						{locations?.map(marker => (
							<CustomMarker
								key={marker.id}
								info={marker}
								position={{lat: marker.lat, lng: marker.lon}}
							/>
						))}

						<Marker
							// icon={getMarkerIcon()}
							position={currentLocation}
						>
						</Marker>
				</Map>
		</APIProvider>
	)
}

export default CustomMap


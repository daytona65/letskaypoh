import React, { useEffect, useRef, useState } from 'react'
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import { SeniorInterface } from '../../models/interfaces';

export const options = {
	disableDefaultUI: true,
	zoomControl: true,
	styles: mapStyles
}

interface centerInterface {
	lat: number,
	lng: number
}

type Props = {
	destinationName: string;
	locations: SeniorInterface[]
	mapWidth?: string;
}

export type MarkerProps = {
	info: string;
	lat: number;
	lng: number;
}


const CustomMarker: React.FC<MarkerProps> = ({ info, lat, lng }) => {
	const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false)

	return (
		<Marker
			position={{ lat, lng }}
			onMouseOver={() => setShowInfoWindow(true)}
			onMouseOut={() => setShowInfoWindow(false)}>
			{showInfoWindow && (
				<InfoWindow>
					<h4>{info}</h4>
				</InfoWindow>
			)}
		</Marker>
	);
}


const Map: React.FC<Props> = ({ destinationName, locations, mapWidth }) => {
	const [center, setCenter] = useState<centerInterface>({ lat: 1.37625, lng: 103.93609 })
	const API_KEY = 'AIzaSyCyw8hO-FFyULEhmMSFEw9t28MGv8PxLho'
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyCyw8hO-FFyULEhmMSFEw9t28MGv8PxLho'
	})

	useEffect(() => {
		fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${destinationName}&key=${API_KEY}`)
			.then((response) => {
				return response.json();
			}).then(jsonData => {
				console.log('aaa', jsonData.results[0]);
				setCenter(jsonData.results[0].geometry.location)
			})
			.catch(error => {
				console.log(error);
			})
	}, [destinationName])

	const mapRef = useRef<google.maps.Map | null>(null)
	const onLoad = (map: google.maps.Map): void => {
		mapRef.current = map;
	}

	const onUnmount = (): void => {
		mapRef.current = null;
	}

	if (!isLoaded) return <div> Map Loading... </div>

	return (
		<GoogleMap
			mapContainerStyle={{
				width: mapWidth ? mapWidth : '100%',
				height: '100%',
				borderRadius: '30px 30px 0 0',
			}}
			center={center}
			zoom={13}
			onLoad={onLoad}
			onUnmount={onUnmount}
			options={options as google.maps.MapOptions}
		>
			{locations?.map(marker => (
				<CustomMarker
					info={marker.name}
					lat={Number(marker.lat)}
					lng={Number(marker.lon)}
				/>
			))}
		</GoogleMap>
	)
}

export default Map


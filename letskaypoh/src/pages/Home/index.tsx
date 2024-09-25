import { useEffect, useState } from 'react'
import './styles.css'
import '../commonStyles.css'
import '../../App.css'
import { APIProvider } from '@vis.gl/react-google-maps'  
import MapHandler from './components/map-handler'
import { PlaceAutocompleteClassic } from './components/classicAutocomplete'
import CustomMap, { Coordinates } from './components/Map/Map'
import { SeniorInterface } from '../../models/interfaces'
import { getAllSeniorsData } from '../../api'
import { useNavigate } from 'react-router-dom'
import { navigateToRoute } from '../../components/utils'

const Home = () => {
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    if (!token) {
        navigateToRoute('/', navigate)
    }
    const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

    const [seniors, setSeniors] = useState<SeniorInterface[]>([])
	const [currentLocation, setCurrentLocation] = useState<Coordinates>({lat: 1.287953, lng: 103.851784 })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seniorsData = await getAllSeniorsData();
                setSeniors(seniorsData);
                console.log(seniorsData)
            } catch (error) {
                console.error("Error fetching senior data:", error);
            }
        };

        fetchData();
    }, [])

    useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}

				setCurrentLocation(pos);
				localStorage.setItem('lat', String(position.coords.latitude))
				localStorage.setItem('lon', String(position.coords.longitude))

			});
		} else {
			console.log("Geolocation is not available in your browser.");
		}
	}, []);

    return (
        <div className={'container-home'}>
                <div className={'header-container'}>
                    <div className={'header'} style={{width: '100%', marginBottom: '0.5rem'}}>
                        <h1>let's kaypoh!</h1>
                        <p>Show some love to our seniors nearby!</p>
                    </div>
                </div>
            <APIProvider 
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                onLoad={() => console.log('maps api has loaded')}>
                <div className={'explore'}>
                    <PlaceAutocompleteClassic onPlaceSelect={setSelectedPlace} />
                </div>

                <CustomMap
                    locations={seniors}
                    defaultCenter={currentLocation}
                    currentLocation={currentLocation}
                />
                <MapHandler place={selectedPlace} />
            </APIProvider>

        </div>
    )
}

export default Home
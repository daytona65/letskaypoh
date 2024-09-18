import { useState } from 'react'
import './styles.css'
import '../commonStyles.css'
import '../../App.css'
import { APIProvider } from '@vis.gl/react-google-maps'  
import MapHandler from './components/map-handler'
import { PlaceAutocompleteClassic } from './components/classicAutocomplete'
import CustomMap from './components/Map/Map'
import { data } from '../../models/dummyData'

const Home = () => {
    const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

    return (
        <div className={'container-home'}>
            <div className={'explore'}>
                <div className={'header-container'}>
                    <div className={'header'} style={{width: '100%', marginBottom: '0.5rem'}}>
                        <h1>let's kaypoh!</h1>
                        <p>Show some love to our seniors nearby!</p>
                    </div>
                </div>
            </div>
            <APIProvider 
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                onLoad={() => console.log('maps api has loaded')}>
                <div className={'explore'}>
                    <PlaceAutocompleteClassic onPlaceSelect={setSelectedPlace} />
                </div>

                <CustomMap
                    locations={data}
                />
                {/* <Map
                    defaultZoom={3}
                    defaultCenter={{lat: 22.54992, lng: 0}}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                /> */}


                <MapHandler place={selectedPlace} />
            </APIProvider>

        </div>
    )
}

export default Home
import React, { useState } from 'react'
import './styles.css'
import '../commonStyles.css'
import '../../App.css'
import { StyledInputSearch } from '../../components/Styles'
import { SearchOutlined } from '@ant-design/icons'
import Map, { SeniorInterface } from '../../components/Map/Map'

const Home = () => {
    const [destination, setDestination] = useState<string>("");

    const data: SeniorInterface[] = [
        {
            Name: 'Mr Lim',
            Gender: 'M',
            Languages: ['Hokkien', 'Mandarin'],
            LastVisitedDate: '10 September 2024',
            PostalCode: '510773',
            ImageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPbk2FP1r3FWXTKbEtB6H6jAjJN9ZZuUhts9BqL=w524-h208-p-k-no',
            Lat: 1.37625,
            Lon: 103.93609
        }
    ]

    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1>let's kaypoh!</h1>
                <p>Show some love to our elderly seniors nearby!</p>
            </div>

            <StyledInputSearch
                col={'black'}
                suffix={<SearchOutlined />}
                placeholder="Search Destinations"
                value={destination === "" ? undefined : destination}
                onChange={(e: { target: { value: string } }) =>
                    setDestination(e.target.value)
                }
                allowClear
            />

            <Map
                destinationName={destination}
                locations={data}
            />

        </div>
    )
}

export default Home
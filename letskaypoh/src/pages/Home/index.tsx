import React, { useState } from 'react'
import './styles.css'
import '../commonStyles.css'
import '../../App.css'
import { StyledInputSearch } from '../../components/Styles'
import { SearchOutlined } from '@ant-design/icons'
import Map from '../../components/Map/Map'
import { data } from '../../models/dummyData'

const Home = () => {
    const [destination, setDestination] = useState<string>("");

    const handleSearch = () => {
        console.log(destination)
    }

    return (
        <div className={'container'}>
            <div className={'explore'}>
                <div className={'header-container'}>
                    <div className={'header'}>
                        <div>Explore</div>
                        <h1>let's kaypoh!</h1>
                        <p>Show some love to our seniors nearby!</p>
                    </div>
                    
                    <StyledInputSearch
                        col={'black'}
                        suffix={<SearchOutlined onClick={handleSearch}/>}
                        placeholder="Search area"
                        value={destination === "" ? undefined : destination}
                        onChange={(e) =>
                            setDestination(e.target.value)
                        }
                        allowClear
                    />
                </div>
            </div>

            <Map
                destinationName={destination}
                locations={data}
            />

        </div>
    )
}

export default Home
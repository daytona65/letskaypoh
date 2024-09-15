import React, { useState } from 'react'
import './styles.css'
import '../commonStyles.css'
import '../../App.css'
import { StyledInputSearch } from '../../components/Styles'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import Map from '../../components/Map/Map'
import { data } from '../../models/dummyData'
import { Button } from 'antd'

const Home = () => {
    const [destination, setDestination] = useState<string>("");

    const handleSearch = () => {
        console.log(destination)
    }

    return (
        <div className={'container'}>
            <div className={'explore'}>
                <div className={'header-container'}>
                    <div className={'header'} style={{width: '100%', marginBottom: '0.5rem'}}>
                        <h1>let's kaypoh!</h1>
                        <p>Show some love to our seniors nearby!</p>
                    </div>
                    
                    <div className={'row'} style={{margin: '0.5rem 0'}}>
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
                        <Button className={'filterBtn'}>
                            <FilterOutlined />
                        </Button>
                    </div>
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
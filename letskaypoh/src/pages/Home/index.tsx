import React, { useState } from 'react'
import './styles.css'
import { StyledInputSearch } from '../../components/Styles'
import { SearchOutlined } from '@ant-design/icons'

const Home = () => {
    const [destination, setDestination] = useState<string>("");

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

        </div>
    )
}

export default Home
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import InputMask from "react-input-mask"

import Container from './styles' 
import { sortAndGroup } from "./utils"

export default function() {
    const [date, setDate] = useState(moment().format('DD/MM/YYYY'))
    const [list, setList] = useState([])

    const handleFetchSchedule = async (date) => {
        try{const res = await axios({
            url: `http://api.tvmaze.com/schedule?country=US&date=${moment(date).format('YYYY-MM-DD')}`,
            method: 'GET',
        })

        if (res.status === 200) {
            const newList = res.data.map(item => {
                return {
                    network: {
                        id: item.show.webChannel
                        ? item.show.webChannel.id
                        : item.show.network.id,
                        name: item.show.webChannel
                        ? item.show.webChannel.name
                        : item.show.network.name,
                    },
                    show: {
                        id: item.show.id,
                        name: item.show.name,
                        time: item.show.schedule.time,
                        episode: {
                            id: item.id,
                            name: item.name,
                            number: item.number,
                            season: item.season
                        }
                    }
                }
            })
            
        return    setList(sortAndGroup(newList))
        } 
            setList([])
        } catch (e) {
            alert(e.response.data.message)
        }
        
    }
    
    useEffect(() => {
        if (date.length === 10) {
            handleFetchSchedule(date)
        }
         }, [date])

    return(
        <Container>
            <h1>Tv Shows</h1>

            <div className="date">
                <InputMask
                    mask="99/99/9999"
                    alwaysShowMask={true}
                    maskChar= ""
                    className="date__input"
                    type="text"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />
            </div>

            {list.length > 0 ? (
                <ul className="schedule">
                    {list.map(item => (
                        <li className="schedule__network" key={item.id}>
                            <h3>{item.network}</h3>
                            <ul className="schedule__shows">

                            {item.shows.map(show => (
                                <li className="schedule__show" key={show.episode.id} >
                                 {show.time} -  {show.name} : {show.episode.name}
                                </li>
                                
                                ))}
                        </ul>
                        </li>
                    )
                    )
                    }
                </ul>
            ) : (
                <div className="empty_schedule">
                    Nenhuma programação encontrada para este dia
                </div>
                )}
                            
        

        </Container>
    )
}

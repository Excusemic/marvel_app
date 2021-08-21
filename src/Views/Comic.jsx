import React from 'react'
import { useParams } from "react-router-dom"
import useFetch from '../Hooks/useFetch'
import CircularProgress from "@material-ui/core/CircularProgress"
import SingleComic from '../Components/Comic/SingleComic'


const Comic = () => {
    const { id } = useParams()
    const {data, loading, error} = useFetch(null, null, null, id)
    if (loading) return <div style={{width: "100%", height: "700px", display: "flex", alignItems: "center", justifyContent: 'center'}}><CircularProgress /></div>
    if (error) return <h3>something went wrong</h3>
    return (
        <SingleComic {...data?.data?.data?.results?.[0]}/>
    )
}

export default Comic

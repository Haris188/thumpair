import React, { useState, useEffect } from 'react'
import View from './View'
import { useLocation, useNavigate } from 'react-router-dom'
import { shuffle } from 'lodash'
import testThumb from '../../assets/default_thumb.jpg'
import Utils from '../../lib/util'

const Container = (props) => {

    // state
    const [fetchedVideosList, setfetchedVideosList]
        = useState(null)

    const [thumbUrl, setThumbUrl]
        = useState(null)

    const [videosList, setVideosList]
        = useState({ loading: true })

    const [thumbChannelTitleField, setThumbChannelTitleField]
        = useState('My channel')

    const [thumbTitleField, setThumbTitleField]
        = useState('My video title')

    const [searchQuery, setSearchQuery]
        = useState("")

    const [prominateThumbnail, setProminateThumbnail] = useState(false)

    // variables
    const location = useLocation()
    const navigate = useNavigate()
    const thumb = location.state
        ? location.state.thumb
        : null

    const maxResults = "11"
    const apiKey = process.env.REACT_APP_YT_API
    const getUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${searchQuery}&key=${apiKey}&regionCode=US&relevanceLanguage=en`
    //  const getUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=US&key=${apiKey}`


    useEffect(()=>{
        Utils.ReactGA.pageview(window.location.pathname + window.location.search)
    },[])

    // lifecycle functions
    useEffect(() => {
        if (!thumb || !location.state) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        if (!fetchedVideosList) {
            fetchInitialVideos()
        }
    }, [])

    useEffect(() => {
        if (thumb) {
            if (thumb === "demo") {
                setThumbUrl(testThumb)
            }
            else {
                const url
                    = URL.createObjectURL(thumb)

                setThumbUrl(url)
            }
        }
    }, [thumb])

    useEffect(() => {
        addThumbToFetchedAndRandomize()
    }, [thumbUrl, fetchedVideosList])

    useEffect(() => {
        if (prominateThumbnail) {
            setTimeout(() => {
                const newList = videosList.map((video) => {
                    if (video.victim) {
                        return {
                            ...video,
                            prominate: false
                        }
                    }
                    return video
                })

                setProminateThumbnail(false)
                setVideosList(newList)
            }, 5000)
        }
    }, [prominateThumbnail])

    useEffect(()=>{
        const key = process.env[`REACT_APP_ANALYTICS_${process.env.REACT_APP_ENV}`]
        fetch(`https://api.countapi.xyz/hit/${key}/visits`)
    },[])

    // container functions
    const fetchInitialVideos = async () => {
        const fetchRes = await fetch(getUrl)
        const jsonRes = await fetchRes.json()

        if (jsonRes.items) {
            setfetchedVideosList(jsonRes.items)
        }
    }

    const addThumbToFetchedVideos = () => {
        if (fetchedVideosList && fetchedVideosList.length > 0) {
            const refactoredFetchedVideos
                = fetchedVideosList.map(({ snippet }) => ({
                    title: snippet.title,
                    channelTitle: snippet.channelTitle,
                    thumb: snippet.thumbnails.high.url
                }))

            refactoredFetchedVideos.push({
                title: thumbTitleField,
                channelTitle: thumbChannelTitleField,
                thumb: thumbUrl,
                victim: true
            })
            return refactoredFetchedVideos
        }
    }

    const addThumbToFetchedAndRandomize = () => {
        if (thumb && fetchedVideosList) {
            const allVideosList
                = addThumbToFetchedVideos()

            const shuffledList = shuffle(allVideosList)
            setVideosList(shuffledList)
        }
    }

    const changeThumbTitleField = ({ target }) => {
        const newList = videosList.map((video) => {
            if (video.victim) {
                return {
                    ...video,
                    title: target.value
                }
            }
            return video
        })

        setThumbTitleField(target.value)
        setVideosList(newList)
    }

    const changeThumbChannelTitleField = ({ target }) => {
        const newList = videosList.map((video) => {
            if (video.victim) {
                return {
                    ...video,
                    channelTitle: target.value
                }
            }
            return video
        })

        setThumbChannelTitleField(target.value)
        setVideosList(newList)
    }

    const changeSearchQuery = (e) => {
        const searchTerm = e.target.value
        const withSpacesReplaced
            = searchTerm.replace(/ /g, '%20')

        setSearchQuery(withSpacesReplaced)
    }

    const submitYtQuery = async (e) => {
        e.preventDefault()
        await fetchInitialVideos()
    }

    const shuffleVideos = () => {
        const shuffledList
            = shuffle(videosList)

        setVideosList(shuffledList)
    }

    const findThumbnail = () => {
        let id = 0
        const newList = videosList.map((video, index) => {
            if (video.victim) {
                id = index

                return {
                    ...video,
                    prominate: true
                }
            }
            return video
        })

        setProminateThumbnail(true)
        setVideosList(newList)

        document.getElementById(`video-${id}`).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
    }

    console.log(videosList)

    return (
        <View
            container={{
                videosList,
                fetchedVideosList,
                thumbTitleField,
                thumbChannelTitleField,
                changeThumbChannelTitleField,
                changeThumbTitleField,
                changeSearchQuery,
                submitYtQuery,
                shuffleVideos,
                findThumbnail,
                prominateThumbnail
            }}
        />
    )
}

export default Container
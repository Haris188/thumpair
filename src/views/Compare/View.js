import React from 'react'
import VideoThumb from './VideoThumb'
import {
    Container,
    TextField,
    Button,
    IconButton
} from '@material-ui/core'
import {
    Search,
    Shuffle
} from '@material-ui/icons'
import styled from 'styled-components'

const GridVideoDisplay = styled.div`
    display:flex;
    flex-flow: row wrap;
    justify-content:center;
    align-items: baseline;
`

const VideosDisplay = (props)=>{
    const {children} = props
    return (
        <GridVideoDisplay>
            {children}
        </GridVideoDisplay>
    )
}

const View = (props)=>{
    const {
        container
    } = props

    const {videosList} = container

    return (
        <Container>
            <div>
                <TextField 
                    style = {{marginRight:'1em', marginTop:'1em'}}
                    title="Video Title"
                    variant="filled"
                    helperText="Enter the title of your video"
                    value = {container.thumbTitleField}
                    onChange = {(e)=>{
                        container.changeThumbTitleField(e)
                    }}
                />
                <TextField 
                    style = {{marginTop:'1em'}}
                    title="Channel Name"
                    variant="filled"
                    helperText="Enter the Name of your channel"
                    value = {container.thumbChannelTitleField}
                    onChange = {(e)=>{
                        container.changeThumbChannelTitleField(e)
                    }}
                />
            </div>
            <form onSubmit = {(e)=>{container.submitYtQuery(e)}} style = {{
                marginTop:'1em',
                display: 'flex',
                alignItems: 'flex-start'
                }}>
                <TextField 
                    style= {{marginRight:'0.5em'}}
                    title="Youtube Search Keyword"
                    variant="filled"
                    helperText="Type the niche video keywords you are looking for"
                    placeholder="e.g Space"
                    value = {container.searchQuery}
                    onChange = {(e)=>{
                        container.changeSearchQuery(e)
                    }}
                />
                <IconButton
                    type="submit"
                    variant="contained"
                    color="secondary"
                >
                    <Search />
                </IconButton>
            </form>
            <Button 
                style = {{
                    marginTop:'1em',
                    position: 'sticky',
                    top:70,
                    zIndex:1
                }}
                variant="contained"
                color="secondary"
                onClick = {container.shuffleVideos}
                startIcon = {<Shuffle />}
            >
                Shuffle videos
            </Button>
            {videosList.loading 
            ? <p>Loading...</p>
            : <VideosDisplay>
                {
                videosList.map((video,index)=>(
                <VideoThumb 
                    key={index}
                    video = {video}
                />))
                }
              </VideosDisplay>
            }
        </Container>
    )
}

export default View
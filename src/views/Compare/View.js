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
const FieldsFlex = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom:1em;  

    @media only screen and (max-width: 900px){
        flex-direction: column;
    }
`

const VideosDisplay = (props) => {
    const { children } = props
    return (
        <GridVideoDisplay>
            {children}
        </GridVideoDisplay>
    )
}

const View = (props) => {
    const {
        container
    } = props

    const { videosList } = container

    return (
        <Container>

            <FieldsFlex>
                <form onSubmit={(e) => { container.submitYtQuery(e) }} style={{
                    display: 'flex',
                    alignItems: 'flex-start'
                }}>
                    <TextField
                        style={{ marginRight: '0.5em' }}
                        title="Youtube Search Keyword"
                        variant="filled"
                        helperText="Type the niche video keywords you are looking for"
                        placeholder="e.g Mr.Beast"
                        value={container.searchQuery}
                        onChange={(e) => {
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
                <div>
                    <TextField
                        style={{ marginRight: '1em' }}
                        title="Video Title"
                        variant="filled"
                        helperText="Enter the title of your video"
                        value={container.thumbTitleField}
                        onChange={(e) => {
                            container.changeThumbTitleField(e)
                        }}
                    />
                    <TextField
                        title="Channel Name"
                        variant="filled"
                        helperText="Enter the Name of your channel"
                        value={container.thumbChannelTitleField}
                        onChange={(e) => {
                            container.changeThumbChannelTitleField(e)
                        }}
                    />
                </div>


            </FieldsFlex>

            <Button
                variant="contained"
                color="secondary"
                onClick={container.shuffleVideos}
                startIcon={<Shuffle />}
                style={{marginRight: '1em'}}
            >
                Shuffle videos
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={container.findThumbnail}
                startIcon={<Shuffle />}
            >
                Find my Thumbnail
            </Button>

            <div style={{ marginTop: '4em' }}>
                {videosList.loading
                    ? <p>Loading...</p>
                    : <VideosDisplay>
                        {
                            videosList.map((video, index) => (
                                <VideoThumb
                                    key={index}
                                    id={`video-${index}`}
                                    video={video}
                                />))
                        }
                    </VideosDisplay>
                }
            </div>
        </Container>
    )
}

export default View
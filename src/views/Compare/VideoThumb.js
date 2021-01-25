import React from 'react'
import styled from 'styled-components'
import {
    Typography
} from '@material-ui/core'

const ThumbContainer = styled.div`
    padding: 1em;
    width:100%;
    max-width: 350px;
`
const Image = styled.img`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit:cover;
`
const Flex = styled.div`
    display:flex;
    margin-top: 0.5em;
`
const ChannelIcon = styled.div`
    background: #DB3069;
    height: 35px;
    width:35px;
    border-radius: 50%;
    flex:0 0 35px;
    margin-right:0.5em;
`
const AspectRatioBox = styled.div`
    position:relative;
    overflow:hiden;
    width:100%;
    &:after{
        display: block;
        content: '';
        padding-bottom: 56.25%;
    }
`

const VideoThumb = (props)=>{
    const {video} =  props
    return (
        <ThumbContainer>
            <AspectRatioBox>
                <Image src = {video.thumb} />
            </AspectRatioBox>
            <Flex>
                <ChannelIcon />
                <div>
                    <Typography 
                        variant="body2"
                        style = {{fontWeight:'bold'}}
                    >
                        {video.title}
                    </Typography>
                    <Typography variant="body2">
                        {video.channelTitle}
                    </Typography>
                </div>
            </Flex>
        </ThumbContainer>
    )
}

export default VideoThumb
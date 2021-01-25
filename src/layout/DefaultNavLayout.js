import React from 'react'
import {
    AppBar, 
    Button, 
    Toolbar,
    Typography,
    Link
} from '@material-ui/core'
import {Outlet, useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const MarginedContainer = styled.div`
    margin-top: 4em;
    height:100%;
`

const DefaultNavLayout = ()=>{
    const navigate = useNavigate()
    return (
        <div>
            <AppBar
                style={{
                    background:'#fff'
                }}
            >
                <Toolbar>
                    <Typography onClick={()=>{navigate('/')}} variant='h6' style={{color:'black', ':hover':{cursor:'pointer'}}}>
                        Thumpair
                    </Typography>
                    <Button
                        style={{
                            marginLeft: '1em'
                        }}
                        onClick= {()=>{navigate('/contact')}}
                    >
                        Contact
                    </Button>
                </Toolbar>
            </AppBar>
            <MarginedContainer>
                <Outlet />
            </MarginedContainer>
        </div>
    )
}

export default DefaultNavLayout
import React from 'react'
import {
    Typography,
    Container,
    Link
} from '@material-ui/core'
import styled from 'styled-components'

const ContactDiv = styled.div`
    background: #EBEBD3;
    margin: 5em auto;
    padding: 1em;
    border-radius: 20px;
`

const View = ()=>{
    return (
        <Container>
            <ContactDiv>
                <Typography
                    variant="h3"
                    color="secondary"
                >
                    Contact
                </Typography>
                <Typography>
                    Hi there,<br />
                    Please feel free to contact me. I will be very glad to answer your queries and questions. If you want to do a feedback or complain, you can also contact me using the provided email address in the following. <br />
                </Typography>
                <Typography
                    variant = "body1"
                >
                    <br/>Email: <Link href="mailto:harisahmad.188@gmail.com">harisahmad.188@gmail.com</Link>
                </Typography>
            </ContactDiv>
        </Container>
    )
}

export default View
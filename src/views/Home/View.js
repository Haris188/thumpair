import React from 'react'
import {AddPhotoAlternate} from '@material-ui/icons'
import styled from 'styled-components'
import { 
    Typography, 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle ,
    TextField
} from '@material-ui/core'
import {Container} from '@material-ui/core'
import {ReactComponent as ThumbsIllustration} from '../../assets/thumbs.svg'


const ButtonDiv = styled.div`
    background: #f5f5f5;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    color: grey;
    transition: color 0.3s ease-in, box-shadow 0.3s, background 0.3s;
    margin-top:5em;
    padding:3em;
    border-radius: 5px;

    &:hover{
        background: #EBEBD3;
        box-shadow: 0px 3px 60px rgba(0,0,0,0.1);
        color:#DB3069;
        cursor:pointer;
    }
`
const PromoDiv = styled.div`
margin-top: 1em;
display: grid;
grid-template-columns: 1fr 1fr;
justify-content: space-between;
align-items: center;
`
const PromoText = styled.div`
    max-width: 25em;
`
const Input = styled.input`
    display:none;
`

const inputRef = React.createRef()

const View = (props)=>{
    const {container} = props

    return (
        <Container>
            <Input 
                ref={inputRef}
                type = 'file'
                onChange = {container.handlePick}
            />
            <ButtonDiv onClick = {()=>{container.handleUploadClick(inputRef)}}>
                <AddPhotoAlternate 
                    style={{fontSize:'15em'}}
                />
                <Typography variant="h4">
                    Add new Thumbnail
                </Typography>
                <Typography>
                    Click to upload a thumbnail and Test its Visibility
                </Typography>
                {container.thumb
                &&
                <Typography variant="h5" color="secondary">
                    {container.thumb.name} is selected. Click "Compare"
                </Typography>}
            </ButtonDiv>
            {container.thumb
            &&
            <Button
                fullWidth
                variant='contained'
                color="primary"
                style={{marginTop:"1em"}}
                onClick={container.handleCompareClick}
            >
                Compare
            </Button>}
            <PromoDiv>
                <PromoText>
                    <Typography 
                        variant="h4"
                        color="secondary"
                    >
                        View and compare Thumbnail
                    </Typography>
                    <Typography>
                        YouTube is a competetive platform. To get views, your thumbnail has to stand out as compared to the others. This tool helps you view and compare your thumbnail with actual YouTube thumbnails, instantly
                    </Typography>
                </PromoText>
                <div>
                    <ThumbsIllustration 
                        style={{
                            width: '100%'
                        }}
                    />
                </div>
            </PromoDiv>
            <Dialog open={container.dialogOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Keep Upto Date</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To inform about further updates and improvements we will need some way to contact you!
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={container.emailField}
                    error={container.emailError}
                    onChange = {container.handleEmailFieldChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={container.handleDialogCancel}  color="primary">
                    Cancel
                </Button>
                <Button onClick={container.handleDialogContinue}  color="secondary" variant="contained">
                    Continue
                </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default View
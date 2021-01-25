import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import View from './View'
import {addCompareClick} from '../../spreadsheet/analytics'

const Home = ()=>{
    const navigate = useNavigate()
    const [thumb, setThumb] = useState(null)

    const [emailField, setEmailField]
    =useState('')

    const [emailError, setEmailError]
    =useState(false)

    const [dialogOpen, setDialogOpen]
    = useState(false)

    const handleUploadClick = (inputRef)=>{
        inputRef.current.click()
    }

    const handlePick = ({target})=>{
        setThumb(target.files[0])
    }

    const navigateToCompare = ()=>{
        navigate('/compare', {state: {thumb}})
    }

    const handleDialogClose = ()=>{

    }

    const handleEmailFieldChange = ({target})=>{
        setEmailField(target.value)
    }

    const handleDialogCancel = ()=>{
        setDialogOpen(false)
        navigateToCompare()
    }
    
    const sendEmailToStore = ()=>{
        console.log('sent email')
    }

    const validateEmail = ()=>{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailField).toLowerCase());
    }

    const handleDialogContinue = ()=>{
        const emailExists
        = validateEmail()

        if(emailExists){
            setDialogOpen(false)
            navigateToCompare()
            sendEmailToStore()
        }
        else{
            setEmailError(true)
        }
    }

    const updateAnalytics = ()=>{
        addCompareClick()
    }

    const handleCompareClick = ()=>{
        // setDialogOpen(true)

        navigateToCompare()
        updateAnalytics()
    }

    return (
        <View 
            container={{
                handleUploadClick,
                handlePick,
                thumb,
                navigateToCompare,
                handleDialogClose,
                handleEmailFieldChange,
                handleDialogCancel,
                handleDialogContinue,
                handleCompareClick,
                dialogOpen,
                emailField,
                emailError
            }}
        />
    )
}

export default Home
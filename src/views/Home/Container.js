import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import View from './View'
import Utils from '../../lib/util'

const Home = ()=>{
    const navigate = useNavigate()
    const [thumb, setThumb] = useState(null)

    const [emailField, setEmailField]
    =useState('')

    const [emailError, setEmailError]
    =useState(false)

    const [dialogOpen, setDialogOpen]
    = useState(false)

    useEffect(()=>{
        Utils.ReactGA.pageview(window.location.pathname + window.location.search)
    },[])

    useEffect(()=>{
        const key = process.env[`REACT_APP_ANALYTICS_${process.env.REACT_APP_ENV}`]
        fetch(`https://api.counterapi.dev/v1/${key}/home/up`)
    },[])

    const handleUploadClick = (inputRef)=>{
        inputRef.current.click()
    }

    const handlePick = ({target})=>{
        
        setThumb(target.files[0])
        navigate('/compare', {state: {thumb:target.files[0]}})
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

    const handleCompareClick = ()=>{
        // setDialogOpen(true)
        navigateToCompare()
    }

    const handleDemoClick=()=>{
        navigate('/compare',{state: {thumb:'demo'}})
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
                handleDemoClick,
                dialogOpen,
                emailField,
                emailError
            }}
        />
    )
}

export default Home
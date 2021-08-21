import React, { useState, useEffect, useRef } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import animationData from '../Lottie/ironman.json';
import Lottie from 'lottie-react';
import { makeStyles } from "@material-ui/core/styles"



const useStyles = makeStyles((theme) => ({
    backdrop: {
      paddingTop: "10rem",
      zIndex: 20,
      background: theme.palette.secondary.main
    },
}));
const OverlayLoader = () => {
  const [isOpen, setIsOpen] = useState(true)
  const timeoutRef = useRef(null)
  const classes = useStyles()

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(() => {
        return false
      })
    }, 1300)
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])
  return (
    <Backdrop className={classes.backdrop} open={isOpen} transitionDuration={{
        exit: 2000,
    }} >
      <Lottie
        loop={true}
        animationData={animationData}
        className={classes.successIcon}
      />

    </Backdrop>

  )
}

export default OverlayLoader

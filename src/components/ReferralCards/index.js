import React, { useState } from 'react'
import { ArrowRightIcon, CalendarIcon, CopyIcon } from '../icons'
import { useStyles } from './styles'

export const ReferralCards = ({ title, imgSrc, imgAlt, link, newUser = false, styles = {} }) => {
  const [isLinkHover, setIsLinkHover] = useState(false)

  const classes = useStyles()

  const handleMouseEnter = () => {
    setIsLinkHover(true)
  }
  
  const handleMouseLeave = () => {
    setIsLinkHover(false)
  }

  return (
    <div style={styles} className={[classes.card, classes.flexColCenter].join(' ')}>
     {/* Es necesario refactorizar el newUser en un nuevo componente  */}
      {newUser ? (
        <div className={classes.flexBetween}>
          <div className={classes.flexCenter}>
            <div className={classes.notificationSquare} />
            <div className={classes.notificationSquare} />
          </div>

          <div className={classes.inlineFlex}>
            <span className={classes.notificationText}>NEW USER!</span>
            <span className={classes.notificationDate}>17.08.20</span>
            <CalendarIcon />
          </div>
        </div>
      ) : (
        <div style={{ height: '18px' }} />
      )}
      {/* el div con height 18px imita la altura del anterior componente, si se modifica dicha altura, también se debe modificar este valor */}

      <h3 className={classes.title}>{title}</h3>

      <img src={imgSrc} alt={imgAlt} className={classes.image} />

      <hr className={classes.divisor} />

      <button className={[classes.button, classes.inlineFlex].join(' ')} onClick={() => console.log('Copy link clicked')}>
        <span className={classes.buttonText}>{link}</span>
        <CopyIcon />
      </button>

      <a 
        href='#' 
        className={[classes.link, classes.inlineFlex].join(' ')} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={classes.linkText}>Open My Referral Genealogy</span>
        <ArrowRightIcon fill={isLinkHover ? '#fff' : '#E35C49'} />
      </a>
    </div>
  )
}
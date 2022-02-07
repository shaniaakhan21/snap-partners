import React, { useRef } from 'react'
import { CancelIcon, CopyIcon, EmailIcon, PhoneIcon } from '../icons'
import { useStyles } from './styles'

export const ReferralsUserDetailModal = ({ userId, userName, userEmail, userPhone, onClick }) => {
  const classes = useStyles()
  const buttonCancelRef = useRef()

  return (
    <div className={classes.container}>
      {/* <div className={[classes.buttonCancelContainer, classes.separation, classes.flexEnd].join(' ')}>
        <button 
          className={classes.buttonCancel}
          ref={buttonCancelRef}
          onClick={(e) => onClick(e, [buttonCancelRef.current])}
        >
          <CancelIcon width='24' height='24' />
        </button>
      </div> */}

      <div className={[classes.separation, classes.flexBetween].join(' ')}>
        <span className={classes.textTitleId}>USER ID</span>
        <button className={[classes.button, classes.inlineFlexText].join(' ')}>
          <span className={classes.textId}>{userId}</span>
          <CopyIcon />
        </button>
      </div>

      <hr className={[classes.divisor, classes.separation].join(' ')} />

      <span className={[classes.userName, classes.separation].join(' ')}>{userName.toUpperCase()}</span>

      <div className={[classes.separation, classes.userEmailAndPhoneContainer].join(' ')}>
        <div className={classes.inlineFlexText}>
          <EmailIcon />
          <span className={classes.email}>{userEmail}</span>
        </div>

        <div className={classes.inlineFlexText}>
          <PhoneIcon />
          <span className={classes.phone}>{userPhone}</span>
        </div>
      </div>

      <span className={classes.textSponsored}>Sponsored by <span className={classes.textSponsoredStrong}>Génesis Quintero</span></span>
    </div>
  )
}
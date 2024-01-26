import { SyntheticEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { IconButton, makeStyles } from '@material-ui/core'
import { IAuth, TSetAuth } from 'lib/stores/Auth'
import { updateUserProfileImage } from 'lib/services/user/updateUserProfileImage'
import AccountDefaultImage from 'components/common/AccountDefaultImage'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'inline-block',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 1px 17px -1px rgba(0, 0, 0, 0.2)!important'
  },
  img: {
    maxWidth: '100%',
    borderRadius: '50%',
    width: '140px',
    height: '140px',
    display: 'flex',
    border: '2px solid white'
  },
  editButton: {
    position: 'absolute',
    top: '85%',
    left: '81%',
    height: '10px',
    width: '10px',
    background: 'white',
    padding: '15px',
    color: '#E74426',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white!important',
    boxShadow: '0 1px 17px -1px rgba(0, 0, 0, 0.2)!important',
    '&:hover': {
      backgroundColor: '#f2f2f2'
    }
  }
})

interface IPhotoAccountProps {
  photoURL: string;
  auth: IAuth;
  setAuth: TSetAuth
}

export const PhotoAccount = ({ photoURL, auth, setAuth }: IPhotoAccountProps) => {
  const [img, setImg] = useState(photoURL)
  const classes = useStyles()

  useEffect(() => {
    setImg(img)
  }, [photoURL])

  const handleImageUpload = async (event: SyntheticEvent) => {
    const input = event.nativeEvent.target as HTMLInputElement
    const files = input.files
    if (files?.length > 0) {
      try {
        const file = files[0]
        await updateUserProfileImage(auth.accessToken, { image: file })
        const url = URL.createObjectURL(file)
        setImg(url)
        setAuth({ ...auth, profileImage: url })
        toast('Profile photo changed!', { type: 'success' })
      } catch (error) {
        toast('Profile photo could not be changed!', { type: 'error' })
      }
    }
  }
  return (
    <div className={classes.root}>
      {
        img
          ? <img src={img} className={classes.img} />
          : <AccountDefaultImage rank={auth?.ranks?.type}/>
      }

      <IconButton
        aria-label="Edit Profile Image"
        className={classes.editButton}
        onClick={() => document.getElementById('profileImageInput').click()}
      >
        <BorderColorIcon style={{ width: '20px', height: '20px' }}/>
      </IconButton>
      <input
        type="file"
        accept="image/*"
        id="profileImageInput"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </div>
  )
}

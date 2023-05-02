import { GenealogyIcon } from 'components/common/icons'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { IconButton, makeStyles } from '@material-ui/core'
const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#8E8E93',
    borderRadius: '50px'
  },
  img: {
    maxWidth: '100%',
    width: '20px',
    height: '20px',
    display: 'flex'
  },
  editButton: {
    position: 'absolute',
    top: '20%',
    left: '90%',
    height: '5px',
    width: '5px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#f2f2f2'
    }
  }
})

interface IPhotoAccountProps {
  photoURL: string
}

export const PhotoAccount = ({ photoURL }: IPhotoAccountProps) => {
  const classes = useStyles()
  const handleImageUpload = (event) => {
    // Upload image api
  }
  return (
    <div className={classes.root}>
      {
        photoURL
          ? <img src={photoURL} className={classes.img} />
          : <GenealogyIcon classes='w-20 h-20' />
      }

      <IconButton
        aria-label="Edit Profile Image"
        className={classes.editButton}
        onClick={() => document.getElementById('profileImageInput').click()}
      >
        <BorderColorIcon style={{ width: '15px', height: '15px' }}/>
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

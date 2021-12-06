import React, {useState} from 'react'
import {Grid, Button, InputAdornment, IconButton, CircularProgress, useTheme} from '@material-ui/core'
import {Visibility, VisibilityOff} from '@material-ui/icons'
import {useFormik} from 'formik'
import {useStyles} from '../loginStyles'
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert'
import ReCAPTCHA from "react-google-recaptcha";
import FormikMuiField from '../../../../components/FormikMuiField'
import MaterialUiPhoneNumber from "material-ui-phone-number";
import * as Yup from "yup";
import {authenticate} from "../../../../redux/actions";
import {useDispatch} from "react-redux";

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

const handleFormikSubmit = (onSubmitSuccess, onSubmitError) => async (values, actions) => {
    onSubmitSuccess(values, actions)
}

export const getFormikActivityConfig = (onSubmitSuccess, onSubmitError) =>{
    const validationSchema = Yup.object({
        phoneNumber: Yup
            .string("Phone Number is Required")
            .required("Phone Number is Required"),
        password: Yup
            .string("Password is required")
            .required("Password is required")
    })
    return ({
        initialValues: {
            phoneNumber: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: handleFormikSubmit(onSubmitSuccess, onSubmitError)
    })
}

const LoginForm = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const recaptchaRef = React.useRef(null)
    const [spinner, setSpinner] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errorPass, setErrorPass] = useState("")
    const handleClickShowPassword = () => setShowPassword(!showPassword)

    const handleSubmitSuccess = async (values) => {
        setSpinner(true)
        recaptchaRef.current.reset()
        const grecaptcha = await recaptchaRef.current.executeAsync();
        try {
            await axios.post('/api/auth/login', {...values, "g-recaptcha-response": grecaptcha})
            dispatch(authenticate({ isAuth: true }))
        } catch (e) {
            setErrorPass(e.response?.data?.message || 'Error Encountered Try Again Later')
        }
        setSpinner(false)
        return values
    }

    const handleSubmitError = (error) => {
        return error
    }

    const handleClose = () => {
        setErrorPass(false)
    }

    const formikConfig = getFormikActivityConfig(handleSubmitSuccess, handleSubmitError)
    const formik = useFormik(formikConfig)

    const classes = useStyles()

    return (
        <>
            <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={process.env.REACT_APP_RECAPTCHA_V2_PUBLIC}/>
            <form onSubmit={formik.handleSubmit}>

                <MaterialUiPhoneNumber
                    variant="outlined"
                    style={{ marginBottom: 10, width: '100%' }}
                    inputProps={{ style: { color: theme.palette.text.secondary } }}
                    defaultCountry={'us'}
                    onlyCountries={['us']}
                    disableAreaCodes
                    color="secondary"
                    id="phoneNumber"
                    name="phoneNumber"
                    label={"Phone Number"}
                    value={formik.values.phoneNumber}
                    onChange={e => formik.setFieldValue('phoneNumber', e)}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />

                <FormikMuiField
                    name="password"
                    label={"Password"}
                    formikObject={formik}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <Grid direction="row" justifyContent="center" alignItems="center" container>
                    <Button variant="contained" type="submit" disabled={spinner} className={classes.btnLoginStyle}>
                        Log in
                        {spinner && (
                            <CircularProgress color="primary" size={15} style={{marginLeft: 10}}/>
                        )}
                    </Button>

                </Grid>

                {errorPass.length>0 &&
                <Alert style={{marginTop: 15}} severity='error' onClose={handleClose} variant='filled'>
                    {errorPass}
                </Alert>}
            </form>
        </>
    )
}

export default LoginForm

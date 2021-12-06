import React, {useState} from 'react'
import {Grid, Button, InputAdornment, IconButton, CircularProgress,    useTheme, TextField} from '@material-ui/core'
import {Visibility, VisibilityOff} from '@material-ui/icons'
import {useFormik} from 'formik'
import {useStyles} from '../loginStyles'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert'
import ReCAPTCHA from "react-google-recaptcha";
import FormikMuiField from '../../../../components/FormikMuiField'
import MaterialUiPhoneNumber from "material-ui-phone-number";
import * as Yup from "yup";
import {authenticate} from "../../../../redux/actions";

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
            .required("Phone Number is Required")
    })
    return ({
        initialValues: {
            phoneNumber: ''
        },
        validationSchema: validationSchema,
        onSubmit: handleFormikSubmit(onSubmitSuccess, onSubmitError)
    })
}

export const getFormikActivityConfigPassword = (onSubmitSuccess, onSubmitError) =>{
    const validationSchema = Yup.object({
        phoneNumber: Yup
            .string("Phone Number is Required")
            .required("Phone Number is Required"),
        code: Yup
            .number("Code is Required")
            .required("Code is Required"),
        password: Yup
            .string('Enter your password')
            .min(6, "Minimum 6 characters")
            .required('Password is required'),
        passwordConfirmation: Yup
            .string('Enter the password again')
            .oneOf([Yup.ref('password')], 'Password must match')
            .required('Password confirmation required')
    })
    return ({
        initialValues: {
            phoneNumber: '',
            code: '',
            password: '',
            passwordConfirmation: ''
        },
        validationSchema: validationSchema,
        onSubmit: handleFormikSubmit(onSubmitSuccess, onSubmitError)
    })
}

const RegisterForm = () => {
    const theme = useTheme()
    const recaptchaRef = React.useRef(null)
    const [spinner, setSpinner] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConf, setShowPasswordConf] = useState(false)
    const [errorPass, setErrorPass] = useState("")
    const [passwordEnabled, setPasswordEnabled] = useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleClickShowPasswordConf = () => setShowPasswordConf(!showPasswordConf)
    const dispatch = useDispatch()

    const handleClose = () => {
        setErrorPass(false)
    }

    const handleSubmitSuccess = async (values) => {
        setSpinner(true)
        recaptchaRef.current.reset()
        const grecaptcha = await recaptchaRef.current.executeAsync();
        const {phoneNumber} = values // Get values
        try {
            const response = await axios.post('/api/auth/registerStep1', {phoneNumber, "g-recaptcha-response": grecaptcha})
            setPasswordEnabled(true)
            formikPassword.setFieldValue("phoneNumber", phoneNumber)
        } catch (e) {
            console.log(e)
            setErrorPass(e.response.data.message)
        }
        setSpinner(false)
        return values
    }

    const handleSubmitError = (error) => {
        return error
    }

    const formikConfig = getFormikActivityConfig(handleSubmitSuccess, handleSubmitError)
    const formik = useFormik(formikConfig)

    const handleSubmitSuccessPassword = async (values) => {
        setSpinner(true)
        recaptchaRef.current.reset()
        const grecaptcha = await recaptchaRef.current.executeAsync();
        const {phoneNumber, code, password} = values // Get values
        try {
            await axios.post('/api/auth/registerStep2', {phoneNumber, code, password, "g-recaptcha-response": grecaptcha})
            dispatch(authenticate({ isAuth: true }))
        } catch (e) {
            console.log(e)
            setErrorPass(e.response.data.message)
        }
        setSpinner(false)
        return values
    }

    const formikConfigPassword = getFormikActivityConfigPassword(handleSubmitSuccessPassword, handleSubmitError)
    const formikPassword = useFormik(formikConfigPassword)

    const classes = useStyles()

    return (
        <>
            <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={process.env.REACT_APP_RECAPTCHA_V2_PUBLIC}/>
            {passwordEnabled && (
                <form onSubmit={formikPassword.handleSubmit} style={{width:"100%", maxWidth: 510}}>

                    <MuiAlert elevation={3} severity={"info"} style={{marginBottom:20}}>
                        We will send you a SMS to your Phone and you will be able to set or update your password.
                    </MuiAlert>
                    <MaterialUiPhoneNumber
                        variant="outlined"
                        style={{ marginBottom: 10, width: '100%' }}
                        inputProps={{ style: { color: theme.palette.text.secondary } }}
                        defaultCountry={'us'}
                        disabled={true}
                        onlyCountries={['us']}
                        disableAreaCodes
                        color="secondary"
                        id="phoneNumber"
                        name="phoneNumber"
                        label={"Phone Number"}
                        value={formikPassword.values.phoneNumber}
                        onChange={e => formikPassword.setFieldValue('phoneNumber', e)}
                        error={formikPassword.touched.phoneNumber && Boolean(formikPassword.errors.phoneNumber)}
                        helperText={formikPassword.touched.phoneNumber && formikPassword.errors.phoneNumber}
                    />

                    <FormikMuiField
                        name="code"
                        label={"SMS Verification Code"}
                        formikObject={formikPassword}
                        type={'text'}
                    />

                    <FormikMuiField
                        name="password"
                        label={"Password"}
                        formikObject={formikPassword}
                        type={showPasswordConf ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPasswordConf}
                                    >
                                        {showPasswordConf ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />


                    <FormikMuiField
                        name="passwordConfirmation"
                        label={"Confirm Password"}
                        formikObject={formikPassword}
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
                            Set Password
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
            )}
            {!passwordEnabled && (
            <form onSubmit={formik.handleSubmit} style={{width:"100%", maxWidth: 510}}>

                <MuiAlert elevation={3} severity={"info"} style={{marginBottom:20}}>
                    We will send you a SMS to your Phone and you will be able to set or update your password.
                </MuiAlert>
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

                <Grid direction="row" justifyContent="center" alignItems="center" container>
                    <Button variant="contained" type="submit" disabled={spinner} className={classes.btnLoginStyle}>
                        Register
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
            )}
        </>
    )
}

export default RegisterForm

import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: 10
  },
  input: {
    color: theme.palette.text.secondary
  }
}))

const FormikMuiField = ({ children, name, label, formikObject, ...rest }) => {
  const classes = useStyles()
  const formik = formikObject

  const { variant = 'outlined', color = 'secondary', fullWidth = true } = rest

  return (
    <TextField
      {...rest}
      variant = {variant}
      color={color}
      className={ classes.textField }
      inputProps={{
        className: classes.input
      }}
      fullWidth={fullWidth}
      id={name}
      name={name}
      label={label}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    >
      {children}
    </TextField>
  )
}

FormikMuiField.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
  label: PropTypes.string,
  formikObject: PropTypes.any,
  rest: PropTypes.object
}

export default FormikMuiField

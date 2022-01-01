import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@material-ui/core'

const FormikCheckField = ({ name, label, formikObject, ...rest }) => {
  const formik = formikObject

  return (
        <Checkbox
            {...rest}
            name={name}
            id={name}
            checked={formik.values[name]}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
        />
  )
}

FormikCheckField.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
  label: PropTypes.string,
  formikObject: PropTypes.any
}

export default FormikCheckField

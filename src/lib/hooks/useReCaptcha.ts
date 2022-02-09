import { useRef, useState } from 'react'

export const useReCaptcha = () => {
  const [captchaValid, setCaptchaValid] = useState(null)
  const captcha = useRef(null)

  const onChange = () => {
    if (captcha.current.getValue()) {
      console.log('The user is not a robot')
      setCaptchaValid(true)
    }
  }

  return {
    captchaRef: captcha,
    isValid: captchaValid,
    onChangeCaptcha: onChange
  }
}

import { useState } from 'react'
import { toast } from 'react-toastify'

type CopiedValue = string | null
type CopyFn = (textToCopy: string, textAlias?: string) => Promise<boolean>

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = async (textToCopy, textAlias) => {
    // if (navigator.clipboard && window.isSecureContext) {
    //   try {
    //     await navigator.clipboard.writeText(textToCopy)
    //     setCopiedText(textToCopy)
    //     toast(`${textAlias} Copied` || 'Copied Value', { type: 'success' })
    //     return true
    //   } catch (err) {
    //     toast(`Copy failed ${err}`, { type: 'error' })
    //     setCopiedText(null)
    //     return false
    //   }
    // }

    // console.info('Clipboard not supported')

    // Making a textarea out of viewport
    const textArea = document.createElement('textarea')
    textArea.value = textToCopy
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const isSuccessful = document.execCommand('copy')

      if (isSuccessful) {
        toast(`${textAlias} Copied` || 'Copied Value', { type: 'success' })
        setCopiedText(textToCopy)
        return true
      }

      toast('Copy failed', { type: 'error' })
      setCopiedText(null)
      return false
    } catch (err) {
      toast(`Copy failed ${err}`, { type: 'error' })
      setCopiedText(null)
      return false
    }
  }

  return { copiedText, copy }
}

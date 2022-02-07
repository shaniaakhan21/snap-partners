import { useState } from 'react'
import { toast } from 'react-toastify'

type CopiedValue = string | null
type CopyFn = (textToCopy: string, textAlias?: string) => Promise<boolean>

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = async (textToCopy, textAlias) => {
    if (!navigator?.clipboard) {
      toast('Clipboard not supported', { type: 'warning' })
      return false
    }

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopiedText(textToCopy)
      toast(`${textAlias} Copied` || 'Copied Value', { type: 'success' })
      return true
    } catch (err) {
      toast(`Copy failed ${err}`, { type: 'error' })
      setCopiedText(null)
      return false
    }
  }

  return { copiedText, copy }
}

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

const TestPage = ({
  defaultLocale,
  locale,
  locales,
  params,
  preview,
  previewData
}) => {
  const router = useRouter()

  console.log('query', router.query)

  console.log('')

  console.log('SignUpPage getStaticProps ctx',
    defaultLocale,
    locale,
    locales,
    params,
    preview,
    previewData
  )

  return (
    <div>
      <ul>
        <li>defaultLocale: {defaultLocale}</li>
        <li>locale: {locale}</li>
        <li>locales: {locales}</li>
        <li>params: {params}</li>
        <li>preview: {preview}</li>
        <li>previewData: {previewData}</li>
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ defaultLocale, locale, locales, params, preview, previewData }) => {
  return {
    props: {
      defaultLocale: defaultLocale || null,
      locale: locale || null,
      locales: locales || null,
      params: params || null,
      preview: preview || null,
      previewData: previewData || null
    }
  }
}

export default TestPage

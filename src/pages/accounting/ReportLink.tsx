import ReportComponent from './ReportComponent'

interface ReportLinkProps {
  linkText: string;
  setActiveReportDate: (date: string | null) => void;
  activeReportDate: string | null;
}

const ReportLink = ({ linkText, setActiveReportDate, activeReportDate }: ReportLinkProps) => {
  if (linkText === activeReportDate) {
    return (
      <div className='block bg-white mb-10'>
        <ReportComponent title={linkText} />
        <br></br><br></br>
        <button className='flex flex-row uppercase text-textAcent-500 font-bold' onClick={() => {
          console.log('Closing report...')
          setActiveReportDate(null)
        }}>
          <svg className='mr-4' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 11H7.135L10.768 6.64003C11.122 6.21603 11.064 5.58503 10.64 5.23203C10.215 4.87803 9.585 4.93603 9.232 5.36003L4.232 11.36C4.193 11.407 4.173 11.462 4.144 11.514C4.12 11.556 4.091 11.592 4.073 11.638C4.028 11.753 4.001 11.874 4.001 11.996C4.001 11.997 4 11.999 4 12C4 12.001 4.001 12.003 4.001 12.004C4.001 12.126 4.028 12.247 4.073 12.362C4.091 12.408 4.12 12.444 4.144 12.486C4.173 12.538 4.193 12.593 4.232 12.64L9.232 18.64C9.43 18.877 9.714 19 10 19C10.226 19 10.453 18.924 10.64 18.768C11.064 18.415 11.122 17.784 10.768 17.36L7.135 13H19C19.552 13 20 12.552 20 12C20 11.448 19.552 11 19 11Z" fill="#DD4C37"/>
          </svg>
            go back</button>
      </div>
    )
  } else if (activeReportDate !== null) {
    return null
  }
  return <a className="text-textAcent-500 font-bold cursor-pointer" onClick={() => setActiveReportDate(linkText)}>{linkText}</a>
}
export default ReportLink

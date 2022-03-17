import { ReactNode } from 'react'
import DashboardLayout from 'layouts/private/Dashboard'
import Head from 'next/head'
import { APP_INFO } from 'config/appInfo'
import { Page } from 'lib/types'
const { SEO } = APP_INFO

const PrivacyPolicyPage: Page = () => {
  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Privacy Policy</title>
      </Head>

      <div className='w-full h-full max-w-4xl mx-auto py-10 text-left'>
        <h2 className='text-4xl font-bold'>Privacy Policy</h2>
        <br />

        <p>
          Snapdelivered.com has created this privacy policy to demonstrate our commitment to protecting personally identifiable information that you provide to us, as well as other information that we collect and/or receive in connection with your use of our website, www.snapdelivered.com or our mobile site, m.snapdelivered.com (such sites, collectively, the "Site"), and our mobile applications (the "Snapdelivered.com Apps").
        </p>
        <br />

        <h5 className='text-3xl font-bold'>Information we collect when you use the site and how we use it</h5>
        <br />

        <ul className='w-full'>
          <li>
            <h6 className='text-xl font-bold'>
              1. Personally identifiable information we collect
            </h6>
            <br />

            <p>
              Information you provide to us. Personally identifiable information you may provide to us in connection with your use of the Site (e.g., your name, address, phone number and email address).
            </p>
          </li>

          <br />

          <li>
            <h6 className='text-xl font-bold'>
              2. How we use and share the personally identifiable information we collect
            </h6>
            <br />

            <p>
              Personally identifiable information is used to (and shared with participating merchants and our third party services providers to) process and complete the orders placed with the participating merchants. This information is also used to (and shared with participating merchants and our third party services providers to) contact you for administrative, customer service, security monitoring, fraud detection or similar purposes. In addition, this information is used to (and shared with participating merchants and our third party services providers as needed to) communicate with you, to enhance your experience at and improve the Snapdelivered.com products and services and to improve the functionality and content of the Site and the Snapdelivered.com Apps including, without limitation, by showing the content that we think you might be interested in. In doing so, we may share this information with third party services providers so that they may provide analytics services and/or display ads that we think might be of interest to you on the Site and/or other websites. This information may also be used (and shared with applicable Office Account holders and our third party services providers as needed) in connection with Office Accounts, including for billing and reporting. Lastly, this information may be used as agreed to by you. Please note that, as of the latest update of this privacy policy, the Site does not currently take actions to respond to "Do Not Track" signals in browsers.
              Your personally identifiable information (including, name and e-mail address) may be used (and shared with our third party services providers as needed to) to provide newsletters, promotional materials, and updates related to the Site and/or the Snapdelivered.com Apps, our participating merchants, specials or features or services offered or made available on or using the Site and/or the Snapdelivered.com Apps. When logged in to our website, www.snapdelivered.com, you have the ability to edit your "SMS Notifications" preferences in your account to opt-out of receiving order updates via text messages. Alternatively, you may click the "unsubscribe" link contained in our email messages.
            </p>
          </li>

          <br />

          <li>
            <h6 className='text-xl font-bold'>
              3. Usage information we collect
            </h6>
            <br />

            <p>
              Usage information we collect. When you access or use the Site and the Snapdelivered.com Apps we may automatically receive and store usage information through cookies, clear gifs, log files, and other tracking technologies, and we may use third party analytics partners, such as Google Analytics, to assist with this collection. The type of information about how you use the Site and the Snapdelivered.com Apps (e.g., your mobile device ID, device type and operating system), information about your browser and usage patterns (e.g., your IP addresses, geolocation, cookie information and statistical information about your online experience, preferences, shopping cart content and the pages they request), and information about your device used to access the website (e.g., your mobile device ID, internet service provider, device type and operating system).
            </p>
          </li>

          <br />

          <li>
            <h6 className='text-xl font-bold'>
              4. How we use and share the usage information we collect
            </h6>
            <br />

            <p>
              Although non-personally identifiable, we may use such received and collected informationto monitor aggregate use metrics, analyze traffic patterns, track content you may be interested in, diagnose and fix technology problems and otherwise plan for and enhance the Site and the Snapdelivered.com Apps, and disclose it to and share it with our third parties services providers for the same purpose as set out in this paragraph.
            </p>
          </li>

          <br />

          <li>
            <h6 className='text-xl font-bold'>
              5. Other information that we collect which is used and shared as described below
            </h6>
            <br />

            <p>
              Other information we collect. In addition, other information that we collect and/or receive in connection with your use of the Site and/or the Delivery Apps is used to (and shared with participating merchants and our third party services providers to) contact you for administrative, customer service, security monitoring, fraud detection or similar purposes, as well as to communicate with you, to enhance your experience at and improve the Snapdelivered.com products and services and to improve the functionality and content of the Site and the Snapdelivered.com Apps including, without limitation, by showing the content that we think you might be interested in.
            </p>
          </li>

          <br />

          <li>
            <h6 className='text-xl font-bold'>
              6. Compliance and protection
            </h6>
            <br />

            <p>
              We may disclose any information we receive or collect in connection with your use of the Site and/or the Snapdelivered.com Apps to the extent that we determine in good faith to be required by any applicable laws, rules or regulations or order or in enforcement of our rights or property or the defense of claims. Without limiting the foregoing and in addition thereto, we may transfer your information to another entity if we are acquired by or merged with another entity, if all or substantially all of our assets or business are acquired by another company, or as part of a bankruptcy proceeding.
            </p>
          </li>
        </ul>
        <br />

        <h5 className='text-3xl font-bold'>
          Third party services
        </h5>
        <br />

        <p>
          The Site and the Snapdelivered.com Apps may from time to time display call-to-action buttons and/or include links to websites that are not owned or operated by us. We are not responsible for, do not endorse and have not reviewed the privacy practices of such buttons, websites, their owners or operators.
        </p>
        <br />

        <h5 className='text-3xl font-bold'>
          Children
        </h5>
        <br />

        <p>
          Please note that the Site and the Snapdelivered.com Apps are not designed to be used by or collect any personally identifiable information from individuals under the age of majority.
        </p>
        <br />

        <h5 className='text-3xl font-bold'>
          Additional California rights
        </h5>
        <br />

        <p>
          California's "Shine the Light" law (Civil Code Section § 1798.83) permits visitors who are California residents to request certain information regarding our disclosure of Personal information (as defined in California Civil Code Section 1798.83(e)(7)) to third parties for their direct marketing purposes. To make a request to access such information, please contact us at datarequests@snapdelivered.com. After receiving such a request, we will provide a list of the categories of such Personal information disclosed to third parties for third-party direct marketing purposes during the immediately preceding calendar year, along with the names and addresses of these third parties. This request may be made no more than once per calendar year. We reserve our right not to respond to requests submitted other than to the address specified in this paragraph.
          For California consumers who are California residents, please see our Notice to California Consumers subject to the California Consumer Privacy Act.
        </p>
        <br />

        <h5 className='text-3xl font-bold'>
          Changes to this Privacy Policy
        </h5>
        <br />

        <p>
          Snapdelivered.com may modify this privacy policy from time to time upon written notice or posting to the Site. It is your responsibility to review this privacy policy periodically. You agree that your access to or use of the Site or the Snapdelivered.com Apps after such notice or posting implies your acknowledgement and agreement to the modification and this privacy policy.
        </p>
        <br />

        <h5 className='text-3xl font-bold'>
          How to contact us
        </h5>
        <br />

        <p>
          If you have any questions about this privacy policy, the practices of the Site or the Snapdelivered.com Apps, or your dealings with the Site or the Snapdelivered.com Apps, please contact us using the form provided.
        </p>
        <br />

        <div className='w-full text-right'>
          <span className='font-bold text-sm'>
            Last updated: July 2021
          </span>
        </div>
      </div>
    </>
  )
}

PrivacyPolicyPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default PrivacyPolicyPage

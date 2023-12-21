import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import Head from 'next/head'

import { Page } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import { Button } from 'components/common/Button'

const { SEO } = APP_INFO

const TermsOfUsePage: Page = () => {
  const router = useRouter()

  return (
    <div className='w-full h-full max-w-4xl mx-auto py-10 text-left'>
      <section className='flex justify-between'>
        <h2 className='text-2xl font-bold'>INDEPENDENT BUSINESS OWNER APPLICATION TERMS & CONDITIONS</h2>

        <Button onClick={() => router.back()}>
          Back
        </Button>
      </section>
      <br />

      <p>
      *By entering my SSN on this Application, I certify that this number is my correct taxpayer identification number. I have not been affiliated with Snap Partners nor any of its affiliates in any way within the past year. If I have not provided a SSN/EIN I understand that I will not be eligible for commission disbursements until I provide this information to Snap Partners. I understand that any intentional misrepresentation of any information I provide on this Application may result in action by Snap Partners, up to and including termination of this Application and/or Agreement.
      </p>

      <p className="text-xl my-6">
      I AGREE that I, the undersigned, acknowledge that I have legal authority to enter into this Agreement. I understand that I may cancel this application and agreement at any time, by providing such a request to Snap Partners in writing. I have carefully read the Terms and Conditions and acknowledge this by signing at the bottom of the page.
      </p>
      <br />
      <h6 className='text-3xl font-bold mt-4'>
      READ AND SCROLL ALL THE WAY DOWN TO SUBMIT
      </h6>
      <p>
      I understand that there is no requirement beyond filing of this application and no purchase of sales or training materials are required to become an Independent Business Owner (IBO). My ability to earn commissions from Snap Partners is based upon the acquisition of customers, I understand that no commissions or bonuses will be paid to me without first acquiring such customers. I acknowledge that any purchase of sales aids, training materials or training is strictly voluntary.
      </p>

      <h6 className='text-xl font-bold mt-6'>TERMS & CONDITIONS</h6>

      <ul className='list-disc ml-6 mt-2'>
        <li className='mb-3'>
        I, the undersigned Applicant, hereby apply to become an Independent Business Owner for Snap Partners. and have carefully read and agree to abide by all terms and conditions of this Application, the Snap Partners IBO Compensation Plan, and the Snap Partners IBO Policies and Procedures which are incorporated by reference herein and collectively known as the “Agreement”. Additionally, I affirm that I am of legal age (age of majority) in the state of execution of this Agreement.
        </li>
        <li className='mb-3'>
        I understand that this Agreement is not binding until received and accepted by Snap Partners. I agree to timely pay for any products, materials, services or other items that I purchase from Snap Partners. In the event that I am delinquent with respect to such payments, I acknowledge that Snap Partners may offset such debt from any monies owing to me under its IBO Compensation Plan.
        </li>
        <li className='mb-3'>
          I certify that I have no pre-existing or unfulfilled contractual obligations that prevent or preclude me from becoming an IBO or otherwise participating as an Independent Contractor or in any other capacity with Snap Partners. In the future, should terms or conditions come to light that Snap Partners believes does or could reasonably be construed as an unfulfilled contractual obligation, I understand and agree that Snap Partners, may terminate this Agreement at any time, with or without cause. I understand that Snap Partners may terminate any Independent Business Owner who attempts to circumvent (or facilitate the circumvention of) preexisting contractual obligations in order to become a Snap Partners IBO. Snap Partners may also terminate any other Snap Partners IBO that is determined to have assisted in circumventing unfulfilled contractual obligations. I agree that Snap Partners has no knowledge of any other contractual obligations previously entered into by me. Snap Partners, its parent and/or affiliated companies, directors, officers, shareholders, members, employees, assigns, and agents (collectively referred to as “affiliates”), shall not be liable for and I release, indemnify and hold harmless the Company and its officers, members, managers, employees, agents, contractors, sublicensees, affiliates, subsidiaries, successors and assigns from and against any and all damages, liabilities, costs, expenses, claims, and/or judgments, including, without limitation, reasonable attorneys’ fees and disbursements that any of them may suffer from or incur and that arise or result primarily from a) any gross negligence or willful misconduct of the IBO arising from or connected with IBO’s carrying out of its duties under this Agreement, or b) the IBO’s breach of any of its obligations, agreements, or duties under this Agreement. I further agree to release and hold Snap Partners and its affiliates harmless from all liability arising from or relating to the promotion or operation of my Snap Partners business and any activities related to it, and agree to indemnify Snap Partners for any liability, damages, fines, penalties, or other awards arising out of or related to my conduct or omissions in connection with operating my business.
        </li>
        <li className='mb-3'>
        I agree that as an Independent Business Owner I am an independent contractor (direct seller) and not an employee, agent, partner, legal representative, or franchisee of Snap Partners. As a result, I understand and agree that: a) I am not authorized to and will not incur any debt, expense, obligation, or open any account on behalf of, for, or in the name of Snap Partners; b) I control the manner and means by which I conduct sales as an independent Snap Partners IBO, subject to my obligations to comply with the Agreement; c) I will not be compensated based on hours worked, but on a commission basis for products and services sold as set forth in the Snap Partners IBO Compensation Plan; d) I will be solely responsible for paying all expenses I incur, including but not limited to travel, food, lodging, administrative, office, telephone, and other expenses; e) I shall not be treated as an employee of Snap Partners for federal or state tax purposes; f) Snap Partners is not responsible for withholding, and shall not withhold or deduct from my bonuses and commissions, if any, FICA, FUTA, or taxes of any kind, unless such withholding becomes legally required; g) I shall be bound by all sales tax collection agreements between Snap Partners and all appropriate taxing jurisdictions, and all related rules and procedures; and h) I am not eligible for any additional benefits typically associated with employment, including but not limited to: unemployment compensation, medical benefits, sick pay, vacation pay, any type of pension plan.
        </li>
        <li className='mb-3'>
        I may terminate this Agreement for any reason, at any time, by giving Snap Partners prior written notice at its address of record. Snap Partners may terminate this Agreement pursuant to its Policies and Procedures or in the event that I breach any part of this Agreement.
        </li>
        <li className='mb-3'>
        I acknowledge that as an Independent Business Owner, I am not guaranteed any income nor am I assured any profits or success, and I certify that no claims of guaranteed profits nor representations of expected earnings that might result from my efforts as an Independent Business Owner have been made by Snap Partners. In this connection, I shall not represent directly or indirectly that any person may, can or will earn any stated gross or net amount nor that substantially all Independent Business Owners will succeed.
        </li>
        <li className='mb-3'>
        I understand that Snap Partners offers various services in different markets and, based on business conditions, certain services or the markets where the services are offered may change from time to time without notice. Further, I understand that Snap Partners strongly recommends the marketing of all available services by Independent Business Owners to their prospective customers.
        </li>
        <li className='mb-3'>
        The term of this Agreement is one year (subject to prior cancellation pursuant to the Policies and Procedures) and may be renewed for successive one-year terms. The Independent Business Owner can obtain a renewal application from the Snap Partners website. Renewal application must be received by Snap Partners no later than 90 days after the Independent Business Owner's anniversary date or deactivation of the Independent Business Owner’s agreement will occur, resulting in the forfeiture of bonuses, commissions or other payments from Snap Partners.
        </li>
        <li className='mb-3'>
        I acknowledge that my Independent Business Owner relationship is with Snap Partners and not with any carrier, supplier, or service provider with whom Snap Partners transacts or conducts business.
        </li>
        <li className='mb-3'>
        In the process of selling or otherwise promoting the products or services that Snap Partners markets, I agree that I, as an Independent Business Owner, will operate in a lawful, ethical and moral manner and I agree to make no false or misleading statements regarding the various relationships between Snap Partners, the said carrier/supplier/service provider(s) or me and the products or services. I agree not to recruit new Independent Business Owners on the basis of promoting the sale of any one service offered by Snap Partners and that I shall follow the company's recommended practices of promoting and selling all services. I specifically acknowledge that I shall not engage in the “slamming” of any customer.
        </li>
        <li className='mb-3'>
        I understand that during any investigation by Snap Partners with respect to my breach of this Agreement and/or Snap Partners' Policies and Procedures, Snap Partners may suspend this Agreement and any payments that may be otherwise owed to me shall be escrowed until final resolution has been achieved. I acknowledge that in the event of my violation of this Agreement and/or Snap Partners' Policies and Procedures, the Agreement rights may be terminated without further receipt of commissions or payments of any kind.
        </li>
        <li className='mb-3'>
        I agree to keep accurate records and shall not engage in or perform any misleading, deceptive or unethical practices. I further agree to abide by all federal, state and local laws and regulations governing the sale or solicitation of the products and services marketed by Snap Partners and/or its carrier/supplier/service provider(s), including but not limited to, any and all permits and licenses required to perform under this Agreement.
        </li>
        <li className='mb-3'>
        Neither Snap Partners nor any carrier/supplier/service provider company with whom Snap Partners transacts or contracts business shall be liable under any circumstances for any damage or loss of any kind, including indirect, special, punitive, compensatory, or consequential damages, losses or profits which may result from any cause, including but not limited to, breach of warranty, delay, act, error or omission of Snap Partners or any carrier/supplier/service provider(s), or in the event of discontinuation or modification of a product or service by Snap Partners or its carrier/supplier/service provider(s). I understand that the obligations of Snap Partners and/or its carrier/supplier/service provider(s) are limited to the performance of best efforts to process customer orders for acceptance and approval of requested services.
        </li>
        <li className='mb-3'>
        I understand that as an Independent Business Owner, I am free to select my own means, methods and manner of operation and that I am free to choose the hours and location of my activities under this Agreement, subject only to the terms of this Agreement and all Snap Partners Policies and Procedures.
        </li>
        <li className='mb-3'>
        I acknowledge that Snap Partners markets products and services to end customers at rates established by Snap Partners or its carrier/supplier/service provider(s) from time to time and that those products, services and rates shall be subject to change without prior notice.
        </li>
        <li className='mb-3'>
        Snap Partners shall periodically make various sales literature, promotion materials, training and other products or services available. I, however, am under no obligation to purchase any quantities of those materials or services at any time. Rather, I will have the option to order and purchase any materials or services, which I may choose. I further agree that after the purchase and delivery of those materials and services, refunds shall not be allowed under any circumstances, including, but not limited to, termination of this Agreement, obsolescence of such sales literature or promotional materials, except as required by applicable state laws, or any other reason.
        </li>
        <li className='mb-3'>
        Independent Business Owners are not required to purchase any products or services that Snap Partners markets. If, however, I elect to purchase any products or services marketed by Snap Partners, I agree to pay for such products or services in a timely manner as prescribed by Snap Partners or its carrier/supplier/service provider. If I fail to pay for any products or services so elected within thirty (30) days of the date payment is due, Snap Partners has the right to terminate this Agreement and apply any compensation otherwise due me to the complete satisfaction of any unpaid balance for such products or services or against any indebtedness owed to me by Snap Partners.
        </li>
        <li className='mb-3'>
        I acknowledge that I have the right to sign up as many personal customers as I wish. For each personal customer signed, I will receive a commission based on the usage of services or the purchases of products marketed by Snap Partners in accord with the currently valid Snap Partners IBO Compensation Plan. Any other payments I receive will be based upon fulfilling certain terms of qualification as set forth by the Snap Partners IBO Compensation Plan. I agree that as an Independent Business Owner, I shall place primary emphasis upon the sale of services and products to customers as a condition of my receipt of commissions. Snap Partners reserves the right to adjust commissions for promotional plans, products, affinity programs, group contractual agreements, negotiated pricing and certain services.
        </li>
        <li className='mb-3'>
        I agree to indemnify and hold Snap Partners, its shareholders, directors, officers and employees harmless from any and all claims, damages, and expenses, including any attorney's fees, arising out of my actions or conduct in violation of this Agreement. This Agreement will be governed by and construed in accordance with the laws of the State of New York without regard to principles of conflicts of laws. In the event a dispute shall arise between myself and Snap Partners as to our respective rights, duties and obligations arising out of or relating to this Agreement, and the Policies and Procedures of Snap Partners it is agreed that the parties shall attempt in good faith to resolve such disputes through nonbinding mediation. If such mediation is unsuccessful, the dispute shall be exclusively resolved through binding arbitration before the American Arbitration Association pursuant to the Commercial Rules of Arbitration (more fully described in the Policies and Procedures). The arbitration shall be held in New York, New York before a panel of three arbitrators, each side choosing one and then the two choosing the third. New York law will apply to the resolution of the dispute unless otherwise agreed in writing. The award of the arbitrator shall be final and may be entered in any court of competent jurisdiction. This provision shall not restrict Snap Partners from seeking preliminary or permanent injunctive relief in any court of competent jurisdiction.
        </li>
        <li className='mb-3'>
        Notwithstanding the foregoing, Snap Partners may bring an action before the courts seeking a restraining order, temporary or permanent injunction, or other equitable relief to protect its intellectual property rights, including but not limited to customer and/or IBO lists as well as other trade secrets, trademarks, trade names, patents, and copyrights. The Company may also seek judicial enforcement of an arbitration award. In all actions before the courts, the parties consent to exclusive jurisdiction and venue before the U.S. District Court for the Eastern District of New York, or state court residing in New York (Manhattan) County, State of New York.
        </li>
        <li className='mb-3'>
        If an IBO files a claim or counterclaim against Snap Partners, an IBO may do so on an individual basis and not with any other IBO or as part of a class action. If an IBO wishes to bring an action against Snap Partners for any act or omission relating to or arising from the Agreement, such action must be brought within one year from the date of the alleged conduct giving rise to the cause of action, or the shortest time permissible under state law. Failure to bring such action within such time shall bar all claims against Snap Partners for such act or omission. Distributor waives all claims that any other statute of limitations applies.
        </li>
        <li className='mb-3'>
        I acknowledge that I have received the Snap Partners IBO Policies and Procedures. I understand and agree that the Policies and Procedures are binding upon me. I further acknowledge that Snap Partners fully reserves its right to modify this Agreement, the Snap Partners IBO Policies and Procedures and its IBO Compensation Plan at any time by providing me with written notification or verbal communication through the Snap Partners website <a href='http://www.snappartners.com' target='_blank' className='text-primary-500 font-semibold'>(www.snappartners.com)</a>, Snap Partners Back Office, Newsletter or such modifications through other written or verbal communication from Snap Partners. For purposes of this Agreement, my address as indicated on this Application shall be deemed to be my correct address unless and until written notification of a change of address is provided by me to Snap Partners.
        </li>
        <li className='mb-3'>
        I acknowledge that this Agreement, the IBO Compensation Plan and the Snap Partners IBO Policies and Procedures incorporated herein by references constitute the entire Agreement between the parties hereto and shall not be modified or amended except as described in item 22 above. This Agreement shall be binding upon and inure to the benefit of heirs, successors and permitted assigns of the parties hereto. If any provision of the Agreement is determined by any authority of competent jurisdiction to be invalid or unenforceable in part or in whole for any reason whatsoever, the validity of the remaining provision or portions thereof shall not be affected thereby.
        </li>
        <li className='mb-3'>
        I acknowledge that the IBO Compensation Plan is based on current products Snap Partners is marketing and is subject to change without notice.
        </li>
        <li className='mb-3'>
          During the term of the Independent Business Owner Agreement, IBOs may not, directly or indirectly, sell to or solicit products or services offered by Snap Partners through any person or entity other than that specifically designated or approved in writing by Snap Partners. Independent Business Owners shall not, during their relationship with Snap Partners and for a period of one (1) year thereafter, directly or indirectly, divert, entice, knowingly call upon, sell or solicit, take away or move any customer of Snap Partners or its carrier/supplier/service provider(s), whether or not the Independent Business Owner originally procured or brought such customer to Snap Partners (such activities are collectively referred to herein as 'Solicitation'). All customers solicited by Independent Business Owners on behalf of Snap Partners and its carrier/supplier/service provider(s) are deemed to be customers of Snap Partners or its carrier/supplier/service provider(s) and not of its Independent Business Owners. Independent Business Owners understand that such non-solicitation prohibition shall be strictly enforced and that Snap Partners' carrier/supplier/service provider(s) shall be a third-party beneficiary of this prohibition as well as any proprietary and confidential information provided to Snap Partners, which in turn is received by Independent Business Owner. Further, during the term of the Agreement and for a period of one (1) year thereafter, IBOs may not enter into a direct marketing relationship with any carrier/supplier/service provider of Snap Partners. During the term of this Agreement and for a period of one (1) year thereafter, Snap Partners Independent Business Owners may not solicit a Snap Partners Independent Business Owner, whether active, inactive, individual or entity to participate in a direct sales opportunity offered by any other company, regardless of whether or not such company offers competing products or services. Violation of this covenant and condition will result in forfeiture of all distributorship rights, including all current and future commissions, bonuses and payments of any kind.
        </li>
        <li className='mb-3'>
        I authorize Snap Partners to reproduce and use my name, photograph, video, personal story, testimonial, and/or likeness in advertising or promotional materials, including but not limited to use on independent forums, and waive all claims for remuneration for such use.
        </li>
        <li className='mb-3'>
        A faxed or electronic copy of the Application shall be treated as an original in all respects.
        </li>
      </ul>

      <h6 className='text-xl font-bold mt-6'>NOTICE OF CANCELLATION</h6>

      <p>
      I may cancel this transaction, without penalty or obligation. I understand that if I cancel after ten (10) days from the date of this Agreement, exclusive of the date of signing or if processed electronically the date this Agreement is submitted to Snap Partners for processing, I am not entitled to a refund of any kind. If I cancel within ten (10) days from the date of this Agreement, any payments made by me under this Agreement and any instrument executed by me will be returned within ten (10) days following receipt by Snap Partners of my Cancellation Notice. In the event that I cancel this transaction after having redeemed any store credits associated with this transaction, the credit amount redeemed will be deducted from any refund issued. Refund of any credits redeemed will then be determined by the return policy(s) of the products or services on which the credits were redeemed. To cancel this Agreement, I must e-mail, mail (return receipt requested), fax, or deliver personally a signed, dated copy of this Notice of Cancellation to Snap Partners <b> 820 Indiantown Rd., Suite 105 Jupiter, FL 33458</b>.
      </p>

      <br />

      <div className='w-full text-right'>
        <span className='font-bold text-sm'>
          Last updated: December 2023
        </span>
      </div>
    </div>
  )
}

TermsOfUsePage.getLayout = (page: ReactNode) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - Terms Of Use</title>
    </Head>

    {page}
  </>
)

export default TermsOfUsePage

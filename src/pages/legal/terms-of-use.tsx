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
        <h2 className='text-4xl font-bold'>Terms Of Use</h2>

        <Button onClick={() => router.back()}>
          Back
        </Button>
      </section>
      <br />

      <p>
          In consideration of Snapdelivered.com, LLC ("Snapdelivered.com," "we," "us" or "our") providing you (which term, as used herein, includes you personally and, if you are using this website on behalf of the company or organization on whose behalf we grant you access, such company and organization) access to our Internet website, www.snapdelivered.com or our mobile site, m.snapdelivered.com (collectively, the "Site"), our blog (the "Snap Delivered BlogTM"), our pages and/or accounts on social media websites (the "Snap Social Media"), our mobile applications (the "Snapdelivered.com Apps") and our text messaging service (the "Snap TextTM"), and the information, documents, reports, data, features, functionalities and software that may be offered to you through or in connection with your use of and/or access to the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap TextTM and the other materials on the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps and/or the Snap TextTM (collectively, and as such may be revised from time to time by us, the "Content"), and, if applicable, you becoming and being a Partner, you hereby agree to the following terms and conditions (together with the Partner Program Terms and Conditions, if agreed by you, collectively, these "Terms of Use").
          Snapdelivered.com may modify these Terms of Use from time to time upon written notice or posting to the Site. It is your responsibility to review these Terms of Use periodically. You agree that if you use the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media, the Snap TextTM and/or the Content after such notice or posting of changes in the Terms of Use, you will be bound by all such changes and these Terms of Use.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          GENERAL
      </h6>
      <br />

      <p>
          The Site is owned and operated by Snapdelivered.com, LLC. Our merchant network available on the Site and the Snapdelivered.com Apps is solely a facilitator of communications between the merchant members and users. Unless expressly stated otherwise on the Site or the Snapdelivered.com Apps, the goods and services featured on the Site and the Snapdelivered.com Apps are offered, provided, sold and delivered by the merchant members, not us. We are in no way responsible for the quality of goods or services offered by the merchant members. All questions regarding merchant members’ products and/or services featured on the Site and the Snapdelivered.com Apps should be directed to the appropriate merchant members.
      </p>
      <br />

      <p>
          Please see our Delivery Points Program Terms of Use, the terms of which are incorporated herein by reference, for additional terms and conditions applicable to Delivery Points and Tell a Friend promotions. Please note that in our sole discretion at any time and with or without notice, we may offer further incentives or promotions, shorten or extend the duration of any incentive or promotion program and/or terminate or modify any incentive or promotion program.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          PROMOTIONS; DISCOUNTS; SWEEPSTAKES
      </h6>
      <br />

      <p>
          Promotions and discounts that may be made available from time to time on the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps and/or the Snap Social Media are offers that are limited in time and scope and are void where prohibited or restricted by applicable law, rule or regulation. Without limiting the foregoing and in addition thereto, Snapdelivered.com reserves the right, in its sole discretion, to cancel, terminate, modify or suspend any promotions and/or discounts, in each case, in whole or in part, at any time without notice and for any or no reason.
      </p>
      <br />

      <p>
          A promotion or discount is limited to one (1) per User ID and cannot be used for multiple, non-qualifying or past orders. Non-qualifying orders include, without limitation any orders paid for with cash. A promotion or discount may be limited to specific qualifying items, as may be further described in the additional terms and conditions applicable to any promotion or discount or as may be designated by Snapdelivered.com from time to time. A promotion or discount is not transferable, may not be resold and may not be combined with any other promotions or discounts. Unless otherwise indicated in the additional terms and conditions applicable to any promotion or discount or designated by Snapdelivered.com from time to time, if there is a minimum purchase requirement, tax, tip, delivery fee and other charges are excluded from the calculation of such minimum purchase requirement. If a promotion or discount is in the form of a promo code, such code must be entered in the promo code section at checkout to be redeemed. Without limiting anything set forth in these Terms of Use and in addition thereto, by redeeming a promotion or discount, you express your understanding of and agreement to these Terms of Use and any additional terms and conditions applicable to any promotion or discount.
      </p>
      <br />

      <p>
          In addition to these Terms of Use, other terms and conditions may apply to certain services and/or features made available on the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps and/or the Snap Social Media from time to time. By way of example but not limitation, such other terms and conditions may describe official rules for contests or sweepstakes on the Snap Delivered BlogTM or the Snap Social Media. Such terms and conditions are in addition to and subject to these Terms of Use. Notwithstanding anything to the contrary, becoming or being a partner (or Partner, as the Site, the Snapdelivered.com Apps, these Terms of Use and/or the Partner Terms and Conditions may state) does not entitle you to any benefits or rights, unless expressly agreed by us in writing signed by our authorized officer.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          PRICES; AVAILABILITIES; TAXES
      </h6>
      <br />

      <p>
          The information contained on the Site and the Snapdelivered.com Apps regarding prices, specifications and availability of the products and/or services listed on the Site and the Snapdelivered.com Apps has been provided by merchant members. Merchant members advised us that the prices charged by merchant members on the Site and the Snapdelivered.com Apps are generally the same as the prices charged in their brick-and-mortar stores at the time an order for products is delivered or available for pickup or at the time an order for services is fulfilled, as applicable. Although Snapdelivered.com attempts to make certain that the prices, specifications and availability listed on the Site and the Snapdelivered.com Apps and those posted in the stores on the date they are viewed on the Site and the Snapdelivered.com Apps are the same, and that unavailable products and/or services (e.g., out-of-stock items or out-of-geographical range or discontinued services) are clearly marked or removed from the inventory on the Site and the Snapdelivered.com Apps. Prices, specifications and availability of products and/or services may differ and are subject to change, including if you select a delivery or pickup date that is different from the date on which you place your order. Also, prices charged by merchant members that use third party delivery services may sometimes be different than those charged in their physical stores.
      </p>
      <br />

      <p>
          Past orders that were paid for with discounts or promotions will not be eligible for reordering using Snap Text™. To calculate the total price of an order you placed on the Site or the Snapdelivered.com Apps, merchant members use the information collected at the time you placed such order on the Site and/or the Snapdelivered.com Apps, as applicable, in each case, as evidenced by our systems. If the information you entered is incorrect or additional information is submitted, merchant members may update your order, including the total price, accordingly. For example, in case of an order you placed on the Site or the Snapdelivered.com Apps for laundry services, if you entered the wrong information regarding the number (e.g., "5" shirts instead of "6") or type (e.g., "skirt" instead of "dress") of items, your order may be updated by the merchant member. Additional fees and charges may apply as a consequence of such update. Further, certain products and/or services may no longer be available after merchant members review and/or update your order. We will of course let you know of any price update as your order is being processed!
      </p>
      <br />

      <p>
          Moreover, though every effort is made to ensure accuracy in posting pricing information, discrepancies do occur. While Snapdelivered.com has undertaken to confirm the accuracy of the information contained on the Site and the Snapdelivered.com Apps, mistakes can be made, including due both to inaccurate reporting of accurate information and accurate reporting of inaccurate information. Of course, if you become aware that the Site or any of the Snapdelivered.com Apps contains inaccurate information, please let us know by contacting us.
      </p>
      <br />

      <p>
          Any and all sales, use and other taxes which may be levied as a result of your access to and/or use of the Site and/or the Snapdelivered.com Apps are and shall remain your sole responsibility, excluding only taxes based on our net income.
      </p>
      <br />

      <p>
          All or a portion of your order amount, including Fees and Charges (as defined in the "Fees; Gratuities" section), may not be refundable depending on when your order is cancelled. If you need to cancel your order, please contact support by phone at (800) 709-7191 or email at support@snapdelivered.com.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          OFFICE ACCOUNT; TAX EXEMPT PURCHASES
      </h6>
      <br />

      <p>
          Companies or organizations may be eligible to open a snapdelivered.com office account pursuant to a separate agreement with us ("Office Account"). Any such company or organization may elect to pay for certain orders placed using User Codes recognized by our systems as being associated with the applicable Office Account. Such company or association may be able from time to time to set certain settings for the orders it will pay for (e.g., lunch hours, delivery at the office address, order amount covered, etc.) Details of any and all such orders may be shared with and/or made available to such company or organization, including for record keeping and/or billing purposes. You hereby acknowledge and agree to such sharing and/or making available.
      </p>
      <br />

      <p>
          In the event that you provided us with a tax exemption certificate and/or other equivalent tax exemption documentation or information acceptable to the relevant tax authority for the Office Account, certain orders placed using the User Codes recognized by our systems as being associated with such Office Account may be eligible for tax exemption. In such case, a tax exemption may be applied at checkout by following instructions on the checkout page of the Site. You further agree that, if you do not use the products and/or services purchased using the User Codes recognized by our systems as being associated with such Office Account for the purpose for which the tax exemption applies, you will report and pay all applicable taxes and indemnify us against any liability, including interest and penalties, arising in respect of any applicable taxes. To qualify for tax exemption, you may be required by law, among other things, to pay using solely the payment method recognized by our systems as being associated with the applicable Office Account (e.g., a company credit card) and not a personal payment method (e.g., a personal credit card). You further represent and warrant that any and all purchases made using the User Codes are made with the tax-exempt organization’s funds. You are solely responsible for determining that any purchase made using any User Code recognized by our systems as being associated with the Office Account is eligible for exemption from applicable taxes and you agree that you will comply with any and all requirements existing from time to time for the obtaining and maintenance of tax exempt treatment for any purchases, including pursuant to applicable laws, rules or regulations, as well as with Snapdelivered.com's instructions from time to time.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          FEES; GRATUITIES
      </h6>
      <br />

      <p>
          Certain orders may be subject to a delivery fee, service charge and/or required tip, each as further described below (collectively, the "Fees and Charges") charged and retained by us, or the applicable third party merchant(s) and/or third party services provider(s) (which may include independently owned and operated Snapdelivered.com franchised businesses, collectively, the "Third Party Providers") and passed through to you. The "Delivery Fee" is a percentage or fixed fee that goes towards the delivery of your order. The "Service Charge" is a percentage fee or fixed fee that may include one or more of the following charges: a service fee, a convenience fee, packaging fee, processing fee, and/or jurisdiction-specific fees (e.g., bag or healthcare fees). A small number of Third Party Providers also mandate we include a "Required Tip" with your order, which, where applicable, will be identified at checkout.
      </p>
      <br />

      <p>
          Fees and Charges are displayed prior to checkout and will be added to the total amount due at checkout for the applicable order for which you are responsible to pay. Please note that the Fees and Charges may change after checkout if your order amount changes (e.g., as a result of your special instructions or inaccurate information given when placing your order).
      </p>
      <br />

      <p>
          In addition, as a courtesy, there is an option to add a tip to the sub-total of an eligible order at checkout. You can always give delivery personnel a cash tip at the time your order is delivered.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          PLACING ORDERS FOR ALCOHOLIC BEVERAGES AND/OR TOBACCO PRODUCTS USING THE SITE OR THE SNAPDELIVERED.COM APPS
      </h6>
      <br />

      <p>
          By using the Site or any of the Snapdelivered.com Apps to place orders for alcoholic beverages and/or tobacco products, you acknowledge and agree:
      </p>
      <br />

      <p>
          (A) that the U.S. Federal and State laws require that purchasers of alcoholic beverages be at least twenty one (21) years of age and alcoholic beverages may not be sold, delivered or given away to persons who are, apparently or actually, under the age of twenty one (21) years or visibly intoxicated;
      </p>
      <br />

      <p>
          (B) that you are at least twenty one (21) years of age or older;
      </p>
      <br />

      <p>
          (C) to provide valid photo identification at the time of accepting delivery of any alcoholic beverages and/or tobacco products;
      </p>
      <br />

      <p>
          (Valid forms of identification are a valid driver's license or non-driver identification card issued by the Commissioner of Motor Vehicles, the Federal Government, a State Government, Commonwealth, Possession or Territory of the United States or a Provincial Government of Canada, a valid U.S. passport, a valid passport of any other country, or a valid military ID from the U.S. (NYS, ABC Law Section 65-b.2(b));
      </p>
      <br />

      <p>
          (D) that sale and delivery of alcohol beverages and/or tobacco products to you is made by the participating merchant members and NOT Snapdelivered.com;
      </p>
      <br />

      <p>
          (E) that Snapdelivered.com is a separate business and is not affiliated with any of the merchant members selling alcoholic beverages or tobacco;
      </p>
      <br />

      <p>
          (F) that neither Snapdelivered.com nor any of our affiliates or our or their partners, officers, directors, employees, shareholders or agents (collectively "Snapdelivered.com Parties") shall have any liability to you or any third party in connection with purchase, sale, delivery and/or consumption of the alcoholic beverages and/or tobacco products or any consequences thereof;
      </p>
      <br />

      <p>
          and
      </p>
      <br />

      <p>
          (G) that, without limiting anything set forth in these Terms of Use and in addition thereto, you shall indemnify and hold harmless Snapdelivered.com Parties for, from and against any and all claims, demands, losses, costs and expenses (including the cost of any investigation and reasonable attorneys' fees), damages, obligations, deficiencies and liabilities, which arise, result from or are related to: (i) processing of order(s) for alcoholic beverage(s) and/or tobacco product(s); (ii) purchase of the alcoholic beverage(s) and/or tobacco product(s); (iii) delivery of the alcoholic beverage(s) and/or tobacco product(s); (iv) consumption of alcoholic beverage(s) and/or tobacco product(s), and/or (v) any and all consequences of any of the foregoing.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          PROPERTY RIGHTS; COMPLIANCE WITH LAW
      </h6>
      <br />

      <p>
          The Site, the Snapdelivered.com Apps, the Snap TextTM, any and all content submitted by us on the Snap Delivered BlogTM or the Snap Social Media, and the Content are our property and are protected by applicable copyright, patent, trademark and other intellectual property laws. Except as expressly authorized herein, you may not, directly or indirectly, reproduce, transmit, sell, display, distribute, publish, broadcast, circulate, modify, disseminate or commercially exploit, in each case, whether in whole or in part, the Site, the Snapdelivered.com Apps, the Snap TextTM, any and all content submitted by us on the Snap Delivered BlogTM or the Snap Social Media, or the Content in any manner (including electronic, print or other media now known or hereafter developed) without our express written consent. Use of the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media, the Snap TextTM or the Content in violation of these Terms of Use, or any applicable law, rule or regulation (whether of the United States or other countries), or any rights of any third party is prohibited. You agree not to use the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media, the Snap TextTM or the Content for any unlawful purposes and to comply with any and all requests from us to protect our respective rights in the Site, the Snapdelivered.com Apps, the Snap TextTM, any and all content submitted by us on the Snap Delivered BlogTM or the Snap Social Media, and the Content. You agree that you will not, directly or indirectly, access, scrape, copy or otherwise use any portion of the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media, the Snap TextTM or the Content to, in each case, whether alone or with others, engage in any activity or provide any product or service that, in our good faith judgment, is competitive with Snapdelivered.com’s products or services, or disparage or discredit Snapdelivered.com or any of Snapdelivered.com’s products or services. Further, you may not, and agree not to, sell, license or otherwise provide access to and/or use of any of the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media, the Snap TextTM or the Content to any third party for any purpose whatsoever, including to build or offer a product or service that, in our good faith judgment, is competitive with Snapdelivered.com’s products or services. You may use the Site, the Snapdelivered.com Apps, the Snap TextTM, any and all content submitted by us on the Snap Delivered BlogTM or the Snap Social Media, and the Content only for your personal use. You may download the Content to your computer and print out a hard copy for your reference and internal use and display, but you will not remove any copyright, trademark or other notices or disclaimers contained in the Content. We expressly prohibit the use of devices (including software) designed to provide repeated automated access to the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap TextTM and/or the Content, including for any commercial purpose, except for those devices expressly authorized by us. We reserve the right to take any and all measures necessary to prevent such access, including denial or termination of your access to the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps and/or the Snap TextTM. If you have any questions about any materials posted on the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps or the Snap TextTM, we urge you contact your Snapdelivered.com representative.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          NON-SNAPDELIVERED.COM CONTENT, PRODUCTS AND SERVICES; USER SUBMITTED CONTENT
      </h6>
      <br />

      <p>
          We neither endorse nor are responsible for the accuracy or reliability of any information or content, including any opinion, advice or statement, made on the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap TextTM or the Snap Social Media by anyone other than authorized Snapdelivered.com employee spokespersons while acting in their official capacities. We do not review and assume no responsibility for any information or content received from, or created by you or any third party. We reserve the right (but have and shall have no obligation) to monitor, modify, delete, limit or block access to, in each case, in whole or in part, any information or content submitted by you or any third party to or by otherwise using the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap TextTM or the Snap Social Media.
      </p>
      <br />

      <p>
          By submitting any information or content to or by otherwise accessing and/or using the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and/or the Snap TextTM, you unconditionally grant us an unrestricted, irrevocable, non-exclusive, royalty-free, perpetual, world-wide, fully paid, transferable, assignable and sublicensable right and license to use, copy, store, reproduce, modify, adapt, publish, translate, create collective and/or derivative works from, distribute, perform and display any such information or content, in whole or in part, and to incorporate any such information or content in any works in any form, media, software or technology now known or later developed, in each case, for any purposes whatsoever, including for advertising, marketing, publicity and promotional purposes, subject only to our privacy policies. You hereby waive all moral rights in any such information or content.
      </p>
      <br />

      <p>
          Furthermore, we do not review and assume no responsibility for any products or services mentioned on the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media or the Snap TextTM, whether provided by Snapdelivered.com, affiliated companies or unaffiliated third parties. You agree to make your own independent evaluation of the products and services mentioned on the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and/or the Snap TextTM, including their quality.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          HYPERLINKS; THIRD PARTY WEBSITES; SOCIAL MEDIA WEBSITES
      </h6>
      <br />

      <p>
          By submitting any information or content to or by otherwise accessing and/or using the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and/or the Snap TextTM, you unconditionally grant us an unrestricted, irrevocable, non-exclusive, royalty-free, perpetual, world-wide, fully paid, transferable, assignable and sublicensable right and license to use, copy, store, reproduce, modify, adapt, publish, translate, create collective and/or derivative works from, distribute, perform and display any such information or content, in whole or in part, and to incorporate any such information or content in any works in any form, media, software or technology now known or later developed, in each case, for any purposes whatsoever, including for advertising, marketing, publicity and promotional purposes, subject only to our privacy policies. You hereby waive all moral rights in any such information or content.
      </p>
      <br />

      <p>
          In the event you use the Site, the Snapdelivered.com Apps, any and all content submitted by us on the Snap Delivered BlogTM or the Snap Social Media or the links included on the Site, the Snapdelivered.com Apps or any and all content submitted by us on the Snap Delivered BlogTM or the Snap Social Media to gain access to any World Wide Web site or any Internet location or a source of information, including social media websites, of any company, organization or person other than Snapdelivered.com, you acknowledge that such other sites, locations and sources are not under our control and agree that we will not be responsible for any information, content or links found at any such sites, locations or sources, for your use of such information, content or links found at any such sites, locations or sources, or for any such sites, locations or sources use of any information or content you submit, directly or indirectly (e.g., while using the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps or the Snap Social Media). We provide such links only as a convenience to you, and have not tested any software or verified any content found at such sites, locations or sources. You further acknowledge that we make no warranties as to the availability of or otherwise related to any such links or any such sites, locations or sources. Your access to or use of such links or any such sites, locations or sources may be subject to their respective terms of use and it is your responsibility to read and comply with those terms of use. The fact that we have provided a link to any non-Snapdelivered.com site, location or source does not signify our sponsorship or endorsement of such site, location or source or any of the contents of such site, location or source. There are inherent risks in the use of any such links or any software and/or content found on the Internet, and you acknowledge that you understand these risks.
      </p>
      <br />

      <p>
          The Site and the Snapdelivered.com Apps use the foursquare® application programming interface but are not endorsed or certified by Foursquare Labs, Inc. All of the foursquare® logos (including all foursquare® badges) and the foursquare® trademarks displayed on the Site and the Snapdelivered.com Apps are the property of Foursquare Labs, Inc.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          DMCA NOTICE; COPYRIGHT AGENT
      </h6>
      <br />

      <ul className='w-full list-disc'>
        <li>
          <p>
              We respond to notices of alleged copyright infringement in accordance with the process set forth in the Digital Millennium Copyright Act (17 U.S.C. § 512) ("DMCA"). If you are a copyright owner or an agent thereof and believe that any materials accessible on or from the Site infringe your copyright, you may submit written notification pursuant to the DMCA by providing our Copyright Agent (designated below) with all of the following information in writing (collectively, "DMCA Notice"): A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;
          </p>
        </li>
        <br />

        <li>
          <p>
              identification of the copyrighted claimed to have been infringed or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site;
          </p>
        </li>
        <br />

        <li>
          <p>
              identification of the material that is claimed to be infringing or to be the subject of an infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit the service provider to locate the material;
          </p>
        </li>
        <br />

        <li>
          <p>
              information reasonably sufficient to permit the service provider to can contact the complaining party, such as an address, telephone number, an, if available, an electronic mail address at which the complaining party may be contacted;
          </p>
        </li>
        <br />

        <li>
          <p>
              a statement that the complaining party has a good faith belief that use of the copyrighted material in the manner complained of is not authorized by the copyright owner, its agent, or the law;
          </p>
        </li>
        <br />

        <li>
          <p>
              a statement that the information in the notification is accurate, current and true; and
          </p>
        </li>
        <br />

        <li>
          <p>
              a statement, under penalty of perjury, that the complaining party is authorized to act on behalf of the copyright owner of an exclusive right that is allegedly infringed.
          </p>
        </li>
        <br />
      </ul>

      <p>
          You may direct any DMCA Notice(s) to our designated Copyright Agent at:
        <br />
        <br />
          Copyright Manager
        <br />
          Snapdelivered.com, LLC
        <br />
          110 East 59th Street
        <br />
          7th Floor
        <br />
          New York, NY 10022
        <br />
          Phone: 212-915-1963
        <br />
          Email: copyright@snapdelivered.com
        <br />
        <br />
          Alternate names for purposes of the notice are: snapdelivered.com
        <br />
          The Neighborhood by snapdelivered.com
        <br />
        <br />
          You acknowledge that if you fail to comply with all of the requirements of Section 512(c)(3) of the DMCA, your DMCA Notice may not be effective.
        <br />
        <br />
          Please be aware that if you knowingly materially misrepresent that material or activity on the Site is infringing your copyright, you may be held liable for damages (including costs and attorneys' fees) under Section 512(f) of the DMCA. We reserve the right, in appropriate circumstances, to disable and/or terminate the accounts of users who are repeat infringers.
        <br />
        <br />
          If you believe that your copyrighted materials removed on or from the Site (or to which access was disabled) are not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use the material in your content, you may send a counter-notice containing the following information to our Copyright Agent:
      </p>
      <br />

      <ul className='w-full'>
        <li>
          <p>
              Your physical or electronic signature;
          </p>
        </li>
        <br />

        <li>
          <p>
              Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled;
          </p>
        </li>
        <br />

        <li>
          <p>
              A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material to be removed or disabled; and
          </p>
        </li>
        <br />

        <li>
          <p>
              Your name, address, and telephone number, and a statement that you consent to the jurisdiction of the federal court located in New York, New York, and a statement that you will accept service of process from the person who provided notification to us of the alleged infringement or an agent of such person.
          </p>
        </li>
        <br />
      </ul>

      <h6 className='text-3xl font-bold'>
          NO OBLIGATION TO KEEP INFORMATION CURRENT
      </h6>
      <br />

      <p>
          We are not under any obligation to update the Content to reflect circumstances that may occur after its initial publication date. Due to legal restrictions or other reasons, we may not update any Content including to take into account material changes or new information.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          DISCLAIMERS; CONTENT TO BE CONSULTED IN ITS ENTIRETY
      </h6>
      <br />

      <p>
          You agree to comply with any and all rules, restrictions and disclaimers that are posted on the Site, the Snap Delivered BlogTM and/or the Snapdelivered.com Apps. All materials on the Site, the Snap Delivered BlogTM and the Snapdelivered.com Apps are meant to be reviewed in their entirety, including any footnotes, legal disclaimers, restrictions, disclosures and copyright or proprietary notices. Disclaimers, restrictions, disclosure or hedge clauses apply to any partial document or material in the same manner as they do to the whole, and will be deemed incorporated in the portion of any material or document that you consult or download.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          USER CODES
      </h6>
      <br />

      <p>
          In connection with your use of or access to the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps and the Snap TextTM, we from time to time may provide you with user names, passwords and/or other unique identifiers ("User Codes"). You are responsible for the security and confidentiality of the User Codes and agree not to disclose them to any third party, including, if you are accessing the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps or the Snap TextTM on behalf of any company or organization, any other employee in your company or organization. You are responsible for any and all information provided and any and all orders, acts and/or omissions that occur while User Codes and/or a mobile phone that has a phone number provided by you and recognized by our systems to be associated with the User Codes are/is being used, in each case, whether by you or a third party. We are not responsible for any breach of security caused by your failure to maintain the confidentiality and security of any of the User Codes. You agree to notify us immediately in the event of loss, theft or disclosure of any or all of the User Codes, if you believe the confidentiality or security of any or all of the User Codes has been compromised in any way or in the event of your learning about a possible or actual unauthorized access to and/or use of the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps or the Snap TextTM. You are limited to one User Code. Duplicate User Codes may be revoked. We reserve the right to revoke or modify the User Codes at any time with or without prior notice.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          SNAP TEXTTM
      </h6>
      <br />

      <p>
          In connection with your use of the Site and the Snapdelivered.com Apps, we, from time to time, may make available to you the Snap TextTM, a text messaging service designed to allow you to use your mobile phone to see and/or reorder certain of the orders you previously placed using the Site and/or the Snapdelivered.com Apps. To use Snap TextTM, send text messages to a phone number that may be provided by us from time to time from a mobile phone that has text/SMS capability and a phone number provided by you and recognized by our systems to be associated with the User Codes. You must provide us with a valid mobile phone number. Certain orders you previously placed using the Site and/or the Snapdelivered.com Apps, including orders to which a discount or promotion was applied, may not be available to reorder using Snap TextTM.
        <br />
          Your mobile service carrier or provider may impose data usage, text message or other charges for your use of the Snap TextTM, including sending or receiving text messages. Text messaging may not be available from all mobile phone service carriers or providers and mobile phone models. Mobile phone service may not be available in all areas. Check your mobile phone's capabilities for specifics.
        <br />
          You agree that we may send text messages to the mobile phone number you provided from time to time. Without limiting anything set forth in these Terms of Use and in addition thereto, the Snapdelivered.com Parties are not responsible for incomplete, lost, delayed or misdirected content and/or information provided through the Snap TextTM, including due to any filtering by your mobile service carrier or provider or lack of reception.
        <br />
          Each time you use the Snap TextTM, including by sending us text messages, you are confirming your agreement to these Terms of Use.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          CONSENT TO RECORDING AND MONITORING
      </h6>
      <br />

      <p>
          You consent to our recording, retention and use of all content, information and data, including images, that you input or otherwise communicate during your access to and/or use of the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and the Snap TextTM or through any e-mail to or from us and any other electronic communication means and the transmittal of the same to our affiliates, subsidiaries, branches and third parties for order and other processing, database maintenance, record keeping or any other use in accordance with customary practices, policies and procedures applicable in the United States and, of course, our privacy policies. In addition, we may disclose such information to the extent that we determine in good faith to be required by any applicable laws, rules or regulations or order or in enforcement of our rights or the defense of claims. We expressly reserve the right (but have and shall have no obligation) to monitor any and all access to and/or use of the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and/or the Snap TextTM.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          CONSENT TO RECORDING OF TELEPHONE CALLS
      </h6>
      <br />

      <p>
          You acknowledge that from time to time, we may record certain telephone calls used for the customer service and/or related purposes, and to the extent that any such recording occurs involving you, you consent to such recording.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          USE OF E-MAIL AND OTHER ELECTRONIC MESSAGES
      </h6>
      <br />

      <p>
          You acknowledge that any electronic mail, chat, information, submission or instant messenger communication, whether transmitted through the Internet, the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media, the Snap TextTM, a proprietary network, a computer, a pager or other wireless device or otherwise (collectively, "Electronic Messages") may not be secure and communications using Electronic Messages may not be confidential.
        <br />
          In addition, we assume no responsibility to update any information communicated to you using Electronic Messages. Furthermore, even if our representative has communicated with you using Electronic Messages, the representative may not (and we assume no obligation to) timely see, process, act on or respond to any message from you sent using Electronic Messages.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          DISCLAIMER OF WARRANTIES
      </h6>
      <br />

      <p>
          THE SITE, THE SNAP DELIVERED BLOGTM, THE SNAPDELIVERED.COM APPS, THE SNAP TEXTTM AND THE CONTENT ARE PROVIDED TO YOU ON AN "AS IS," "AS AVAILABLE" BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, SNAPDELIVERED.COM PARTIES HEREBY DISCLAIM ANY AND ALL WARRANTIES, GUARANTIES, CONDITIONS, COVENANTS AND REPRESENTATIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY RELATED TO MERCHANTABILITY, QUALITY, ACCURACY, COMPLETENESS, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, TIMELINESS AND ERROR-FREE UNINTERRUPTED SERVICES AS TO THE OPERATION OF THE SITE, THE SNAP DELIVERED BLOGTM THE SNAPDELIVERED.COM APPS, THE SNAP SOCIAL MEDIA OR THE SNAP TEXTTM, AND SNAPDELIVERED.COM PARTIES MAKE NO WARRANTY THAT (i) THE OPERATION OF THE SITE, THE SNAP DELIVERED BLOGTM, THE SNAPDELIVERED.COM APPS OR THE SNAP TEXTTM WILL MEET YOUR REQUIREMENTS, (ii) ACCESS TO THE SITE, THE SNAP DELIVERED BLOGTM, THE SNAPDELIVERED.COM APPS OR THE SNAP TEXTTM WILL BE UNINTERRUPTED OR ERROR-FREE, OR (iii) DEFECTS, IF ANY, WILL BE CORRECTABLE OR CORRECTED, OR OTHER ATTRIBUTES, WHETHER EXPRESS OR IMPLIED (IN LAW OR IN FACT), ORAL OR WRITTEN, OR FROM A COURSE OF DEALING OR USAGE OF TRADE. SNAPDELIVERED.COM PARTIES HAVE NO RESPONSIBILITY TO INFORM YOU OF ANY DIFFICULTIES WE OR OTHER THIRD PARTIES EXPERIENCE CONCERNING USE OF THE SITE, THE SNAP DELIVERED BLOGTM, THE SNAPDELIVERED.COM APPS OR THE SNAP TEXTTM, OR TO TAKE ANY ACTION IN CONNECTION WITH THOSE DIFFICULTIES. YOU (AND NOT SNAPDELIVERED.COM PARTIES) ASSUME THE ENTIRE COST OF ALL SERVICING, REPAIR OR CORRECTION THAT MAY BE NECESSARY FOR YOUR COMPUTER, MOBILE PHONE, TABLET AND/OR OTHER EQUIPMENT AND SOFTWARE AS A RESULT OF ANY VIRUSES, ERRORS OR OTHER PROBLEMS YOU MAY HAVE AS A RESULT OF VISITING OR USING THE SITE, THE SNAP DELIVERED BLOGTM THE SNAPDELIVERED.COM APPS, THE SNAP SOCIAL MEDIA OR THE SNAP TEXTTM. TO THE EXTENT THAT THE LAW DOES NOT PERMIT THE DISCLAIMER OF WARRANTIES, ALL CONTENT ACCESSIBLE ON THE SITE, THE SNAP DELIVERED BLOGTM, THE SNAPDELIVERED.COM APPS OR THE SNAP TEXTTM, OR ANY OTHER SITE, LOCATION OR SOURCE TO WHICH WE LINK, AND ALL OPERATIONS ON THE SITE, THE SNAP DELIVERED BLOGTM, THE SNAPDELIVERED.COM APPS AND THE SNAP TEXTTM ARE WARRANTED ONLY TO THE MINIMUM AMOUNT LEGALLY REQUIRED.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          LIMITATION OF LIABILITY
      </h6>
      <br />

      <p>
          BY USING THE SITE, THE SNAP DELIVERED BLOGTM THE SNAPDELIVERED.COM APPS, THE SNAP SOCIAL MEDIA OR THE SNAP TEXTTM, YOU SPECIFICALLY AGREE THAT YOU WILL NOT HOLD SNAPDELIVERED.COM PARTIES LIABLE TO YOU OR ANY PARTY FOR ANY DAMAGES OR INJURY OR LOSS, INCLUDING ANY AND ALL DIRECT, INDIRECT, SPECIAL, INCIDENTAL, EXEMPLARY, PUNITIVE OR CONSEQUENTIAL DAMAGES, OR LOST PROFITS, INCLUDING THE ONES THAT MAY RESULT FROM THE USE OF, OR THE INABILITY TO USE, THE SITE, THE SNAP DELIVERED BLOGTM, THE SNAPDELIVERED.COM APPS, THE SNAP SOCIAL MEDIA, THE SNAP TEXTTM OR THE CONTENT (OR ANY OTHER LINKED SITE, LOCATION OR SOURCE), WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF CONTENT AVAILABLE ON THE SITE, THE SNAP DELIVERED BLOGTM, THE SNAPDELIVERED.COM APPS, THE SNAP SOCIAL MEDIA AND THE SNAP TEXTTM (OR ANY OTHER LINKED SITE, LOCATION OR SOURCE). NONE OF THE SNAPDELIVERED.COM PARTIES WILL BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, EXEMPLARY, PUNITIVE OR CONSEQUENTIAL DAMAGES, OR LOST PROFITS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SUCH DAMAGES INCLUDE DAMAGES OR INJURY CAUSED BY ERROR, OMISSION, INTERRUPTION, DEFECT, FAILURE OF PERFORMANCE, DELAY IN OPERATION OR TRANSMISSION, LINE FAILURE, COMPUTER VIRUS OR OTHER HARMFUL COMPONENT.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          YOUR REPRESENTATIONS AND WARRANTIES
      </h6>
      <br />

      <p>
          You hereby represent and warrant that:
      </p>
      <br />

      <ol>
        <li>
          <p>
              (A) (i) you are the person to whom the User Codes you used to access the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps or the Snap TextTM were issued by us and the information you provided to us in connection with the issuance of the User Codes, if any, was and is true, accurate, current and complete, or (ii) you are accessing the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps or the Snap TextTM on behalf of the company or organization to whom the User Codes you used to access the Site, the Snap Delivered BlogTM and the Snapdelivered.com Apps were issued by us;
          </p>
        </li>
        <br />

        <li>
          <p>
              (B) if you are accessing the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps or the Snap TextTM on behalf of the company or organization to whom the User Codes you used to access the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps and the Snap TextTM were issued by us, you are duly authorized by all necessary action and have all consents, rights and authority to execute these Terms of Use on behalf of yourself and your principals and the company or organization on whose behalf we grant you access to the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps and the Snap TextTM;
          </p>
        </li>
        <br />

        <li>
          <p>
              (C) you will not reverse engineer, de-compile or reverse compile any of our technology, including any software or Java applets associated with the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and the Snap TextTM;
          </p>
        </li>
        <br />

        <li>
          <p>
              (D) unless we expressly authorize you to do so in writing, you will not use, reproduce, duplicate, copy, sell, resell, distribute, publish or exploit for any commercial purposes any portion of the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media, the Snap TextTM and/or the Content;
          </p>
        </li>
        <br />

        <li>
          <p>
              (E) you will access and use the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and the Snap TextTM in compliance with any and all applicable law(s), rules(s) or regulation(s) (whether in the United States or other countries) and the terms and conditions of these Terms of Use;
          </p>
        </li>
        <br />

        <li>
          <p>
              (F) if we grant you access to the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps and the Snap TextTM in your individual capacity, you are of the age of majority; and
          </p>
        </li>
        <br />

        <li>
          <p>
              (G) you have all consents, rights and authority to provide and submit any and all information and content provided and submitted by you or using User Codes to or otherwise using the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and the Snap TextTM, and all such information and content (1) are true, accurate, current and complete and we may rely on such information and content; (2) are not libelous, defamatory, indecent, obscene, harassing, hateful or violent; (3) are not meant to harm any Snapdelivered.com Parties or any third party; (4) do not constitute or include viruses or other harmful codes; (5) as well as their anticipated uses, do not violate, infringe or misappropriate any copyright, patent, trademark or other proprietary rights, or right of publicity or privacy of any Snapdelivered.com Parties or any third party; and (6) do not violate these Terms of Use, or any applicable law, rule or regulation (whether of the United States or other countries).
          </p>
        </li>
        <br />
      </ol>

      <h6 className='text-3xl font-bold'>
          INDEMNIFICATION
      </h6>
      <br />

      <p>
          You shall indemnify and hold harmless Snapdelivered.com, its affiliates and its and their partners, employees and agents from and against any and all claims, actions, proceedings, obligations, penalties, losses, liabilities, damages, costs and expenses (including reasonable legal and other professional fees and costs) directly or indirectly arising out of or related to (i) your breach of any agreements, representations and warranties contained in these Terms of Use, (ii) your access to and/or use of the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media, the Snap TextTM and/or the Content, and/or (iii) any and all information or content submitted by you or using User Codes to or otherwise using the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and/or the Snap TextTM, including for claims that any of it violates, infringes or misappropriates any proprietary rights, or right of publicity, privacy or any other right of any third party.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          LOCATION; GOVERNING LAW
      </h6>
      <br />

      <p>
          The Site, the Snap Delivered BlogTM and the Snapdelivered.com Apps are published in the United States. You agree that any access to or use of the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Content, the Snap TextTM, or solely between you and us, the Snap Social Media, will be deemed to be entirely at our facility in New York City, under and subject to applicable New York State and United States Federal law, rules and regulations, to the same extent as if you were to physically come to our offices in New York and, without assistance or solicitation, copy material contained in our library. These Terms of Use and all the terms herein will be governed by and construed in accordance with the laws of the State of New York without giving effect to principles of conflicts of law. Any such controversy will be submitted exclusively to Federal or state courts in the State of New York. You consent to personal jurisdiction in any applicable court for purposes of any such litigation. Any right to trial by jury with respect to any claim or action is hereby waived by all parties to these Terms of Use.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          MODIFICATION; TERMINATION
      </h6>
      <br />

      <p>
          We may at any time and for any reason with or without prior notice to you, and without liability, in each case, modify, suspend, terminate or discontinue, in whole or in part, any portion of the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps or the Snap TextTM (including the Content or hours of availability) and/or your access to or use of the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap TextTM and/or the Content. If you fail to comply with any provision of these Terms of Use, or if, in its sole discretion, Snapdelivered.com modifies, suspends, terminates or discontinues your access to or use of the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap TextTM and/or the Content, any and all rights granted to you herein will immediately automatically terminate. These Terms of Use (as may be revised from time to time as described herein) are irrevocable and, unless otherwise expressly stated in these Terms of Use, will survive the termination of your access to, and use of, the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap TextTM and/or the Content, and your relationship with us.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          FORCE MAJEURE
      </h6>
      <br />

      <p>
          None of the Snapdelivered.com Parties are or will be liable for any losses caused directly or indirectly as a result of causes or events beyond the control of Snapdelivered.com, including natural disasters, acts of God, war, terrorism actions or decrees of governmental bodies, exchange or market rulings, failure of the Internet, communication lines or utility systems, equipment and systems failures, unauthorized access, and theft (each, a "Force Majeure Event"). All of the obligations of Snapdelivered.com Parties with respect to the effected elements under these Terms of Use will be suspended for the duration of such Force Majeure Event.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          MISCELLANEOUS
      </h6>
      <br />

      <p>
          These Terms of Use represents the complete and exclusive statement of the agreement and understanding between you and us regarding your rights to access the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and/or the Snap TextTM and to use the Content and, if applicable, you becoming and being a Partner, and supersedes all agreements which you may sign with us, and all representations (whether written or oral), regarding such subject matter. Except as herein provided, no waiver, modification or amendment of any provision of these Terms of Use will be effective against us unless the same is in writing and signed by one of our executive officers. Should any term or provision of these Terms of Use be deemed or held to be invalid or unenforceable, the remaining terms and provisions will continue in full force and effect. Our failure to insist at any time upon strict compliance with any term of these Terms of Use, or any delay or failure on our part to exercise any power or right given to us in these Terms of Use, or a continued course of such conduct on our part will at no time operate as a waiver of such power or right, nor will any single or partial exercise preclude any other future exercise. All rights and remedies given to us in these Terms of Use and other terms and conditions that are subject to these Terms of Use are cumulative and not exclusive of any other rights or remedies which we otherwise have at law or equity. These Terms of Use will be binding upon you and your executors, heirs, successors and assigns. Any and all headings in the text of these Terms of Use are solely for convenience or reference and do not constitute a part of these Terms of Use, nor do they affect the meaning, construction or effect of these Terms of Use. The terms "including" and "includes" as used in these Terms of Use are intended to identify some, but not all, examples relevant to the subject matter and, therefore, should be read as "including, but not limited to" or "includes, but not limited to." Neither you nor we may assign or delegate rights, duties or obligations under these Terms of Use without the prior written consent of the other party. We may, however, assign these Terms of Use, or any rights or obligations hereunder, to an affiliate, subsidiary or any entity owned, controlled by or under common control with us, or pursuant to a merger, consolidation, change of control or corporate reorganization. These Terms of Use are in addition to, and do not nullify, any other agreement between you and us governing the conduct of your relationship with us or any other applicable terms and conditions found on the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and/or the Snap TextTM.
      </p>
      <br />

      <h6 className='text-3xl font-bold'>
          ELECTRONIC DOCUMENTS
      </h6>
      <br />

      <p>
          We may, in our sole discretion, seek your consent to the terms and conditions of these Terms of Use and certain other agreements on the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and/or the Snap TextTM by means of an electronic signature by requesting you to affirmatively check the box indicating your acceptance to these Terms of Use, affirmatively "click" on boxes containing the words "I Accept," "I Agree" or other similar phrases (collectively, "Acceptance Terms"). If you "click" on the Acceptance Terms, your "click" will be deemed a legally binding electronic signature. You acknowledge and agree that you will carefully review any document or web page before making such an electronic signature. By electronically indicating your agreement to these Terms of Use or accessing the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and/or the Snap TextTM or using any of the Content after you have had an opportunity to review these Terms of Use, you acknowledge and agree: (i) that you and, where applicable, the company or organization on whose behalf we grant you access to the Site, the Snap Delivered BlogTM, the Snapdelivered.com Apps, the Snap Social Media and/or the Snap TextTM intend to form a legally binding contract between you and Snapdelivered.com; (ii) that you have read and agree to the terms and conditions of these Terms of Use; (iii) that you agree and intend that these Terms of Use to be the legal equivalent of signed, written contracts, and equally binding; (iv) that by electronically agreeing to these Terms of Use, you acknowledge that you have received a copy of these Terms of Use by your viewing a web page containing a hyperlink to the web page where these Terms of Use are displayed or otherwise; and (v) that if you are executing these Terms of Use on behalf of others, you hereby certify that you are an authorized representative, duly authorized, including where applicable, by all required corporate action to act on behalf of such others.
      </p>
      <br />

      <div className='w-full text-right'>
        <span className='font-bold text-sm'>
          Last updated: July 2021
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

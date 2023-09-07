import ProgramCard from './ProgramCard'

const cardData = [
  {
    heading: 'Easy access to medical staff',
    content:
      'You have questions? We have answers! Unlimited access to specialized weight loss physicians via our secure telehealth platform.'
  },
  {
    heading: 'Healthcare support',
    content:
      'Our physicians will stay up to date with you through your weight loss journey to assure you are getting the most out of the program and your medication.'
  },
  {
    heading: 'Industry experts',
    content:
      'Take advantage of our team’s experience in weight loss and our medical tips for success. We’ve helped people like you lose weight successfully and transform their lives.'
  },
  {
    heading: 'Telehealth Platform -Private & secure',
    content:
      'You can sleep well at night knowing that your health information is safe and secure in our HIPAA compliant telehealth platform.'
  },
  {
    heading: 'Science backed prescriptions',
    content:
      'Obesity is a disease, not a choice. We will help you correct your body chemistry by giving you access to scientifically proven medications to lose weight.'
  },
  {
    heading: 'Serving most States',
    content:
      'Serving patients in most states execept the following;  AL, CA, HI, MI, MN, IN, LA, KS, AR, AK'
  }
]

const CardList = () => {
  return (
    <div className="container mx-2">
      <div className="flex flex-wrap ">
        {cardData.map((card, index) => (
          <ProgramCard key={index} heading={card.heading} content={card.content} />
        ))}
      </div>
    </div>
  )
}

export default CardList

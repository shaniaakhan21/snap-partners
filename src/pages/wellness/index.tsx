import { useRef } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import MainSection from './components/MainSection'
import ProductTabs from './components/ProductTabs'

const Wellness = () => {
  const productTabsRef = useRef(null)

  const handleButtonClick = () => {
    if (productTabsRef.current) {
      productTabsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
      <Header/>
      <MainSection handleButtonClick={handleButtonClick} />
      <div ref={productTabsRef}>
        <ProductTabs />
      </div>
      <Footer/>
    </div>
  )
}

export default Wellness

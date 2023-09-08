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
      <MainSection isLoggedIn={false} userData={null} handleButtonClick={handleButtonClick} />
      <div ref={productTabsRef}>
        <ProductTabs userId={null} isLoggedIn={false} collectionIdTea={459147018542} collectionIdGut={459147149614} collectionIdAllProducts={446876746030} />
      </div>
      <Footer/>
    </div>
  )
}

export default Wellness

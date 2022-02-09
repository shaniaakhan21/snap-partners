/* eslint-disable no-undef */
// import { render } from '@testing-library/react'
import ComingSoonPage from 'pages/comingsoon'
import { shallow } from 'enzyme'

describe('Test Coming Soon Page', () => {
  test('outputs a component', () => {
    expect(shallow(<ComingSoonPage />)).not.toBeNull()
  })

  // it('Should render page unchanged', () => {
  //   const pageTest = <ComingSoonPage />

  //   const { container } = render(pageTest)
  //   expect(container).toMatchSnapshot()
  // })
})

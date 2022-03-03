/* eslint-disable no-undef */
import { render } from '@testing-library/react'
import { Button } from 'components/common/Button'

describe('Test Button Component', () => {
  it('Should render Button unchanged', () => {
    const buttonTest = <Button>My Button Test</Button>

    const { container } = render(buttonTest)
    expect(container).toMatchSnapshot()
  })
})

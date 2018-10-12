/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

test('renders div', () => {
  const alert = renderer.create(<div />)
  expect(alert.toJSON()).toMatchSnapshot()
})

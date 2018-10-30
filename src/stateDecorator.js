import React from 'react'
import StateContainer from './StateContainer'

export const withState = (initialState = {}) => (storyFunc, context) => (
  <StateContainer store={initialState}>
    { (state, storeState) => {
      context.state = state
      context.storeState = storeState
      return storyFunc()
    }}
  </StateContainer>
)

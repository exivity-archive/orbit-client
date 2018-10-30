import React, { PureComponent } from 'react'
import { CrudContext } from './CrudProvider'

export const withCrudConsumer = (WrappedComponent) => {
  return class _EntityWithCrudConsumer extends PureComponent {
    render () {
      return (
        <CrudContext.Consumer>
          {({ performTransforms, ...rest }) => (
            <WrappedComponent {...rest} {...this.props} />
          )}
        </CrudContext.Consumer>
      )
    }
  }
}
import React, { PureComponent } from 'react'
import CrudContext from './CrudProvider'
import 'babel-polyfill'

const withCrudConsumer = (WrappedComponent) => {
  return class EntityWithCrudConsumer extends PureComponent {
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

export default withCrudConsumer

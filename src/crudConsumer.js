import React, { PureComponent } from 'react'
import CrudContext from './CrudProvider'
import 'babel-polyfill'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'OrbitModel'
}

const withCrudConsumer = (WrappedComponent) => {
  class ModelWithCrudConsumer extends PureComponent {
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

  ModelWithCrudConsumer.displayName = getDisplayName(WrappedComponent)
  return ModelWithCrudConsumer
}

export default withCrudConsumer

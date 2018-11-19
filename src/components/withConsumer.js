import React, { PureComponent } from 'react'
import CrudContext from './Provider'
import 'babel-polyfill'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'OrbitModel'
}

const withConsumer = (WrappedComponent) => {
  class ModelWithConsumer extends PureComponent {
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

  ModelWithConsumer.displayName = getDisplayName(WrappedComponent)
  return ModelWithConsumer
}

export default withConsumer

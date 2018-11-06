import React, { PureComponent } from 'react'
import CrudContext from './CrudProvider'
// import 'babel-polyfill'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withCrudConsumer = (WrappedComponent) => {
  class EntityWithCrudConsumer extends PureComponent {
    render () {
      return (
        <CrudContext.Consumer>
          {({ performTransforms, ...rest }) => (
            <WrappedComponent {...rest} {...this.props} children={this.props.children}>
              {this.props.children}
            </WrappedComponent>
          )}
        </CrudContext.Consumer>
      )
    }
  }

  EntityWithCrudConsumer.displayName = getDisplayName(WrappedComponent)
  return EntityWithCrudConsumer
}

export default withCrudConsumer

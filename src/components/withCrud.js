import React, { PureComponent } from 'react'

import CrudContext from './Provider'
import Crud from './Crud'

import 'babel-polyfill'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'OrbitModel'
}

const withCrud = (WrappedComponent) => {
  class ModelWithCrud extends PureComponent {
    render () {
      const {
        beforeAdd,
        onAdd,
        beforeUpdate,
        onUpdate,
        beforeRemove,
        onRemove,
        onError,
        ...rest
      } = this.props

      return (
        <CrudContext.Consumer>
          {({ schema, ...crud }) => (
            <Crud {...crud}
              beforeAdd={beforeAdd}
              onAdd={onAdd}
              beforeUpdate={beforeUpdate}
              onUpdate={onUpdate}
              beforeRemove={beforeRemove}
              onRemove={onRemove}
              onError={onError}>
              {(extendedCrud) => (
                <WrappedComponent {...rest} schema={schema} {...extendedCrud} />
              )}
            </Crud>
          )}
        </CrudContext.Consumer>
      )
    }
  }

  ModelWithCrud.displayName = getDisplayName(WrappedComponent)
  return ModelWithCrud
}

export default withCrud

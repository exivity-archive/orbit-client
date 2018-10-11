import React, { PureComponent } from 'react'
import { schemaDefinition } from '../../../../data/schema'

export const withSchemaValidation = (WrappedComponent) => {
  class SchemaValidation extends PureComponent {
    removeReadOnly = (record) => {
      const model = schemaDefinition.models[record.type]
      const attributes = Object.keys(model.attributes)

      attributes.forEach((attribute) => {
        if (model.attributes[attribute].readOnly) {
          delete record.attributes[attribute]
        }
      })

      return {
        ...record
      }
    }

    render () {
      if (this.props.record) {
        return (
          <WrappedComponent {...this.props}
            record={this.removeReadOnly(this.props.record)}>
            {(handlers) => this.props.children(handlers)}
          </WrappedComponent>
        )
      }

      return <WrappedComponent {...this.props}/>
    }
  }

  return SchemaValidation
}

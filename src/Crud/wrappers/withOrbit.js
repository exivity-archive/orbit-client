import React, { PureComponent } from 'react'
import { addRecord, updateRecord, removeRecord } from '../../../../utils/data'
import { buildRecord } from '../helpers/buildRecord'

const add = ({ type, attributes, relationships }, options) => (
  addRecord(type, attributes, relationships, options)
)

const update = ({ type, id, attributes, relationships }, options) => (
  updateRecord(type, id, attributes, relationships, options)
)

const remove = ({ type, id }, options) => (
  removeRecord(type, id, options)
)

export const withOrbit = (WrappedComponent) => {
  class OrbitWrapper extends PureComponent {
    render () {
      return (
        <WrappedComponent {...this.props}
          buildRecord={buildRecord}
          addRecord={add}
          updateRecord={update}
          removeRecord={remove}>
          {(handlers) => this.props.children(handlers)}
        </WrappedComponent>
      )
    }
  }

  return OrbitWrapper
}

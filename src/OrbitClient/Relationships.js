import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withData } from 'react-orbitjs'
import pluralize from 'pluralize'
import pick from 'lodash/pick'

// import { withCrudConsumer } from '@exivity/proton'
import withCrudConsumer from './crudConsumer'

import Model from './Model'
import Models from './Models'

class Relationships extends PureComponent {
  buildRelationshipsComponents = (relationships, initialChildren) => {
    const { type, id , children, ...rest } = this.props
    const relations = Object.keys(relationships)

    return relations.reduce((children, relation) => {
      const { type: relationType } = this.props.getRelationships(this.props.type)[relation]

      if (relationType === 'hasMany') {
        return (
          <Models type={relation}>
            {(props) => children({ ...props, ...rest })}
          </Models>
        )
      }

      if (relationType === 'hasOne') {
        return (
          <Model type={relation} id={relationships[relation].data.id} >
            {(props) => children({ ...props, ...rest })}
          </Model>
        )
      }

      return () => children({ ...rest })
    }, initialChildren)
  }

  render () {
    const { type, children } = this.props
    const record = this.props[type]
    const propsToPassOn = pick(this.props, type, 'loading', 'error')
    console.log(propsToPassOn)

    if (!record || !record.relationships) return children({
      ...propsToPassOn
    })

    return this.buildRelationshipsComponents(record.relationships, children)
  }
}

export default withCrudConsumer(Relationships)

Relationships.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  relationships: PropTypes.array,
  getRelationships: PropTypes.func.isRequired,
  buildRecord: PropTypes.func,
  addRecord: PropTypes.func,
  updateRecord: PropTypes.func,
  removeRecord: PropTypes.func,
  beforeAdd: PropTypes.func,
  onAdd: PropTypes.func,
  beforeUpdate: PropTypes.func,
  onUpdate: PropTypes.func,
  beforeRemove: PropTypes.func,
  onRemove: PropTypes.func
}
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withData } from 'react-orbitjs'

import withCrud from './withCrud'

import {
  memoizedGetExtendedRecord,
  memoizedGetRecordAndHelpers
} from '../utils/selectors'

export const notAllowedPropsRecord = ['id', 'type', 'related', 'relatedTo', 'children', 'queryStore', 'updateStore',
  'buildRecord', 'addRecord', 'updateRecord', 'removeRecord', 'cache', 'queryOptions', 'schema']

class Record extends PureComponent {
  constructor (props) {
    super(props)

    const controlled = this.isControlled('initialRecord')
    const isControlled = props.id ? props.initialRecord : props.buildRecord(props.type)
    const isntControlled = props.id ? null : props.buildRecord(props.type)

    this.state = {
      record: controlled ? isControlled : isntControlled,
      loading: props.cache === 'skip',
      error: false
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.cache === 'skip') {
      return {
        loading: !!props.loading ? props.loading : state.loading,
        error: !!props.error ? props.error : state.error
      }
    }

    return null
  }

  componentDidMount () {
    if (this.props.cache === 'skip') {
      this.queryStore()
    }
  }

  isControlled = (prop) => this.props[prop] !== undefined

  query = (query) => {
    const { id, related, relatedTo, type } = this.props

    if (related && relatedTo) {
      return query.findRelatedRecord({ type: relatedTo.type, id: relatedTo.id }, type)
    }

    return query.findRecord({ type, id })
  }

  queryStore = () => {
    this.props.queryStore(this.query, this.props.queryOptions)
      .then((record) => this.setState({
        record,
        loading: this.isControlled('loading') ? this.state.loading : false
      }))
      .catch((error) => this.setState({
        loading: this.isControlled('loading') ? this.state.loading : false,
        error
      }))
  }

  findAndSetProperty = (path, record, value) => {
    if (path.length === 1) {
      record[path[0]] = value
    } else {
      this.findAndSetProperty(path.slice(1), record[path[0]], value)
    }
  }

  setPropertyByPath = (path, value) => {
    const newRecord = { ...this.state.record }

    if (value) {
      return () => {
        this.findAndSetProperty(path, newRecord, value)
        this.setState({ record: newRecord })
      }
    }

    return (value) => {
      this.findAndSetProperty(path, newRecord, value)
      this.setState({ record: newRecord })
    }
  }

  hasRelationship = (relationship) => {
    const { record } = this.state

    return record.relationships && !!record.relationships[relationship]
  }

  setAttribute = (attribute, value) => this.setState(({ record }) => ({
    record: {
      ...record,
      attributes: {
        ...record.attributes,
        [attribute]: value
      }
    }
  }))

  setRelationship = (relationship, value) => this.setState(({ record }) => ({
    record: {
      ...record,
      relationships: {
        ...record.relationships,
        [relationship]: {
          data: value
        }
      }
    }
  }))

  addRelationship = (relatedRecord) => {
    const { schema, type } = this.props
    const { record } = this.state

    const model = schema.getModel(type)
    const relationships = Object.entries(model.relationships)
    const relationship = relationships.find(([relation, obj]) => obj.model === relatedRecord.type)

    if (relationship) {
      const [key, obj] = relationship

      if (obj.type === 'hasOne') {
        this.setRelationship(key, relatedRecord)
      }

      if (obj.type === 'hasMany') {
        if (this.hasRelationship(key)) {
          const relatedCollection = record.relationships[key].data.concat([ relatedRecord ])
          this.setRelationship(key, relatedCollection)
        } else {
          this.setRelationship(key, [ relatedRecord ])
        }
      }
    } else {
      throw new Error(`${relatedRecord.type} is not defined as a relation`)
    }
  }

  removeRelationship = (relatedRecord) => {
    const { schema, type } = this.props
    const { record } = this.state

    const model = schema.getModel(type)
    const relationships = Object.entries(model.relationships)
    const relationship = relationships.find(([relation, obj]) => obj.model === relatedRecord.type)

    if (relationship) {
      const [key, obj] = relationship

      if (obj.type === 'hasOne') {
        this.setRelationship(key, null)
      }

      if (obj.type === 'hasMany') {
        if (this.hasRelationship(key)) {
          const relatedCollection = record.relationships[key].data.filter(record => record.id !== relatedRecord.id)
          this.setRelationship(key, relatedCollection)
        }
      }
    } else {
      throw new Error(`${relatedRecord.type} is not defined as a relation`)
    }
  }

  resetAttributes = (attributes, value = undefined) => {
    attributes.map(attribute => this.setAttribute(attribute, value))
  }

  getRelatedIds = (relationship) => {
    const { record } = this.state
    const relation = record.relationships && record.relationships[relationship]

    if (relation && Array.isArray(relation.data)) {
      return relation.data.map(record => record.id)
    } else {
      return []
    }
  }

  getRelatedId = (relationship) => {
    const { record } = this.state
    const relation = record.relationships && record.relationships[relationship]

    if (relation && relation.data && relation.data.id) {
      return relation.data.id
    } else {
      return null
    }
  }

  relatedToRecord = () => {
    const { relatedTo } = this.props
    const { record } = this.state

    return !relatedTo && record && record.id
      ? record
      : relatedTo
  }

  getExtendedRecord = () => {
    return memoizedGetExtendedRecord({
      props: this.props,
      state: this.state,
      setAttribute: this.setAttribute,
      setRelationship: this.setRelationship,
      addRelationship: this.addRelationship,
      removeRelationship: this.removeRelationship,
      resetAttributes: this.resetAttributes,
      setProperty: this.setPropertyByPath,
      getRelatedIds: this.getRelatedIds,
      getRelatedId: this.getRelatedId,
    })
  }

  getRecordAndHelpers = () => {
    return memoizedGetRecordAndHelpers({
      props: this.props,
      state: this.state,
      record: this.getExtendedRecord()
    })
  }

  render () {
    const { children } = this.props
    const relatedTo = this.relatedToRecord()

    if (typeof children !== 'function') {
      return React.cloneElement(
        this.props.children,
        {
          ...this.getRecordAndHelpers(),
          relatedTo,
        }
      )
    }

    return children(this.getRecordAndHelpers())
  }
}

const mapRecordsToProps = ({ id, type, related, relatedTo }) => {
  if (id) {
    return { initialRecord: q => q.findRecord({ type, id }) }
  }

  if (related && relatedTo) {
    return { initialRecord: q => q.findRelatedRecord({ type: relatedTo.type, id: relatedTo.id }, type) }
  }

  return {}
}

const mergeProps = (record, ownProps) => {
  return {
    ...ownProps,
    ...record,
    key: ownProps.id,
    id: ownProps.id || (ownProps.relatedTo && ownProps.relatedTo.id)
  }
}

export { Record }

const WithCrud = withCrud(Record)

export default withData(mapRecordsToProps, mergeProps)(WithCrud)

Record.defaultProps = {
  relatedTo: null,
  cache: 'only',
}

Record.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  schema: PropTypes.object,
  cache: PropTypes.oneOf([
    'only',
    'skip'
  ]),
  buildRecord: PropTypes.func.isRequired,
  addRecord: PropTypes.func.isRequired,
  updateRecord: PropTypes.func.isRequired,
  removeRecord: PropTypes.func.isRequired,
  related: PropTypes.bool,
  relatedTo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  required: PropTypes.bool
}

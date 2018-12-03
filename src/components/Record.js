import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withData } from 'react-orbitjs'

import withCrud from './withCrud'

import {
  memoizedGetExtendedRecord,
  memoizedGetRecordAndHelpers
} from '../utils/selectors'

export const notAllowedPropsRecord = ['id', 'type', 'related', 'relatedTo', 'children', 'queryStore', 'updateStore',
'buildRecord', 'addRecord', 'updateRecord', 'removeRecord', 'cache']

const updateState = (props, state) => {
  const scenarios = {
    initializeRecord: !props.id && (props.id !== state.idReference),
    receivedNewId: !!props.id && (props.id !== state.idReference),
    receivedNewRecord: !!props[props.type] && (props[props.type] !== state.recordReference),
    recordNotFoundInCache: !!props.id && !props[props.type],
    cacheOnly: props.cache === 'only',
    loading: props.loading,
    error: !!props.error
  }

  if (scenarios.loading || scenarios.error) {
    return {
      recordReference: null,
      [props.type]: null,
      loading: !!props.loading ,
      error: props.error || false
    }
  }

  if (scenarios.initializeRecord) {
    const record = props.buildRecord(props.type)

    return {
      idReference: props.id,
      recordReference: record,
      [props.type]: record,
      loading: false,
      error: false
    }
  }

  if (scenarios.receivedNewId) {
    if (scenarios.recordNotFoundInCache) {
      return {
        idReference: props.id,
        recordReference: null,
        [props.type]: null,
        loading: !scenarios.cacheOnly,
        error: scenarios.cacheOnly
          ? { message: `${props.type} not found in cache` }
          : false
      }
    }

    return {
      idReference: props.id,
      recordReference: props[props.type],
      [props.type]: props[props.type],
      loading: false,
      error: false
    }
  }

  if (scenarios.receivedNewRecord) {
    return {
      idReference: props.id,
      recordReference: props[props.type],
      [props.type]: props[props.type],
      loading: false,
      error: false
    }
  }

  return null
}

const updateStateRelated = (props, state) => {
  const scenarios = {
    noRecordToRelateTo: !props.relatedTo,
    relatedRecordNotFoundInCache: !!props.relatedTo && !props[props.type],
    receivedNewRelatedRecord: !!props[props.type] && (props[props.type] !== state.recordReference),
    noRelatedRecord: !props[props.type],
    cacheOnly: props.cache === 'only',
    loading: props.loading,
    error: !!props.error
  }

  if (scenarios.loading || scenarios.error) {
    return {
      recordReference: null,
      [props.type]: null,
      loading: !!props.loading,
      error: props.error || false
    }
  }

  if (scenarios.noRecordToRelateTo) {
    return {
      recordReference: null,
      [props.type]: null,
      performedQuery: false,
      loading: false,
      error: false
    }
  }

  if (scenarios.relatedRecordNotFoundInCache && !props.required) {
    if (!scenarios.cacheOnly && !state.performedQuery) {
      return {
        recordReference: null,
        [props.type]: null,
        loading: true,
        error: false
      }
    } else {
      return {
        recordReference: null,
        [props.type]: null,
        loading: false,
        error: false
      }
    }
  }

  if (scenarios.noRelatedRecord && props.required) {
    if (!scenarios.cacheOnly && !state.performedQuery) {
      return {
        recordReference: null,
        [props.type]: null,
        loading: true,
        error: false
      }
    } else {
      return {
        recordReference: null,
        [props.type]: null,
        loading: false,
        error: {
          message: `Related ${props.type} has not been found while being required`
        }
      }
    }
  }

  if (scenarios.receivedNewRelatedRecord) {
    return {
      recordReference: props[props.type],
      [props.type]: props[props.type],
      performedQuery: false,
      loading: false,
      error: false
    }
  }

  return null
}

export const proceedIf = (...conditions) => conditions.every(condition => !!condition)

export const curried = (fn) => (...args) => {
  if (args.length === 2) {
    if (typeof args[1] === 'function') return (value) => fn(args[0], args[1](value))
    return () => fn(...args)
  }

  return (value) => fn(args[0], value)
}

class Record extends PureComponent {
  constructor (props) {
    super(props)

    this.state = props.related
      ? {
        recordReference: null
      }
      : {
        idReference: null,
        recordReference: null
      }
  }

  static getDerivedStateFromProps (props, state) {
    return props.related ? updateStateRelated(props, state) : updateState(props, state)
  }

  componentDidMount () {
    if (this.shouldQuery()) this.queryStore()
  }

  componentDidUpdate () {
    if (this.shouldQuery()) this.queryStore()
  }

  shouldQuery = () => {
    const { cache, type, related, relatedTo } = this.props
    const { performedQuery, [type]: record, loading, error } = this.state

    return proceedIf(
      related && relatedTo,
      !related,
      !performedQuery,
      cache !== 'only',
      !record,
      !loading,
      !error
    )
  }

  query = (query) => {
    const { id, related, relatedTo, type } = this.props

    if (related && relatedTo) return query.findRelatedRecord({ type: relatedTo.type, id: relatedTo.id }, type)
    return query.findRecord({ type, id })
  }

  queryStore = () => {
    this.props.queryStore(this.query)
      .then(() => this.setState({
        performedQuery: true,
        loading: false,
      }))
      .catch((error) => this.setState({
        loading: false,
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
    const newRecord = { ...this.state[this.props.type] }

    if (value) {
      return () => {
        this.findAndSetProperty(path, newRecord, value)
        this.setState({ [this.props.type]: newRecord })
      }
    }

    return (value) => {
      this.findAndSetProperty(path, newRecord, value)
      this.setState({ [this.props.type]: newRecord })  
    }
  }

  hasRelationship = (relationship) => {
    const {[this.props.type]: record} = this.state

    return record.relationships && !!record.relationships[relationship]
  }

  setAttribute = (attribute, value) => this.setState(({[this.props.type]: record }) => ({
    [this.props.type]: {
      ...record,
      attributes: {
        ...record.attributes,
        [attribute]: value
      }
    }
  }))

  setRelationship = (relationship, value) => this.setState(({[this.props.type]: record }) => ({
    [this.props.type]: {
      ...record,
      relationships: {
        ...record.attributes,
        [relationship]: {
          data: value
        }
      }
    }
  }))

  addRelationship = (relatedRecord) => {
    const { schema, type } = this.props
    const { [type]: record } = this.state

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
    const { [type]: record } = this.state

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

  relatedToRecord = () => {
    const { relatedTo, type } = this.props
    const { [type]: record } = this.state

    return !relatedTo && record?.id
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
    const { type, children } = this.props
    const relatedTo = this.relatedToRecord()

    if (typeof children !== 'function') {
      return React.cloneElement(
        this.props.children,
        {
          key: `${type}-relatedTo-${relatedTo?.id}`,
          ...this.getRecordAndHelpers(),
          relatedTo,
        }
      )
    }

    return children(this.getRecordAndHelpers())
  }
}

const mapRecordsToProps = ({ id, type, related, relatedTo, cache }) => {
  if (cache === 'skip') {
    return {}
  }

  if (id) {
    return { [type]: q => q.findRecord({ type, id }) }
  }

  if (related && relatedTo) {
    return { [type]: q => q.findRelatedRecord({ type: relatedTo.type, id: relatedTo.id }, type) }
  }

  return {}
}

const noRelation = (ownProps) => ownProps.related && !ownProps.relatedTo?.relationships[ownProps.type]

const mergeProps = (record, ownProps) => {
  // Temporary fix for react-orbitjs not clearing last result when nothing is found
  if (noRelation(ownProps)) {
    return {
      ...record,
      ...ownProps,
      [ownProps.type]: null
    }
  }

  // Temporary fix for react-orbitjs not clearing last result when nothing is found
  if (!ownProps.id && !ownProps.related) {
    return {
      ...record,
      ...ownProps,
      [ownProps.type]: null
    }
  }

  return {
    ...ownProps,
    ...record
  }
}

export { Record }

const WithCrud = withCrud(Record)

export default withData(mapRecordsToProps, mergeProps)(WithCrud)

Record.defaultProps = {
  relatedTo: null,
  cache: 'auto',
}

Record.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  schema: PropTypes.object,
  cache: PropTypes.oneOf([
    'only',
    'skip',
    'auto'
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

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withData } from 'react-orbitjs'
import omit from 'lodash/omit'

import Crud from './Crud'
import withCrudConsumer from './crudConsumer'

const notAllowedProps = ['id', 'type', 'related', 'relatedTo', 'children', 'queryStore', 'updateStore',
'buildRecord', 'addRecord', 'updateRecord', 'removeRecord']

const updateState = (props, state) => {
  const scenarios = {
    initializeRecord: !props.id && (props.id !== state.idReference),
    receivedNewId: !!props.id && (props.id !== state.idReference),
    receivedNewRecord: !!props[props.type] && (props[props.type] !== state.recordReference),
    recordNotFoundInCache: !!props.id && !props[props.type]
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
        loading: true,
        error: false
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
    relatedRecordNotFoundInCache: !!props.relatedTo && !props[props.type] && !state.searchedAllSources,
    receivedNewRelatedRecord: !!props[props.type] && (props[props.type] !== state.recordReference),
    noRelatedRecord: !props[props.type] && state.searchedAllSources
  }

  if (scenarios.noRecordToRelateTo) {
    return {
      recordReference: null,
      [props.type]: null,
      searchedAllSources: false,
      loading: false,
      error: false
    }
  }

  if (scenarios.relatedRecordNotFoundInCache) {
    return {
      recordReference: null,
      [props.type]: null,
      loading: true,
      error: false
    }
  }

  if (scenarios.receivedNewRelatedRecord) {
    return {
      recordReference: props[props.type],
      [props.type]: props[props.type],
      searchedAllSources: false,
      loading: false,
      error: false
    }
  }

  if (scenarios.noRelatedRecord && props.required) {
    return {
      loading: false,
      error: {
        message: `Related ${props.type} has not been found while being required`
      }
    }
  }

  return null
}

class Record extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      idReference: null,
      recordReference: null,
    }
  }

  static getDerivedStateFromProps (props, state) {
    return props.related ? updateStateRelated(props, state) : updateState(props, state)
  }

  componentDidMount () {
    const { id, related, relatedTo } = this.props
    const { loading } = this.state

    if (loading) {
      if (related && relatedTo) {
        this.queryStoreByRelation(relatedTo)
      } else if (id) {
        this.queryStoreById(id)
      }
    }
  }

  componentDidUpdate () {
    const { id, related, relatedTo } = this.props
    const { loading } = this.state

    if (loading) {
      if (related && relatedTo) {
        this.queryStoreByRelation(relatedTo)
      } else if (id) {
        this.queryStoreById(id)
      }
    }
  }

  queryStoreById = (id) => {
    this.props.queryStore(q => q.findRecord({ type: this.props.type, id }))
      .then(() => this.setState({ loading: false }))
      .catch((error) => {
        this.setState({
          loading: false,
          error
        })
      })
  }

  queryStoreByRelation = ({ type, id }) => {
    this.props.queryStore(q => q.findRelatedRecord({ type, id }, this.props.type))
      .then(() => this.setState({
        searchedAllSources: true,
        loading: false,
      }))
      .catch((error) => {
        this.setState({
          loading: false,
          error
        })
      })
  }

  findAndSetProperty = (path, record, value) => {
    if (path.length === 1) {
      record[path] = value
    } else {
      this.findAndSetProperty(path.slice(1), record[path[0]], value)
    }
  }

  setPropertyByPath = (path, value) => {
    const newRecord = { ...this.state[this.props.type] }

    this.findAndSetProperty(path, newRecord, value)
    this.setState({ [this.props.type]: newRecord })
  }

  setProperty = (property, ...args) => {
    if (args.length === 2) {
      const [nextProperty, value] = args
      const val = property === 'relationships' ? { data: value } : value

      return () => this.setPropertyByPath([property, nextProperty], val)
    }

    return (value) => {
      const val = property === 'relationships' ? {data: value} : value
      this.setPropertyByPath([property, ...args], val)
    }
  }

  setAttribute = (...args) => this.setProperty('attributes', ...args)

  setRelationship = (...args) => this.setProperty('relationships', ...args)

  resetAttributes = (attributes, value = undefined) => {
    attributes.map(attribute => this.setPropertyByPath(['attributes', attribute], value))
  }

  onRemove = (...args) => {
    const { type, onRemove } = this.props

    this.setState({
      [type]: null,
      error: {
        message: `${type} has been removed`
      }
    })

    onRemove && onRemove(...args)
  }

  render () {
    const { type, children, related, relatedTo } = this.props
    const { [type]: record } = this.state
    const receivedEntities = omit(this.props, [...notAllowedProps, type])

    const queryStatus = {
      loading: !!this.props.loading || this.state.loading,
      error: this.props.error || this.state.error
    }

    return (
      <Crud {...this.props} onRemove={this.onRemove}>
        {({ add, update, remove }) => {
          const extendedRecord = record
            ?  {
              ...record,
              setAttribute: this.setAttribute,
              setRelationship: this.setRelationship,
              resetAttributes: this.resetAttributes,
              setProperty: this.setPropertyByPath,
              save: record && !record.id
                ? (...args) => add({...record}, ...args)
                : (...args) => update({...record}, ...args),
              remove: (...args) => remove({...record}, ...args)
            }
            : null

          if (queryStatus.loading || queryStatus.error) {
            const propsToPass = {
              [type]: null,
              ...queryStatus
            }

            // Child is component
            if (typeof children !== 'function') {
              return React.cloneElement(
                this.props.children,
                {
                  ...propsToPass,
                  relatedTo: related
                    ? relatedTo
                    : record
                },
              )
            }

            return children(propsToPass)
          }

          // Child is component
          if (typeof children !== 'function') {
            return React.cloneElement(
              this.props.children,
              {
                [type]: extendedRecord,
                ...receivedEntities,
                relatedTo: related
                  ? relatedTo
                  : record,
                ...queryStatus
              }
            )
          }

          // Child is a function - Provide record and status in callback
          return children({
            [type]: extendedRecord,
            ...receivedEntities,
            ...queryStatus
          })
        }}
      </Crud>
    )
  }
}

const mapRecordsToProps = ({ id, type, related, relatedTo }) => {
  if (related && relatedTo) {
    return { [type]: q => q.findRelatedRecord({ type: relatedTo.type, id: relatedTo.id }, type) }
  }

  if (id) {
    return { [type]: q => q.findRecord({ type, id }) }
  }

  return {}
}


const mergeProps = (record, ownProps) => {
  // Temporary fix for react-orbitjs not clearing last result when nothing is found
  if (ownProps.related && ownProps.relatedTo && (!ownProps.relatedTo.relationships || !ownProps.relatedTo.relationships[ownProps.type])) {
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

const WithConsumer = withCrudConsumer(Record)

export default withData(mapRecordsToProps, mergeProps)(WithConsumer)

Record.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  buildRecord: PropTypes.func.isRequired,
  addRecord: PropTypes.func.isRequired,
  updateRecord: PropTypes.func.isRequired,
  removeRecord: PropTypes.func.isRequired,
  beforeAdd: PropTypes.func,
  onAdd: PropTypes.func,
  beforeUpdate: PropTypes.func,
  onUpdate: PropTypes.func,
  beforeRemove: PropTypes.func,
  onRemove: PropTypes.func,
  related: PropTypes.bool,
  relatedTo: PropTypes.object,
  required: PropTypes.bool
}

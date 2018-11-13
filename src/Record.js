import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withData } from 'react-orbitjs'
import omit from 'lodash/omit'

import Crud from './Crud'
import withCrudConsumer from './crudConsumer'

const notAllowedProps = ['id', 'type', 'related', 'relatedTo', 'children', 'queryStore', 'updateStore',
'buildRecord', 'addRecord', 'updateRecord', 'removeRecord', 'cache']

const updateState = (props, state) => {
  const scenarios = {
    initializeRecord: !props.id && (props.id !== state.idReference),
    receivedNewId: !!props.id && (props.id !== state.idReference),
    receivedNewRecord: !!props[props.type] && (props[props.type] !== state.recordReference),
    recordNotFoundInCache: !!props.id && !props[props.type],
    cacheOnly: props.cache === 'only'
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
    noRelatedRecord: !props[props.type] && state.searchedAllSources,
    cacheOnly: props.cache === 'only'
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
      loading: !scenarios.cacheOnly,
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
      const val = property === 'relationships' ? { data: value } : value
      this.setPropertyByPath([property, ...args], val)
    }
  }

  setAttribute = (...args) => this.setProperty('attributes', ...args)

  setRelationship = (...args) => this.setProperty('relationships', ...args)

  resetAttributes = (attributes, value = undefined) => {
    attributes.map(attribute => this.setPropertyByPath(['attributes', attribute], value))
  }

  beforeRemove = (...args) => {
    const { beforeRemove } = this.props

    return new Promise(async (resolve) => {
      if (beforeRemove) {
        const proceed = await beforeRemove(...args)

        if (proceed) {
          this.setState({
            loadingTransform: true
          })
        }

        resolve(proceed)
      } else {
        this.setState({
          loadingTransform: true
        })

        resolve(true)
      }
    })
  }

  onRemove = (...args) => {
    const { onRemove } = this.props

    onRemove && onRemove(...args)
  }

  onError = (error) => {
    const { onError } = this.props

    this.setState({
      loadingTransform: false,
    })

    onError && onError(error)
  }

  render () {
    const { type, children, relatedTo } = this.props
    const { [type]: record } = this.state
    const receivedEntities = omit(this.props, [...notAllowedProps, type])

    const relatedToRecord = !relatedTo && (record && record.id) ? record : relatedTo

    const queryStatus = {
      loading: !!this.props.loading || this.state.loading || this.state.loadingTransform,
      error: this.props.error || this.state.error
    }

    return (
      <Crud {...this.props} beforeRemove={this.beforeRemove} onRemove={this.onRemove} onError={this.onError}>
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
              if (children.type.displayName === 'Collection') {
                return React.cloneElement(
                  this.props.children,
                  {
                    key: `${type}-relatedTo-${relatedTo && relatedTo.id}`,
                    ...propsToPass,
                    relatedTo: relatedToRecord
                  },
                )
              } else {
                return React.cloneElement(
                  this.props.children,
                  {
                    ...propsToPass,
                    relatedTo: relatedToRecord
                  },
                )
              }
            }

            return children(propsToPass)
          }

          // Child is component
          if (typeof children !== 'function') {
            if (children.type.displayName === 'Collection') {
              return React.cloneElement(
                this.props.children,
                {
                  key: `${type}-relatedTo-${relatedTo && relatedTo.id}`,
                  [type]: extendedRecord,
                  ...receivedEntities,
                  relatedTo: relatedToRecord,
                  ...queryStatus
                }
              )
            } else {
              return React.cloneElement(
                this.props.children,
                {
                  [type]: extendedRecord,
                  ...receivedEntities,
                  relatedTo: relatedToRecord,
                  ...queryStatus
                }
              )
            }
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

export { Record }

const WithConsumer = withCrudConsumer(Record)

export default withData(mapRecordsToProps, mergeProps)(WithConsumer)

Record.defaultProps = {
  relatedTo: null,
  cache: 'auto',
}

Record.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  cache: PropTypes.oneOf([
    'only',
    'skip',
    'auto'
  ]),
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

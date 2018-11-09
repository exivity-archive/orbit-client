import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withData } from 'react-orbitjs'
import omit from 'lodash/omit'

import Crud from './Crud'
import withCrudConsumer from './crudConsumer'

const notAllowedProps = ['id', 'type', 'related', 'relatedTo', 'children', 'queryStore', 'updateStore',
'buildRecord', 'addRecord', 'updateRecord', 'removeRecord', 'getRelationships']

class Record extends PureComponent {
  constructor (props) {
    super(props)

    let state

    if (!props.related) {
      const recordNotFoundInCache = !!props.id && !props[props.type]

      state = {
        idReference: props.id,
        recordReference: props[props.type],
        [props.type]: props[props.type] || props.buildRecord(props.type),
        loading: recordNotFoundInCache,
        error: false
      }
    }

    if (props.related) {
      const relatedRecordNotFoundInCache = props.relatedTo && !props[props.type]
      const record = relatedRecordNotFoundInCache ? null : props[props.type]

      state = {
        idReference: null,
        recordReference: record,
        [props.type]: record,
        searchedAllSources: false,
        loading: !!relatedRecordNotFoundInCache,
        error: false
      }
    }

    this.state = state
  }
  // @todo Add noRecord scenario when not related => return error record not found
  static getDerivedStateFromProps (props, state) {
    if (!props.related) {
      const newIdProp = !!props.id && props.id !== state.idReference
      const buildRecord = !props.id && props.id !== state.idReference
      const newRecord = !!props[props.type] && (props[props.type] !== state.recordReference)
      const recordNotFoundInCache = props.id && !props[props.type]

      if (buildRecord) {
        const record = props.buildRecord(props.type)

        return {
          idReference: props.id,
          recordReference: record,
          [props.type]: record,
          loading: false,
          error: false
        }
      }

      if (newIdProp) {
        if (recordNotFoundInCache) {
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

      if (newRecord) {
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

    if (props.related) {
      const noRecordToRelateTo = !props.relatedTo
      const relatedRecordNotFoundInCache = props.relatedTo && !props[props.type] && !state.searchedAllSources
      const newRelatedRecord = !!props[props.type] && (props[props.type] !== state.recordReference)
      const noRelatedRecord = !props[props.type] && state.searchedAllSources

      if (noRecordToRelateTo) {
        return {
          recordReference: null,
          [props.type]: null,
          searchedAllSources: false,
          loading: false,
          error: false
        }
      }

      if (relatedRecordNotFoundInCache) {
        return {
          recordReference: null,
          [props.type]: null,
          loading: true,
          error: false
        }
      }

      if (newRelatedRecord) {
        return {
          recordReference: props[props.type],
          [props.type]: props[props.type],
          searchedAllSources: false,
          loading: false,
          error: false
        }
      }

      if (noRelatedRecord && props.required) {
        return {
          loading: false,
          error: {
            message: `Related ${props.type} has not been found while being required`
          }
        }
      }

      return null
    }
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
    this.props.queryStore(q => q.findRelatedRecord({ type, id}, this.props.type))
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

  // @TODO refactor to use array with properties and add func to record?
  setProperty = (propertyType, property, value) => this.setState(({ [this.props.type]: record }) => ({
    [this.props.type]: {
      ...record,
      [propertyType]: {
        ...record[propertyType],
        [property]: propertyType === 'attributes'
          ? value
          : { data: value }
      }
    }
  }))

  setAttribute = (...args) => {
    if (args.length === 2) {
      return () => this.setProperty('attributes', ...args)
    } else {
      return (value) => this.setProperty('attributes', ...args, value)
    }
  }

  resetAttributes = (attributes, value = undefined) => {
    attributes.map(attribute => this.setProperty('attributes', attribute, value))
  }

  setRelationship = (...args) => {
    if (args.length === 2) {
      return () => this.setProperty('relationships', ...args)
    } else {
      return (value) => this.setProperty('relationships', ...args, value)
    }
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
              save: record && !record.id
                ? (...args) => add({...record}, ...args)
                : (...args) => update({...record}, ...args),
              remove: (...args) => remove({...record}, ...args)
            }
            : null

          if (queryStatus.loading || queryStatus.error) {
            const passBack = {
              [type]: null,
              ...receivedEntities,
              ...queryStatus
            }

            // Child is component
            if (typeof children !== 'function') {
              return React.cloneElement(
                this.props.children,
                {
                  ...passBack,
                  relatedTo: related
                    ? relatedTo
                    : record
                },
              )
            }

            return children(passBack)
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
  buildRecord: PropTypes.func,
  addRecord: PropTypes.func,
  updateRecord: PropTypes.func,
  removeRecord: PropTypes.func,
  beforeAdd: PropTypes.func,
  onAdd: PropTypes.func,
  beforeUpdate: PropTypes.func,
  onUpdate: PropTypes.func,
  beforeRemove: PropTypes.func,
  onRemove: PropTypes.func,
  related: PropTypes.bool,
  required: PropTypes.bool
}

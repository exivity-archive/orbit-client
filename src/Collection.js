import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withData } from 'react-orbitjs'
import pluralize from 'pluralize'
import omit from 'lodash/omit'

import decorateQuery from './utils/decorateQuery'

const notAllowedProps = ['id', 'type', 'related', 'relatedTo', 'children', 'queryStore', 'updateStore', 'plural']

class Collection extends PureComponent {
  constructor (props) {
    super (props)

    this.pluralizedType = props.plural || pluralize(props.type)

    this.state = {
      loading: false,
      error: false
    }
  }

  componentDidMount () {
    const { [this.pluralizedType]: records, related, relatedTo } = this.props

    if (records.length) return null
    if (related && relatedTo) this.startQuery(this.queryRelated)
    if (!related) this.startQuery(this.query)
  }

  componentDidUpdate (prevProps) {
    const { [this.pluralizedType]: records, related, relatedTo } = this.props
    const relationChanged = relatedTo && relatedTo.id !== prevProps.relatedTo.id

    if (!records.length && related && relationChanged) this.startQuery(this.queryRelated)
  }

  startQuery = (query) => {
    this.setState({
      loading: true,
      error: false,
    }, query)
  }

  query = () => {
    const { queryStore, type } = this.props

    queryStore(q => q.findRecords(type))
      .then(() => this.setState({ loading: false }))
      .catch((error) => {
        this.setState({
          loading: false,
          error
        })
      })
  }

  queryRelated = () => {
    const { queryStore, relatedTo } = this.props

    queryStore(q => q.findRelatedRecords({ type: relatedTo.type, id: relatedTo.id }, this.pluralizedType))
      .then(() => this.setState({ loading: false }))
      .catch((error) => {
        this.setState({
          loading: false,
          error
        })
      })
  }

  findOne = (id) => {
    const { [this.props.type]: records } = this.props

    return records.find(item => item.id === id)
  }

  find = (ids) => {
    const { [this.props.type]: records } = this.props

    return ids.map(id => records.find(item => item.id === id))
  }

  findByAttribute = ({ attribute, value }) => {
    const { [this.props.type]: records } = this.props

    return records.filter(item => item.attributes[attribute] === value)
  }

  buildSaveTransforms = (records) => (t) => records.map((record) => {
    if (record.id) {
      return t.replaceRecord(record)
    }

    return t.addRecord(record)
  })

  buildRemoveTransforms = (records) => (t) => records.map((record) => {
    return t.removeRecord(record)
  })

  render () {
    const { [this.pluralizedType]: records, type, relatedTo, updateStore, children } = this.props
    const receivedEntities = omit(this.props, [...notAllowedProps, type])

    const queryStatus = {
      loading: !!this.props.loading || this.state.loading,
      error: this.props.error || this.state.error
    }

    const extendedRecords = {
      findOne: this.findOne,
      find: this.find,
      findByAttribute: this.findByAttribute,
      all: () => records
    }

    if (queryStatus.loading || queryStatus.error) {
      const propsToPass = {
        [this.pluralizedType]: null,
        ...queryStatus
      }

      if (typeof children !== 'function') {
        // Child is component
        return React.cloneElement(
          children,
          propsToPass
        )
      }

      return children(propsToPass)
    }

    const propsToPass = {
      ...receivedEntities,
      [this.pluralizedType]: extendedRecords,
      save: (records) => updateStore(this.buildSaveTransforms(records)),
      remove: (records) => updateStore(this.buildRemoveTransforms(records)),
      ...queryStatus
    }

    if (typeof this.props.children !== 'function') {
      // Child is component
      return React.cloneElement(
        children,
        {
          ...propsToPass,
          relatedTo
        }
      )
    }
    // Child is a function
    return children(propsToPass)
  }
}

const mapRecordsToProps = ({ type, plural, related, relatedTo, sort, filter, page }) => {
  const pluralizedType = plural || pluralize(type)

 if (related && relatedTo) {
    return {
      [pluralizedType]: q => q.findRelatedRecords({ type: relatedTo.type, id: relatedTo.id }, pluralizedType),
    }
  }

  if (!related) {
    return {
      [pluralizedType]: decorateQuery(q => q.findRecords(type), { sort, filter, page }),
    }
  }

  return {}
}

export default withData(mapRecordsToProps)(Collection)

Collection.propTypes = {
  type: PropTypes.string,
  plural: PropTypes.string,
  related: PropTypes.bool,
  queryStore: PropTypes.func,
  updateStore: PropTypes.func,
  sort: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  filter: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  page: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ])
}
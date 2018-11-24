import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withData } from 'react-orbitjs'
import pluralize from 'pluralize'
import omit from 'lodash/omit'

import decorateQuery from '../utils/decorateQuery'

const notAllowedProps = ['id', 'type', 'related', 'relatedTo', 'children', 'queryStore', 'updateStore', 'plural',
  'cache']

class Collection extends PureComponent {
  constructor (props) {
    super (props)

    this.pluralizedType = props.plural || pluralize(props.type)

    this.state = {
      fetchedCollection: [],
      loading: false,
      error: false
    }
  }

  static findRelatedRecords (collection, relatedIds) {
    return collection.filter(record => relatedIds.includes(record.id))
  }

  static getIdsFromRelatedCollection (relatedToCollection, ownType) {
    return relatedToCollection.reduce((ids, record) => {
      const idsToAdd = record.relationships && record.relationships[ownType] &&
        record.relationships[ownType].data.map(item => item.id)

      if (idsToAdd) return ids.concat(idsToAdd)
      return ids
    }, [])
  }

  componentDidMount () {
    const { related, relatedTo, cache } = this.props

    if (cache === 'only') return null
    if (related && Array.isArray(relatedTo)) this.startQuery(this.query)
    if (related && relatedTo) this.startQuery(this.queryRelated)
    if (!related) this.startQuery(this.query)
  }

  startQuery = (query) => {
    this.setState({
      loading: true,
      error: false,
    }, query)
  }

  query = () => {
    const { queryStore, type, relatedTo } = this.props
    const relatedToCollection = Array.isArray(relatedTo)
    let relatedIds

    if (relatedToCollection) {
      if (!relatedToCollection.length) return null
      relatedIds = this.getIdsFromRelatedCollection(relatedTo, type)
    }

    queryStore(q => q.findRecords(type))
      .then((fetchedCollection) => this.setState({
        fetchedCollection: relatedToCollection
          ? this.findRelatedRecords(fetchedCollection, relatedIds)
          : fetchedCollection,
        loading: false
      }))
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
      .then((fetchedCollection) => {
        this.setState({
          fetchedCollection,
          loading: false
        })
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error
        })
      })
  }

  findOne = (id) => {
    const { [this.props.type]: collection } = this.props

    return collection.find(item => item.id === id)
  }

  find = (ids) => {
    const { [this.props.type]: collection } = this.props

    return ids.map(id => collection.find(item => item.id === id))
  }

  findByAttribute = ({ attribute, value }) => {
    const { [this.props.type]: collection } = this.props

    return collection.filter(item => item.attributes[attribute] === value)
  }

  buildSaveTransforms = (collection) => (t) => collection.map((record) => {
    if (record.id) {
      return t.replaceRecord(record)
    }

    return t.addRecord(record)
  })

  buildRemoveTransforms = (collection) => (t) => collection.map((record) => {
    return t.removeRecord(record)
  })

  render () {
    const { [this.pluralizedType]: collection, type, relatedTo, updateStore, cache, children } = this.props
    const receivedEntities = omit(this.props, [...notAllowedProps, type])

    const relatedToRecordOrCollection = !relatedTo ? collection : relatedTo

    const queryStatus = {
      loading: !!this.props.loading || this.state.loading,
      error: this.props.error || this.state.error
    }

    const extendedCollection = {
      findOne: this.findOne,
      find: this.find,
      findByAttribute: this.findByAttribute,
      all: () => cache === 'only' ? collection : this.state.fetchedCollection
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
          {
            ...propsToPass,
            relatedTo: relatedToRecordOrCollection
          }
        )
      }

      return children(propsToPass)
    }

    const propsToPass = {
      ...receivedEntities,
      [this.pluralizedType]: extendedCollection,
      save: (collection) => updateStore(this.buildSaveTransforms(collection)),
      remove: (collection) => updateStore(this.buildRemoveTransforms(collection)),
      ...queryStatus
    }

    if (typeof this.props.children !== 'function') {
      // Child is component
      return React.cloneElement(
        children,
        {
          ...propsToPass,
          relatedTo: relatedToRecordOrCollection
        }
      )
    }
    // Child is a function
    return children(propsToPass)
  }
}

const mapRecordsToProps = ({ type, plural, cache, related, relatedTo, sort, filter, page }) => {
  const pluralizedType = plural || pluralize(type)

  if (cache === 'skip') {
    return {}
  }

  if (related && Array.isArray(relatedTo)) {
    return {
      [pluralizedType]: q => q.findRecords(type)
    }
  }

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

// Temp workaround for react-orbitjs not being able to handle other returns then functions
const mergeProps = (record, ownProps) => {
  const pluralizedType = ownProps.plural || pluralize(ownProps.type)

  if (ownProps.cache === 'skip') {
    return {
      ...ownProps
    }
  }

  if (ownProps.related && Array.isArray(ownProps.relatedTo)) {
    const relatedIds = Collection.getIdsFromRelatedCollection(ownProps.relatedTo, pluralizedType)

    // memoization to be used/applied
    return {
      ...record,
      ...ownProps,
      [pluralizedType]: Collection.findRelatedRecords(record[pluralizedType], relatedIds)
    }
  }

  if (ownProps.related && !ownProps.relatedTo) {
    return {
      ...record,
      ...ownProps,
      [pluralizedType]: []
    }
  }

  return {
    ...record,
    ...ownProps
  }
}

export { Collection }

export default withData(mapRecordsToProps, mergeProps)(Collection)

Collection.displayName = 'Collection'

Collection.defaultProps = {
  cache: 'skip',
}

Collection.propTypes = {
  type: PropTypes.string,
  plural: PropTypes.string,
  related: PropTypes.bool,
  relatedTo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  cache: PropTypes.oneOf([
    'only',
    'skip'
  ]),
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

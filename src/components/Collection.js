import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withData } from 'react-orbitjs'
import pluralize from 'pluralize'

import decorateQuery from '../utils/decorateQuery'

import {
  getIdsFromRelatedCollection,
  getRelatedRecords,
  findRelatedRecords,
  memoizedCollectionAndHelpers
} from '../utils/selectors'

export const notAllowedPropsCollection = ['id', 'type', 'related', 'relatedTo', 'children', 'queryStore', 'updateStore', 'plural',
  'cache']

class Collection extends PureComponent {
  constructor (props) {
    super (props)

    this.pluralizedType = props.plural || pluralize(props.type)

    this.state = {
      [this.pluralizedType]: [],
      loading: false,
      error: false
    }
  }

  componentDidMount () {
    const { related, relatedTo, cache } = this.props

    if (cache === 'only') return null
    if (related && relatedTo || !related) this.startQuery(this.queryStore)
  }

  isControlled = (prop) => this.props[prop] !== undefined ? this.props[prop] : this.state[prop]

  isRelatedToCollection = () => !!(this.props.related && Array.isArray(this.props.relatedTo))

  checkRelations = (collection) => {
    const { type, relatedTo } = this.props

    if (this.isRelatedToCollection()) {
      const relatedIds = getIdsFromRelatedCollection(relatedTo, type)
      return findRelatedRecords(collection, relatedIds)
    }

    return collection
  }

  startQuery = (query) => {
    this.setState({
      loading: true,
      error: false,
    }, query)
  }

  query = (query) => {
    const { related, relatedTo, type } = this.props

    if (related && relatedTo && !this.isRelatedToCollection()) {
      return query.findRelatedRecords({ type: relatedTo.type, id: relatedTo.id }, this.pluralizedType)
    }

    return query.findRecords(type)
  }

  queryStore = () => {
    this.props.queryStore(this.query)
      .then(this.checkRelations)
      .then((collection) => this.setState({
        [this.pluralizedType]: collection,
        loading: false
      }))
      .catch((error) => {
        this.setState({
          loading: false,
          error
        })
      })
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

  getRelatedTo = () => {
    const { related, relatedTo } = this.props
    const collection = this.isControlled(this.pluralizedType)

    if (relatedTo) return relatedTo
    if (related && !relatedTo) return null
    if (!related && !relatedTo) {
      return collection.length ? collection : null
    }
  }

  getCollectionAndHelpers = () => {
    return memoizedCollectionAndHelpers({
      props: this.props,
      state: this.state,
      collection: this.isControlled(this.pluralizedType),
      buildSaveTransforms: this.buildSaveTransforms,
      buildRemoveTransforms: this.buildRemoveTransforms,
      pluralizedType: this.pluralizedType
    })
  }

  render () {
    const relatedToRecordOrCollection = this.getRelatedTo()
    const extendedCollection = this.getCollectionAndHelpers()

    if (typeof this.props.children !== 'function') {
      // Child is component
      return React.cloneElement(
        this.props.children,
        {
          ...extendedCollection,
          relatedTo: relatedToRecordOrCollection
        }
      )
    }

    // Child is a function
    return this.props.children(extendedCollection)
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
      ...record,
      ...ownProps
    }
  }

  if (ownProps.related && Array.isArray(ownProps.relatedTo)) {
    const collection = getRelatedRecords({ ownProps, record, pluralizedType })
    
    return {
      ...record,
      ...ownProps,
      [pluralizedType]: collection
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
  queryStore: PropTypes.func.isRequired,
  updateStore: PropTypes.func.isRequired,
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

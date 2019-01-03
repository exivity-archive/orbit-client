import { createSelector } from 'reselect'
import omit from 'lodash/omit'

import { notAllowedPropsCollection } from '../components/Collection'
import { notAllowedPropsRecord } from '../components/Record'
import { curried } from '../components/Record'

export const getIdsFromRelatedCollection = (relatedToCollection, ownType) => {
  return relatedToCollection.reduce((ids, record) => {
    const idsToAdd = record.relationships && record.relationships[ownType] &&
      record.relationships[ownType].data.map(item => item.id)

    if (idsToAdd) return ids.concat(idsToAdd)
    return ids
  }, [])
}

export const findRelatedRecords = (collection, relatedIds) => collection.filter(record => relatedIds.includes(record.id))

const relatedToSelector = mergedProps => mergedProps.ownProps.relatedTo
const collection = mergedProps => mergedProps.record[mergedProps.pluralizedType]

export const getRelatedRecords = createSelector(
  relatedToSelector,
  collection,
  (relatedCollection, collection) => {
    const relatedIds = getIdsFromRelatedCollection(relatedCollection)

    return findRelatedRecords(collection, relatedIds)
  }
)

export const memoizedCollectionAndHelpers = createSelector(
  ({ props }) => props,
  ({ state }) => state.loading,
  ({ state }) => state.error,
  ({ collection }) => collection,
  ({ buildSaveTransforms }) => buildSaveTransforms,
  ({ buildRemoveTransforms }) => buildRemoveTransforms,
  ({ pluralizedType }) => pluralizedType,
  (props, loading, error, collection, buildSaveTransforms, buildRemoveTransforms, pluralizedType) => {
    const receivedEntities = omit(props, [...notAllowedPropsCollection, props.type])
    const isLoading = !!props.loading || loading
    const hasError = props.error || error

    return {
      ...receivedEntities,
      [pluralizedType]: isLoading || hasError ? null : collection,
      save: (collection) => props.updateStore(buildSaveTransforms(collection)),
      remove: (collection) => props.updateStore(buildRemoveTransforms(collection)),
      loading: isLoading,
      error: hasError
    }
  }
)

export const memoizedGetExtendedRecord = createSelector(
  ({ state, props }) => state[props.type],
  ({ props }) => props.addRecord,
  ({ props }) => props.updateRecord,
  ({ props }) => props.removeRecord,
  ({ setAttribute }) => setAttribute,
  ({ setRelationship }) => setRelationship,
  ({ addRelationship }) => addRelationship,
  ({ removeRelationship }) => removeRelationship,
  ({ resetAttributes }) => resetAttributes,
  ({ setProperty }) => setProperty,
  ({ getRelatedIds }) => getRelatedIds,
  ({ getRelatedId }) => getRelatedId,
  (
    record,
    addRecord,
    updateRecord,
    removeRecord,
    setAttribute,
    setRelationship,
    addRelationship,
    removeRelationship,
    resetAttributes,
    setProperty,
    getRelatedIds,
    getRelatedId,
  ) => {
    if (!record) return null

    return {
      ...record,
      setAttribute: curried(setAttribute),
      setRelationship: curried(setRelationship),
      addRelationship,
      removeRelationship,
      resetAttributes,
      setProperty,
      getRelatedIds,
      getRelatedId,
      save: record && !record.id
        ? (options) => addRecord({ ...record }, options)
        : (options) => updateRecord({ ...record }, options),
      remove: (options) => removeRecord({ ...record }, options)
    }
  }
)

export const memoizedGetRecordAndHelpers = createSelector(
  ({ props }) => props,
  ({ state }) => state.loading,
  ({ state }) => state.error,
  ({ record }) => record,
  (props, loading, error, record) => {
    const receivedEntities = omit(props, [...notAllowedPropsRecord, props.type])

    return {
      [props.type]: record,
      ...receivedEntities,
      loading,
      error
    }
  }
)
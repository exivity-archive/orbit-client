import { schemaDefinition } from '../../../../data/schema'
const models = schemaDefinition.models

export const buildRecord = (type) => {
  const model = models[type]
  const keysAttributes = Object.keys(model.attributes)

  return keysAttributes.reduce((record, attribute) => {
    if (model.attributes[attribute].readOnly) {
      return record
    }

    record.attributes = {
      ...record.attributes,
      [attribute]: undefined
    }

    return record
  }, {
    type,
    attributes: {},
    relationships: {}
  })
}

export const buildRecordStoryBook = (type) => {
  const model = models[type]
  const keysAttributes = Object.keys(model.attributes)
  const keysRelationships = model.relationships &&
    Object.keys(model.relationships)

  const withAttributes = keysAttributes.reduce((record, attribute) => {
    if (model.attributes[attribute].readOnly) {
      return record
    }

    record.attributes = {
      ...record.attributes,
      [attribute]: model.attributes[attribute].type
    }

    return record
  }, {
    type,
    id: undefined,
    attributes: {},
    relationships: {}
  })

  return keysRelationships
    ? keysRelationships.reduce((record, relationship) => {
      record.relationships = {
        ...record.relationships,
        [relationship]: model.relationships[relationship].type
      }

      return record
    }, withAttributes)
    : withAttributes
}

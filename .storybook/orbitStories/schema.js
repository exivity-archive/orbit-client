import { Schema } from '@orbit/data'

const schemaDefinition = {
  models: {
    planet: {
      attributes: {
        name: { type: 'string' },
        classification: { type: 'string' }
      },
      relationships: {
        sun: { type: 'hasOne', model: 'sun', inverse: 'planets' },
        moons: { type: 'hasMany', model: 'moon', inverse: 'planet' }
      }
    },
    moon: {
      attributes: {
        name: { type: 'string' }
      },
      relationships: {
        planet: { type: 'hasOne', model: 'planet', inverse: 'moons' }
      }
    },
    sun: {
      attributes: {
        name: { type: 'string' },
        classification: { type: 'string' }
      },
      relationships: {
        planets: { type: 'hasMany', model: 'planets', inverse: 'sun' }
      }
    }
  }
}

const schema = new Schema(schemaDefinition)

export default schema

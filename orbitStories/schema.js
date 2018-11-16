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
        moons: { type: 'hasMany', model: 'moon', inverse: 'planet' },
        satellites: { type: 'hasMany', model: 'satellites', inverse: 'planet' }
      }
    },
    moon: {
      attributes: {
        name: { type: 'string' }
      },
      relationships: {
        planet: { type: 'hasOne', model: 'planet', inverse: 'moons' },
        satellites: { type: 'hasMany', model: 'satellites', inverse: 'moon' }
      }
    },
    sun: {
      attributes: {
        name: { type: 'string' },
        classification: { type: 'string' }
      },
      relationships: {
        planets: { type: 'hasMany', model: 'planets', inverse: 'sun' },
        satellites: { type: 'hasMany', model: 'satellites', inverse: 'sun' }
      }
    },
    satellite: {
      attributes: {
        name: { type: 'string' },
        class: { type: 'string' }
      },
      relationships: {
        planet: { type: 'hasOne', model: 'planet', inverse: 'satellites' },
        moon: { type: 'hasOne', model: 'moon', inverse: 'satellites' },
        sun: { type: 'hasOne', model: 'sun', inverse: 'satellites' }
      }
    }
  }
}

const schema = new Schema(schemaDefinition)

export default schema

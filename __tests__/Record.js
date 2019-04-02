import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Record } from '../src/components/Record'
import { curried } from '../src/components/helpers'
import { earth, theMoon, Venus } from '../orbitStories/store'
import schema from '../orbitStories/schema'

const contextFn = {
  buildRecord: (type) => ({
    type,
    attributes: earth.attributes
  }),
  addRecord: jest.fn,
  updateRecord: jest.fn,
  removeRecord: jest.fn
}

describe('functions', () => {
  test('curried', () => {
    const testFn = () => 'test'
    const curriedFn = curried(testFn)

    expect(typeof curriedFn()).toEqual('function')
    expect(typeof curriedFn()()).toEqual('string')
  })

  test('curried with args and callback', () => {
    const testFn = (property, value) => value
    const curriedFn = curried(testFn)

    expect(curriedFn('property')('Test')).toEqual('Test')
    expect(curriedFn('attribute', 'Test')).toEqual('Test')
    expect(curriedFn('attribute', 'Check')).toEqual('Check')
    expect(curriedFn('attribute')()).toEqual(undefined)
  })
})

describe('Record', () => {
  const standardProps = {
    type: 'planet',
    ...contextFn
  }

  const extendedRecord = {
    type: expect.any(String),
    attributes: expect.any(Object),
    setAttribute: expect.any(Function),
    setRelationship: expect.any(Function),
    addRelationship: expect.any(Function),
    removeRelationship: expect.any(Function),
    resetAttributes: expect.any(Function),
    setProperty: expect.any(Function),
    getRelatedIds: expect.any(Function),
    getRelatedId: expect.any(Function),
    save: expect.any(Function),
    remove: expect.any(Function)
  }

  describe('record output', () => {
    const props = {
      ...standardProps,
      cache: 'only',
      id: 'earth',
      record: {
        ...earth
      }
    }

    const propsMoon = {
      id: theMoon.id,
      type: 'moon',
      record: theMoon,
      cache: 'only',
      ...contextFn
    }

    test('children callback args', () => {
      let childrenArgs, keys
      TestRenderer.create(
        <Record {...props} children={(args) => {
          childrenArgs = args
          keys = Object.keys(args)
          return null
        }} />
      )

      expect(childrenArgs.planet).not.toBe(props.record)
      expect(childrenArgs.planet).toEqual(expect.objectContaining(extendedRecord))
      expect(keys.length).toEqual(1)
    })

    test('child merges callback args with args of parent', () => {
      let childrenArgs, keys
      TestRenderer.create(
        <Record {...props}>
          <Record {...propsMoon} children={(args) => {
            childrenArgs = args
            keys = Object.keys(args)
            return null
          }} />
        </Record>
      )

      expect(childrenArgs.planet).toEqual(expect.objectContaining(extendedRecord))
      expect(childrenArgs.moon).toEqual(expect.objectContaining(extendedRecord))
      expect(keys.length).toEqual(2)
    })

    test('found records are passed back into args extended and pure', () => {
      let childrenArgs, keys
      TestRenderer.create(
        <Record {...props}>
          <Record {...propsMoon} children={(args) => {
            childrenArgs = args
            keys = Object.keys(args)
            return null
          }} />
        </Record>
      )

      expect(childrenArgs.planet).not.toBe(props.record)
      expect(childrenArgs.moon).not.toBe(propsMoon.record)
      expect(childrenArgs.planet).toEqual(expect.objectContaining(extendedRecord))
      expect(childrenArgs.moon).toEqual(expect.objectContaining(extendedRecord))
    })
  })

  describe('methods', () => {
    describe('hasRelationship', () => {
      const props = {
        ...standardProps,
        cache: 'only',
        id: 'earth',
        record: {
          ...earth
        },
        children: () => null,
        schema
      }

      test('returns true if relationship exists', () => {
        const root = TestRenderer.create(<Record {...props} />).root
        const instance = root.instance

        expect(instance.hasRelationship('sun')).toEqual(true)
      })

      test('returns false if relationship doesnt exists', () => {
        const root = TestRenderer.create(<Record {...props} />).root
        const instance = root.instance

        expect(instance.hasRelationship('unknown')).toEqual(false)
      })
    })

    describe('addRelationship', () => {
      const props = {
        ...standardProps,
        cache: 'only',
        id: 'earth',
        record: {
          type: earth.type,
          id: earth.id,
          attributes: {
            ...earth.attributes
          }
        },
        children: () => null,
        schema
      }

      const hasOneRelation = { type: 'sun', id: 'alpha' }
      const hasManyRelation = { type: 'moon', id: 'test' }

      test('should create a hasOne relation if there isnt any', () => {
        const root = TestRenderer.create(<Record {...props} />).root
        const instance = root.instance

        instance.addRelationship(hasOneRelation)
        expect(instance.state.record.relationships.sun.data).toEqual(hasOneRelation)
      })

      test('should replace a existing hasOne relation', () => {
        const record = {
          ...earth,
          relationships: {
            sun: {
              data: { type: 'sun', id: 'theSun' }
            }
          }
        }

        const root = TestRenderer.create(<Record {...props} record={record} />).root
        const instance = root.instance

        instance.addRelationship(hasOneRelation)
        expect(instance.state.record.relationships.sun.data).toEqual(hasOneRelation)
      })

      test('should create a hasMany relation if there isnt any', () => {
        const root = TestRenderer.create(<Record {...props} record={{ ...Venus }} />).root
        const instance = root.instance

        instance.addRelationship(hasManyRelation)
        expect(instance.state.record.relationships.moons.data).toEqual(expect.arrayContaining([ hasManyRelation ]))
      })

      test('should add a relation to a existing toMany relation', () => {
        const record = {
          ...Venus,
          relationships: {
            moons: {
              data: [ hasManyRelation ]
            }
          }
        }

        const root = TestRenderer.create(<Record {...props} record={record} />).root
        const instance = root.instance

        const secondHasManyRelation = { type: 'moon', id: 'test2' }

        instance.addRelationship(secondHasManyRelation)
        const relatedMoons = instance.state.record.relationships.moons.data

        expect(relatedMoons).toEqual(expect.arrayContaining([ hasManyRelation, secondHasManyRelation ]))
        expect(relatedMoons.length).toEqual(2)
      })
    })

    describe('removeRelationship', () => {
      const props = {
        ...standardProps,
        cache: 'only',
        id: 'earth',
        record: {
          ...earth,
          relationships: {
            ...earth.relationships,
            moons: {
              data: [{ type: 'moon', id: 'theMoon' }]
            }
          }
        },
        children: () => null,
        schema
      }

      const hasOneRelation = { type: 'sun', id: 'theSun' }
      const hasManyRelation = { type: 'moon', id: 'theMoon' }

      test('should remove a hasOne relation', () => {
        const root = TestRenderer.create(<Record {...props} />).root
        const instance = root.instance

        instance.removeRelationship(hasOneRelation)
        expect(instance.state.record.relationships.sun.data).toEqual(null)
      })

      test('should remove a hasMany relation', () => {
        const root = TestRenderer.create(<Record {...props} />).root
        const instance = root.instance

        instance.removeRelationship(hasManyRelation)
        expect(instance.state.record.relationships.moons.data).toEqual([])
      })
    })
  })
})
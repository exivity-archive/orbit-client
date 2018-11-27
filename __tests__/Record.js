import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Record, proceedIf, curried } from '../src/components/Record'
import { earth, theMoon } from '../orbitStories/store'

const contextFn = {
  buildRecord: (type) => ({
    type,
    attributes: earth.attributes
  }),
  addRecord: jest.fn,
  updateRecord: jest.fn,
  removeRecord: jest.fn
}

describe('Record', () => {
  const standardProps = {
    type: 'planet',
    ...contextFn
  }

  const state = {
    idReference: null,
    recordReference: null,
  }

  const extendedRecord = {
    type: expect.any(String),
    attributes: expect.any(Object),
    setAttribute: expect.any(Function),
    setRelationship: expect.any(Function),
    resetAttributes: expect.any(Function),
    setProperty: expect.any(Function),
    save: expect.any(Function),
    remove: expect.any(Function)
  }

  describe('getDerivedStateFromProps scenarios', () => {
    test('no changes', () => {})
    test('initialize record', () => {
      const props = {
        ...standardProps,
        id: undefined
      }

      const result = Record.getDerivedStateFromProps(props, state)

      expect(result.idReference).toEqual(undefined)
      expect(result.recordReference).toBe(result.planet)
      expect(result.planet.type).toEqual('planet')
      expect(result.loading).toEqual(false)
      expect(result.error).toEqual(false)
      expect(Object.keys(result).length).toEqual(5)
    })

    describe('cache only', () => {
      test('record not found', () => {
        const props = {
          ...standardProps,
          cache: 'only',
          id: 'earth'
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.idReference).toEqual('earth')
        expect(result.recordReference).toEqual(null)
        expect(result.planet).toEqual(null)
        expect(result.loading).toEqual(false)
        expect(result.error.message).toEqual('planet not found in cache')
        expect(Object.keys(result).length).toEqual(5)
      })

      test('record found', () => {
        const props = {
          ...standardProps,
          cache: 'only',
          id: 'earth',
          planet: {
            ...earth
          }
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.idReference).toEqual('earth')
        expect(result.recordReference).toBe(props.planet)
        expect(result.planet.id).toEqual('earth')
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })

      test('updated record', () => {
        const props = {
          ...standardProps,
          cache: 'only',
          id: 'earth',
          planet: {
            ...earth
          }
        }

        const oldState = {
          ...state,
          planet: {
            id: 'earth'
          }
        }

        const result = Record.getDerivedStateFromProps(props, oldState)

        expect(result.idReference).toEqual('earth')
        expect(result.recordReference).toBe(props.planet)
        expect(result.planet).toBe(props.planet)
        expect(result.planet).not.toBe(oldState.planet)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })

    describe('cache skip', () => {
      test('record not found', () => {
        const props = {
          ...standardProps,
          cache: 'skip',
          id: 'earth'
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.idReference).toEqual('earth')
        expect(result.recordReference).toEqual(null)
        expect(result.planet).toEqual(null)
        expect(result.loading).toEqual(true)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })

      test('record found', () => {
        const props = {
          ...standardProps,
          cache: 'skip',
          id: 'earth',
          planet: {
            id: 'earth',
          }
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.idReference).toEqual('earth')
        expect(result.recordReference).toBe(props.planet)
        expect(result.planet.id).toEqual('earth')
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })

      test('updated record', () => {
        const props = {
          ...standardProps,
          cache: 'skip',
          id: 'earth',
          planet: {
            id: 'earth'
          }
        }

        const oldState = {
          ...state,
          planet: {
            id: 'earth'
          }
        }

        const result = Record.getDerivedStateFromProps(props, oldState)

        expect(result.idReference).toEqual('earth')
        expect(result.recordReference).toBe(props.planet)
        expect(result.planet).toBe(props.planet)
        expect(result.planet).not.toBe(oldState.planet)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })

    describe('cache auto', () => {
      test('record not found', () => {
        const props = {
          ...standardProps,
          cache: 'auto',
          id: 'earth'
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.idReference).toEqual('earth')
        expect(result.recordReference).toEqual(null)
        expect(result.planet).toEqual(null)
        expect(result.loading).toEqual(true)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })

      test('record found', () => {
        const props = {
          ...standardProps,
          cache: 'auto',
          id: 'earth',
          planet: {
            id: 'earth',
          }
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.idReference).toEqual('earth')
        expect(result.recordReference).toBe(props.planet)
        expect(result.planet.id).toEqual('earth')
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })

      test('updated record', () => {
        const props = {
          ...standardProps,
          cache: 'auto',
          id: 'earth',
          planet: {
            id: 'earth'
          }
        }

        const oldState = {
          ...state,
          planet: {
            id: 'earth'
          }
        }

        const result = Record.getDerivedStateFromProps(props, oldState)

        expect(result.idReference).toEqual('earth')
        expect(result.recordReference).toBe(props.planet)
        expect(result.planet).toBe(props.planet)
        expect(result.planet).not.toBe(oldState.planet)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })
  })

  describe('record output', () => {
    const props = {
      ...standardProps,
      cache: 'only',
      id: 'earth',
      planet: {
        ...earth
      }
    }

    const propsMoon = {
      id: theMoon.id,
      type: 'moon',
      moon: theMoon,
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

      expect(childrenArgs.planet).not.toBe(props.planet)
      expect(childrenArgs.planet).toEqual(expect.objectContaining(extendedRecord))
      expect(childrenArgs.loading).toEqual(false)
      expect(childrenArgs.error).toEqual(false)
      expect(keys.length).toEqual(3)
    })

    test('children callback args when loading', () => {
      let childrenArgs, keys
      TestRenderer.create(
        <Record {...props} loading>
          <Record {...propsMoon} children={(args) => {
            childrenArgs = args
            keys = Object.keys(args)
            return null
          }} />
        </Record>
      )

      expect(childrenArgs.planet).toEqual(null)
      expect(childrenArgs.moon).toEqual(null)
      expect(childrenArgs.loading).toEqual(true)
      expect(childrenArgs.error).toEqual(false)
      expect(keys.length).toEqual(4)
    })

    test('children callback args when error', () => {
      const error = { message: 'record not found' }
      let childrenArgs, keys
      TestRenderer.create(
        <Record {...props} error={error}>
          <Record {...propsMoon} children={(args) => {
            childrenArgs = args
            keys = Object.keys(args)
            return null
          }} />
        </Record>
      )

      expect(childrenArgs.planet).toEqual(null)
      expect(childrenArgs.moon).toEqual(null)
      expect(childrenArgs.loading).toEqual(false)
      expect(childrenArgs.error).toEqual(error)
      expect(keys.length).toEqual(4)
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
      expect(childrenArgs.loading).toEqual(false)
      expect(childrenArgs.error).toEqual(false)
      expect(keys.length).toEqual(4)
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

      expect(childrenArgs.planet).not.toBe(props.planet)
      expect(childrenArgs.moon).not.toBe(propsMoon.moon)
      expect(childrenArgs.planet).toEqual(expect.objectContaining(extendedRecord))
      expect(childrenArgs.moon).toEqual(expect.objectContaining(extendedRecord))
    })
  })

  describe('methods', () => {
    test('proceedIf', () => {
      expect(proceedIf(true, true, true)).toEqual(true)
      expect(proceedIf(true, false, true)).toEqual(false)
    })

    test('curried', () => {
      const testFn = () => 'test'
      const curriedFn = curried(testFn)

      expect(typeof curriedFn()).toEqual('function')
      expect(typeof curriedFn()()).toEqual('string')
    })

    test('curried with args and callback', () => {
      const testFn = (property, value) => value
      const curriedFn = curried(testFn)

      const test = {
        name: 'Test',
        doubleCheck: 'Check'
      }

      expect(curriedFn()('Test')).toEqual('Test')
      expect(curriedFn('attribute', (test) => test.name)(test)).toEqual('Test')
      expect(curriedFn('attribute', (test) => test.doubleCheck)(test)).toEqual('Check')
      expect(curriedFn('attribute', (test) => test.doesNotExist)(test)).toEqual(undefined)
    })
  })
})

describe('Related record', () => {
  const standardProps = {
    id: undefined,
    type: 'moon',
    related: true,
    ...contextFn
  }

  const state = {
    recordReference: null,
  }

  describe('getDerivedStateFromProps scenarios', () => {
    describe('cache only', () => {
      test('no record to relate to', () => {
        const props = {
          ...standardProps,
          cache: 'only',
          relatedTo: null
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.performedQuery).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })

      test('related record not found when not required', () => {
        const props = {
          ...standardProps,
          cache: 'only',
          relatedTo: { type: 'planet', id: 'earth' }
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(4)
      })

      test('related record not found when required', () => {
        const props = {
          ...standardProps,
          cache: 'only',
          relatedTo: { type: 'planet', id: 'earth' },
          required: true
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.loading).toEqual(false)
        expect(result.error.message).toEqual('Related moon has not been found while being required')
        expect(Object.keys(result).length).toEqual(4)
      })

      test('related record found', () => {
        const props = {
          ...standardProps,
          cache: 'only',
          relatedTo: { type: 'planet', id: 'earth' },
          moon: { type: 'moon', id: 'theMoon' }
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toBe(props.moon)
        expect(result.moon).toBe(props.moon)
        expect(result.performedQuery).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })

      test('updated related record', () => {
        const props = {
          ...standardProps,
          cache: 'only',
          relatedTo: { type: 'planet', id: 'earth' },
          moon: { type: 'moon', id: 'theMoon' }
        }

        const oldState = {
          ...state,
          moon: {
            type: 'moon',
            id: 'theMoon'
          }
        }

        const result = Record.getDerivedStateFromProps(props, oldState)

        expect(result.recordReference).toBe(props.moon)
        expect(result.recordReference).not.toBe(oldState.moon)
        expect(result.moon).toBe(props.moon)
        expect(result.moon).not.toBe(oldState.moon)
        expect(result.performedQuery).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })

    describe('cache skip', () => {
      test('no record to relate to', () => {
        const props = {
          ...standardProps,
          cache: 'skip',
          relatedTo: null
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.performedQuery).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })

      test('related record not found when not required', () => {
        const props = {
          ...standardProps,
          cache: 'skip',
          relatedTo: { type: 'planet', id: 'earth' }
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.loading).toEqual(true)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(4)
      })

      test('related record not found when required', () => {
        const props = {
          ...standardProps,
          cache: 'skip',
          relatedTo: { type: 'planet', id: 'earth' },
          required: true
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.loading).toEqual(true)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(4)
      })

      test('related record not found when required and all sources searched', () => {
        const props = {
          ...standardProps,
          cache: 'skip',
          relatedTo: { type: 'planet', id: 'earth' },
          required: true
        }

        const oldState = {
          ...state,
          performedQuery: true,
        }

        const result = Record.getDerivedStateFromProps(props, oldState)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.loading).toEqual(false)
        expect(result.error.message).toEqual(`Related moon has not been found while being required`)
        expect(Object.keys(result).length).toEqual(4)
      })

      test('updated related record', () => {
        const props = {
          ...standardProps,
          cache: 'skip',
          relatedTo: { type: 'planet', id: 'earth' },
          moon: { type: 'moon', id: 'theMoon' }
        }

        const oldState = {
          ...state,
          moon: {
            type: 'moon',
            id: 'theMoon'
          }
        }

        const result = Record.getDerivedStateFromProps(props, oldState)

        expect(result.recordReference).toBe(props.moon)
        expect(result.recordReference).not.toBe(oldState.moon)
        expect(result.moon).toBe(props.moon)
        expect(result.moon).not.toBe(oldState.moon)
        expect(result.performedQuery).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })

    describe('cache auto', () => {
      test('no record to relate to', () => {
        const props = {
          ...standardProps,
          cache: 'auto',
          relatedTo: null
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.performedQuery).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })

      test('related record not found when not required', () => {
        const props = {
          ...standardProps,
          cache: 'auto',
          relatedTo: { type: 'planet', id: 'earth' }
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.loading).toEqual(true)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(4)
      })

      test('related record not found when required', () => {
        const props = {
          ...standardProps,
          cache: 'auto',
          relatedTo: { type: 'planet', id: 'earth' },
          required: true
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.loading).toEqual(true)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(4)
      })

      test('related record not found when required and all sources searched', () => {
        const props = {
          ...standardProps,
          cache: 'auto',
          relatedTo: { type: 'planet', id: 'earth' },
          required: true
        }

        const oldState = {
          ...state,
          performedQuery: true,
        }

        const result = Record.getDerivedStateFromProps(props, oldState)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.loading).toEqual(false)
        expect(result.error.message).toEqual(`Related moon has not been found while being required`)
        expect(Object.keys(result).length).toEqual(4)
      })

      test('updated related record', () => {
        const props = {
          ...standardProps,
          cache: 'auto',
          relatedTo: { type: 'planet', id: 'earth' },
          moon: { type: 'moon', id: 'theMoon' }
        }

        const oldState = {
          ...state,
          moon: {
            type: 'moon',
            id: 'theMoon'
          }
        }

        const result = Record.getDerivedStateFromProps(props, oldState)

        expect(result.recordReference).toBe(props.moon)
        expect(result.recordReference).not.toBe(oldState.moon)
        expect(result.moon).toBe(props.moon)
        expect(result.moon).not.toBe(oldState.moon)
        expect(result.performedQuery).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })
  })

  describe('related record output', () => {

  })
})
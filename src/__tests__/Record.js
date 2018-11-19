import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Record } from '../components/Record'
import { earth, theMoon } from '../../orbitStories/store'

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

  describe('initialize record scenario', () => {
    const props = {
      ...standardProps,
      id: undefined
    }

    const propsMoon = {
      id: theMoon.id,
      type: 'moon',
      moon: theMoon,
      cache: 'only',
      ...contextFn
    }

    test('getDerivedStateFromProps', () => {
      const result = Record.getDerivedStateFromProps(props, state)

      expect(result.idReference).toEqual(undefined)
      expect(result.recordReference).toBe(result.planet)
      expect(result.planet.type).toEqual('planet')
      expect(result.loading).toEqual(false)
      expect(result.error).toEqual(false)
      expect(Object.keys(result).length).toEqual(5)
    })

    test('children callback gives back proper args', () => {
      let childrenArgs, keys
      TestRenderer.create(
        <Record {...props} children={(args) => {
          childrenArgs = args
          keys = Object.keys(args)
          return null
        }} />
      )

      expect(childrenArgs.planet).toEqual(expect.objectContaining(extendedRecord))
      expect(childrenArgs.loading).toEqual(false)
      expect(childrenArgs.error).toEqual(false)
      expect(keys.length).toEqual(3)
    })

    test('only passes allowed props to child component', () => {
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
  })

  describe('cache only scenarios', () => {
    describe('record not found', () => {
      test('getDerivedStateFromProps', () => {
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
        expect(result.error.message).toEqual('No record found in cache')
        expect(Object.keys(result).length).toEqual(5)
      })
    })

    describe('record found', () => {
      test('getDerivedStateFromProps', () => {
        const props = {
          ...standardProps,
          cache: 'only',
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
    })

    describe('updated record', () => {
      test('getDerivedStateFromProps', () => {
        const props = {
          ...standardProps,
          cache: 'only',
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

  describe('cache skip scenarios', () => {
    describe('record not found', () => {
      test('getDerivedStateFromProps', () => {
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
    })

    describe('record found', () => {
      test('getDerivedStateFromProps', () => {
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
    })

    describe('updated record', () => {
      test('getDerivedStateFromProps', () => {
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
  })

  describe('cache auto scenarios', () => {
    describe('record not found', () => {
      test('getDerivedStateFromProps', () => {
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
    })

    describe('record found', () => {
      test('getDerivedStateFromProps', () => {
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
    })

    describe('updated record', () => {
      test('getDerivedStateFromProps', () => {
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

  describe('cache only scenarios', () => {
    describe('no record to relate to', () => {
      test('getDerivedStateFromProps', () => {
        const props = {
          ...standardProps,
          cache: 'only',
          relatedTo: null
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.searchedAllSources).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })

    describe('related record not found when not required', () => {
      test('getDerivedStateFromProps', () => {
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
    })

    describe('related record not found when required', () => {
      test('getDerivedStateFromProps', () => {
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
    })

    describe('related record found', () => {
      test('getDerivedStateFromProps', () => {
        const props = {
          ...standardProps,
          cache: 'only',
          relatedTo: { type: 'planet', id: 'earth' },
          moon: { type: 'moon', id: 'theMoon' }
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toBe(props.moon)
        expect(result.moon).toBe(props.moon)
        expect(result.searchedAllSources).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })

    describe('updated related record', () => {
      test('getDerivedStateFromProps', () => {
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
        expect(result.searchedAllSources).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })
  })

  describe('cache skip scenarios', () => {
    describe('no record to relate to', () => {
      test('getDerivedStateFromProps', () => {
        const props = {
          ...standardProps,
          cache: 'skip',
          relatedTo: null
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.searchedAllSources).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })

    describe('related record not found when not required', () => {
      test('getDerivedStateFromProps', () => {
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
    })

    describe('related record not found when required', () => {
      test('getDerivedStateFromProps', () => {
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
    })

    describe('related record not found when required and all sources searched', () => {
      test('getDerivedStateFromProps', () => {
        const props = {
          ...standardProps,
          cache: 'skip',
          relatedTo: { type: 'planet', id: 'earth' },
          required: true
        }

        const oldState = {
          ...state,
          searchedAllSources: true,
        }

        const result = Record.getDerivedStateFromProps(props, oldState)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.loading).toEqual(false)
        expect(result.error.message).toEqual(`Related moon has not been found while being required`)
        expect(Object.keys(result).length).toEqual(4)
      })
    })

    describe('updated related record', () => {
      test('getDerivedStateFromProps', () => {
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
        expect(result.searchedAllSources).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })
  })

  describe('cache auto scenarios', () => {
    describe('no record to relate to', () => {
      test('getDerivedStateFromProps', () => {
        const props = {
          ...standardProps,
          cache: 'auto',
          relatedTo: null
        }

        const result = Record.getDerivedStateFromProps(props, state)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.searchedAllSources).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })

    describe('related record not found when not required', () => {
      test('getDerivedStateFromProps', () => {
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
    })

    describe('related record not found when required', () => {
      test('getDerivedStateFromProps', () => {
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
    })

    describe('related record not found when required and all sources searched', () => {
      test('getDerivedStateFromProps', () => {
        const props = {
          ...standardProps,
          cache: 'auto',
          relatedTo: { type: 'planet', id: 'earth' },
          required: true
        }

        const oldState = {
          ...state,
          searchedAllSources: true,
        }

        const result = Record.getDerivedStateFromProps(props, oldState)

        expect(result.recordReference).toEqual(null)
        expect(result.moon).toEqual(null)
        expect(result.loading).toEqual(false)
        expect(result.error.message).toEqual(`Related moon has not been found while being required`)
        expect(Object.keys(result).length).toEqual(4)
      })
    })

    describe('updated related record', () => {
      test('getDerivedStateFromProps', () => {
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
        expect(result.searchedAllSources).toEqual(false)
        expect(result.loading).toEqual(false)
        expect(result.error).toEqual(false)
        expect(Object.keys(result).length).toEqual(5)
      })
    })
  })
})
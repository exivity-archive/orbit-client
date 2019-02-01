import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Collection } from '../src/components/Collection'
import { earth, theMoon, europa } from '../orbitStories/store'

const queryMock = jest.fn()

describe('Collection', () => {
  const props = {
    type: 'moon',
    cache: 'only',
    moons: [theMoon, europa]
  }

  const mocks = {
    children: () => null,
    queryStore: queryMock.mockResolvedValue([theMoon]),
    updateStore: jest.fn
  }

  const planets = [ earth ]

  const collectionAndHelpersCacheOnlyShape = {
    moons: props.moons,
    save: expect.any(Function),
    remove: expect.any(Function)
  }

  const collectionAndHelpersCacheSkipShape = {
    moons: props.moons,
    save: expect.any(Function),
    remove: expect.any(Function),
    loading: false,
    error: false
  }

  const withReceivedEntities = {
    planets,
    ...collectionAndHelpersCacheOnlyShape,
  }

  describe('cache only', () => {
    describe('methods', () => {
      const root = TestRenderer.create(<Collection {...props} {...mocks} />).root
      const instance = root.instance

      test('isRelatedToCollection', () => {
        expect(instance.isRelatedToCollection()).toEqual(false)
      })

      test('getRelatedTo', () => {
        expect(instance.getRelatedTo()).toBe(props.moons)
      })

      test('isControlled', () => {
        expect(instance.isControlled('moons')).toBe(props.moons)
      })

      test('getCollectionAndHelpers', () => {
        const collectionAndHelpers = instance.getCollectionAndHelpers()

        expect(collectionAndHelpers.moons.length).toEqual(2)
        expect(collectionAndHelpers).toEqual(expect.objectContaining(collectionAndHelpersCacheOnlyShape))
      })

      test('getCollectionAndHelpers uses memoization', () => {
        const test = instance.getCollectionAndHelpers()
        const test2 = instance.getCollectionAndHelpers()
        expect(test).toBe(test2)
      })

      test('received entities are passed along by getCollectionAndHelpers', () => {
        const root = TestRenderer.create(
          <Collection {...props} {...mocks} >
            <Collection type='planet' cache='only' planets={planets} {...mocks} />
          </Collection>).root

        const receiver = root.findByProps({ type: 'planet' }).instance
        expect(receiver.getCollectionAndHelpers()).toEqual(expect.objectContaining(withReceivedEntities))
      })
    })

    describe('Collection output', () => {
      const props = {
        type: 'moon',
        cache: 'only',
        moons: [theMoon, europa]
      }

      const propsPlanets = {
        type: 'planet',
        cache: 'only',
        planets: [earth]
      }

      const mocks = {
        children: () => null,
        queryStore: queryMock.mockResolvedValue([theMoon]),
        updateStore: jest.fn
      }

      test('children callback args', () => {
        let childrenArgs, keys
        TestRenderer.create(
          <Collection {...props} {...mocks} children={(args) => {
            childrenArgs = args
            keys = Object.keys(args)
            return null
          }} />
        )

        expect(childrenArgs.moons).toBe(props.moons)
        expect(childrenArgs.save).toEqual(expect.any(Function))
        expect(childrenArgs.remove).toEqual(expect.any(Function))
        expect(keys.length).toEqual(3)
      })

      test('child merges callback args with args of parent', () => {
        let childrenArgs, keys
        TestRenderer.create(
          <Collection {...props} {...mocks}>
            <Collection {...propsPlanets} {...mocks} children={(args) => {
              childrenArgs = args
              keys = Object.keys(args)
              return null
            }} />
          </Collection>
        )

        expect(childrenArgs.planets).toBe(propsPlanets.planets)
        expect(childrenArgs.moons).toBe(props.moons)
        expect(childrenArgs.save).toEqual(expect.any(Function))
        expect(childrenArgs.remove).toEqual(expect.any(Function))
        expect(keys.length).toEqual(4)
      })
    })
  })

  describe('skip cache', () => {
    const props = {
      type: 'moon',
      cache: 'skip',
    }

    const collectionAndHelpersShape = {
      moons: [theMoon],
      save: expect.any(Function),
      remove: expect.any(Function),
      loading: false,
      error: false
    }

    describe('methods', () => {
      const root = TestRenderer.create(<Collection {...props} {...mocks} />).root
      const instance = root.instance

      test('getCollectionAndHelpers', () => {
        const collectionAndHelpers = instance.getCollectionAndHelpers()
        expect(collectionAndHelpers.moons.length).toEqual(1)
        expect(collectionAndHelpers).toEqual(expect.objectContaining(collectionAndHelpersShape))
      })
    })
  })
})

describe('related Collection', () => {
  const propsNoRelatedTo = {
    type: 'moon',
    cache: 'only',
    related: true,
    moons: [theMoon],
    children: () => null
  }

  const props = {
    ...propsNoRelatedTo,
    relatedTo: earth,
  }

  const mocks = {
    children: () => null,
    queryStore: queryMock.mockResolvedValue([theMoon]),
    updateStore: jest.fn
  }

  describe('methods', () => {
    const root = TestRenderer.create(<Collection {...props} {...mocks} />).root
    const instance = root.instance

    test('isRelatedToCollection', () => {
      expect(instance.isRelatedToCollection()).toEqual(false)
    })

    describe('getRelatedTo scenarios', () => {
      test('related and relatedTo prop', () => {
        expect(instance.getRelatedTo()).toEqual(earth)
      })

      test('related and no relatedTo prop', () => {
        const root = TestRenderer.create(<Collection {...propsNoRelatedTo} {...mocks} />).root
        const instance = root.instance

        expect(instance.getRelatedTo()).toEqual(null)
      })
    })
  })
})
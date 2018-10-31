import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from '../../.storybook/stateDecorator'

import Planet from '../../.storybook/orbitStories/Planet'
import Planets from '../../.storybook/orbitStories/Planets'

const PLANET = {
  type: 'planet',
  id: undefined,
  attributes: {
    name: '',
    classification: '',
    atmosphere: true
  }
}

const jsonReplacer = function (key, val) {
  if (typeof val === 'function') {
    return 'function'
  }

  return val
};

const CenterField = (story) => (
  <div style={{
    width: 400,
    border: 1,
  }}>
    { story() }
  </div>
)

const Container = ({ children }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 1000
  }}>
    {children}
  </div>
)

const FindPlanet = ({ state, storeState }) => (
  <div>
    <label>Id prop:</label>
    <input style={{ marginLeft: 10 }} value={state.planetId || ''}
      onChange={(event) => storeState({
        planetId: event.target.value,
        beforeAddCalled: false,
        onAddCalled: false,
        beforeUpdateCalled: false,
        onUpdateCalled: false,
        beforeRemoveCalled: false,
        onRemoveCalled: false
      })} />
  </div>
)

const PlanetForm = ({ planet, state }) => (
  <div>
    <h3>Planet</h3>
    <form style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: 500
    }}>
      <label>Name:</label>
      <input value={planet.attributes.name}
        onChange={(event) => planet.setAttribute('name')(event.target.value)} />
      <label>Classification:</label>
      <input value={planet.attributes.classification}
        onChange={(event) => planet.setAttribute('classification')(event.target.value)} />
      <label>Atmosphere:</label>
      <input type='checkbox' value={planet.attributes.atmosphere}
        onChange={(event) => planet.setAttribute('atmosphere')(event.target.checked)} />
      <button onClick={event => {
        event.preventDefault()
        planet.save()
      }}>Save</button>
      <button onClick={event => {
        event.preventDefault()
        planet.remove()
      }}>Delete</button>
      <h3>Callbacks</h3>
      <div>
        {`beforeAdd called: ${state.beforeAddCalled}`}
      </div>
      <div>
        {`onAdd called: ${state.onAddCalled}`}
      </div>
      <div>
        {`beforeUpdate called: ${state.beforeUpdateCalled}`}
      </div>
      <div>
        {`onUpdate called: ${state.onUpdateCalled}`}
      </div>
      <div>
        {`beforeRemove called: ${state.beforeRemoveCalled}`}
      </div>
      <div>
        {`onRemove called: ${state.onRemoveCalled}`}
      </div>
    </form>
  </div>
)

const ActiveRecord = ({ planet }) => (
  <div>
    <h3>Active Record</h3>
    <pre>
      {JSON.stringify(planet, jsonReplacer, 2)}
    </pre>
  </div>
)

class AllPlanets extends PureComponent {
  render () {
    return (
      <div>
        <h3>All planet id's</h3>
        <Planets>
          {({ planets }) => (
            <ul>
              {planets.all().map(planet => <li key={planet.id}>{planet.id}</li>)}
            </ul>
          )}
        </Planets>
      </div>
    )
  }
}

const delayBeforeTransform = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve(true), 3000)
})

storiesOf('components|OrbitClient', module)
  .addDecorator(CenterField)
  .addDecorator(withState({
    planetId: undefined,
    beforeAddCalled: false,
    onAddCalled: false,
    beforeUpdateCalled: false,
    onUpdateCalled: false,
    beforeRemoveCalled: false,
    onRemoveCalled: false,
    sortOrder: 'ascending'
  }))
  .add('Single entity', ({ state, storeState }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <FindPlanet state={state} storeState={storeState} />
      <Planet id={state.planetId}
        buildRecord={() => PLANET}
        beforeAdd={() => {
          storeState({ beforeAddCalled: true })
          return delayBeforeTransform()
        }}
        onAdd={(record) => storeState({
          planetId: record.id,
          onAddCalled: true
        })}
        beforeUpdate={() => {
          storeState({ beforeUpdateCalled: true })
          return delayBeforeTransform()
        }}
        onUpdate={(record) => storeState({
          planetId: record.id,
          onUpdateCalled: true
        })}
        beforeRemove={() => {
          storeState({ beforeRemoveCalled: true })
          return delayBeforeTransform()
        }}
        onRemove={(record) => {
          storeState({
            planetId: record.id,
            onRemoveCalled: true
          })
          setTimeout(() => storeState({ planetId: undefined }), 2000)
        }}>
        {({ planet, loading, error }) => {
          if (error) return error.message
          if (loading) return 'Loading'
          return (
            <Container>
              <PlanetForm planet={planet} state={state} />
              <ActiveRecord planet={planet} />
              <AllPlanets />
            </Container>
          )
        }}
      </Planet>
    </div>
  ))
  .add('Multiple entities', ({ state, storeState }) => (
    <div>
      <h3>All planet id's</h3>
      <Planets sort={{ attribute: 'name', order: state.sortOrder }}>
        {({ planets, save, remove }) => (
          <div>
            <ul>
              {planets.all().map(planet => <li key={planet.id}>{planet.id}</li>)}
            </ul>
            <button onClick={() => save([
              { type: 'planet', id: 'mars', attributes: { name: 'Mars'} },
              { type: 'planet', id: 'exivity to the moon', attributes: { name: 'Rocket'}  },
              { type: 'planet', id: 'neptunus', attributes: { name: 'Neptunusr'} }
            ])}>Create records</button>
            <button onClick={() => remove(planets)}>Delete all records</button>
            <button onClick={() => {
              storeState({ sortOrder: state.sortOrder === 'ascending' ? 'descending' : 'ascending' })
            }}>
              {state.sortOrder}
            </button>
          </div>
        )}
      </Planets>
    </div>
  ))

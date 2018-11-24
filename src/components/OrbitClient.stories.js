import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from '../../.storybook/stateDecorator'
import Display from '../../.docz/docs/Display'

import Planet from '../../orbitStories/Planet'
import Planets from '../../orbitStories/Planets'
import Moons from '../../orbitStories/Moons'
import Sun from '../../orbitStories/Sun'

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

const getValue = (event) => event.target.value

const getChecked = (event) => event.target.checked

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
        onChange={planet.setAttribute('name', getValue)} />
      <label>Classification:</label>
      <input value={planet.attributes.classification}
        onChange={planet.setAttribute('classification', getValue)} />
      <label>Atmosphere:</label>
      <input type='checkbox' checked={planet.attributes.atmosphere}
        onChange={planet.setAttribute('atmosphere', getChecked)} />
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
    <Display name='planet' object={planet} />
  </div>
)

class AllPlanets extends PureComponent {
  render () {
    return (
      <div>
        <h3>All planet id's</h3>
        <Planets cache='only'>
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

class AllRelated extends PureComponent {
  render () {
    const { moons, sun } = this.props

    return (
      <div>
        <h3>Related moons</h3>
        <ul>
          {moons.all().map(moon => <li key={moon.id}>{moon.id}</li>)}
        </ul>
        <h3>Related sun</h3>
        <ul>
          <li key={sun && sun.id}>{sun && sun.id}</li>
        </ul>
      </div>
    )
  }
}

const delayBeforeTransform = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve(true), 3000)
})

storiesOf('components|orbit-client', module)
  .addDecorator(CenterField)
  .addDecorator(withState({
    planetId: 'earth',
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
        beforeAdd={() => {
          storeState({ beforeAddCalled: true })
          return delayBeforeTransform()
        }}
        onAdd={(record) => storeState({
          planetId: record.id,
          onAddCalled: true
        })}
        beforeUpdate={(prop) => {
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
        }} cache='only'>
        {({ planet, loading, error }) => {
          if (error) return error.message
          if (loading) return 'Loading'
          if (!planet) return 'no record found in cache'
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
  .add('Single entity with relations', ({ state, storeState }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <FindPlanet state={state} storeState={storeState} />
      <Planet id={state.planetId} cache='only'>
        <Moons related cache='only'>
          <Sun related cache='only'>
            {(props) => {
              const { planet, moons, sun, loading, error } = props
              if (error) return error.message
              if (loading) return 'Loading'
              if (!planet) return 'no record found in cache'
              return (
                <Container>
                  <PlanetForm planet={planet} state={state} />
                  <ActiveRecord planet={planet} />
                  <AllPlanets />
                  <AllRelated moons={moons} sun={sun} />
                </Container>
              )
            }}
          </Sun>
        </Moons>
      </Planet>
    </div>
  ))
  .add('Multiple entities', ({ state, storeState }) => (
    <div>
      <h3>All planet id's</h3>
      <Planets sort={{ attribute: 'name', order: state.sortOrder }} cache='only'>
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
            <button onClick={() => remove(planets.all())}>Delete all records</button>
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

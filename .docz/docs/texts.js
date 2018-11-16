export const schema = `{
  "schema": location of your orbitjs schema,
  "target": target directory for components
}`

export const crudProvider = `import { Context as Crud } from 'orbit-client'

const crud = {
  buildRecord: Function that only takes a models type and initializes a record,
  addRecord: Function to add record,
  updateRecord: Function to update record,
  removeRecord: Function to remove record,
}

const WithCrudProvider = ({ children }) => (
  <Crud.Provider value={crud}>
      <App>{children}</App>
  </Crud.Provider>
)

export default WithCrudProvider`


export const record = `import { Planet } from {targetDirectory}

<Planet id='earth'>
  {({ planet, loading, error }) => <Display object={{ planet, loading, error }} />  }
</Planet>
`

export const collection = `import { Planets } from {targetDirectory}

<Planets>
  {(client) => <Display object={client} /> }
</Planets>
`

export const stack = `import { Planet, Moons, Sun } from {targetDirectory}

<Planet id='earth'>
  <Moons>
    <Sun id='sun'>
      {({ planet, moons, sun, loading, error }) => (
        <div>
          <Display name='client' object={{ planet, moons, sun, loading, error }} />
          <Display name='allMoons' object={moons.all()} />
        </div>
      )}
    </Sun>
  </Moons>
</Planet>
`

export const relationships = `import { Planet, Moons, Sun } from {targetDirectory}

<Planet id='earth'>
  <Moons related>
    <Sun related>
      {({ planet, moons, sun, loading, error }) => (
        <div>
          <Display name='client' object={{ planet, moons, sun, loading, error }} />
          <Display name='allRelatedMoons' object={moons.all()} />
          <Display name='RelatedSun' object={sun} />
        </div>
      )}
    </Sun>
  </Moons>
</Planet>
`

export const composing = `import { Planet, Satellites, Sun } from {targetDirectory}

<Planet id='earth'>
  <Satellites>
    <Sun related>
      {({ planet, satellites, sun, loading, error }) => (
        <Satellites related relatedTo={sun}>
          {({ satellites: relatedSatellites, loading, error }) => (
            <div>
              <Display name='planet' object={planet} collapsed/>
              <Display name='allSatellites' object={satellites.all()} collapsed/>
              <Display name='relatedSun' object={sun} collapsed/>
              <Display name='satellitesRelatedToSun' object={relatedSatellites.all()} collapsed/>
            </div>
          )}
        </Satellites>
      )}
    </Sun>
  </Satellites>
</Planet>
`

export const recordFuncs = `// setAttribute is always a curried function
planet.setAttribute(attribute [, value])[(value)]

// setRelationship is always a curried function
planet.setRelationship(relation [, relationshipRecord('s)])[(value)]

// setProperty is always a curried function
// Example: planet.meta.history -> planet.setProperty(['meta', history], value)()
planet.setProperty(path [,value])[(value)]

// save is a function wrapped around provider add and update function
// additional args will be spread out after the record which is taken from internal state
planet.save(...args)

// remove is a function wrapped around provider remove function
// additional args will be spread out after the record which is taken from internal state
planet.remove(...args)
`

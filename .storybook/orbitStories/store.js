import Store from '@orbit/store'
import schema from './schema'

const store = new Store({
  schema
})

const sun = {
  type: 'sun',
  id: 'sun',
  attributes: {
    name: 'Sun',
    classification: 'Fusion giant'
  }
}

const jupiter = {
  type: 'planet',
  id: 'jupiter',
  attributes: {
    name: 'Jupiter',
    classification: 'gas giant',
    atmosphere: true
  }
}

const earth = {
  type: 'planet',
  id: 'earth',
  attributes: {
    name: 'Earth',
    classification: 'terrestrial',
    atmosphere: true
  },
  relationships: {
    sun: { data: { type: 'sun', id: 'sun' } }
  }
}

const venus = {
  type: 'planet',
  id: 'venus',
  attributes: {
    name: 'Venus',
    classification: 'terrestrial',
    atmosphere: true
  }
}

const io = {
  type: 'moon',
  id: 'io',
  attributes: {
    name: 'Io'
  },
  relationships: {
    planet: { data: { type: 'planet', id: 'jupiter' } }
  }
}

const europa = {
  type: 'moon',
  id: 'europa',
  attributes: {
    name: 'Europa'
  },
  relationships: {
    planet: { data: { type: 'planet', id: 'jupiter' } }
  }
}

const theMoon = {
  type: 'moon',
  id: 'theMoon',
  attributes: {
    name: 'The Moon'
  },
  relationships: {
    planet: { data: { type: 'planet', id: 'earth' } }
  }
}

store.update(t => [
  t.addRecord(sun),
  t.addRecord(jupiter),
  t.addRecord(earth),
  t.addRecord(venus),
  t.addRecord(io),
  t.addRecord(europa),
  t.addRecord(theMoon)
])

export default store

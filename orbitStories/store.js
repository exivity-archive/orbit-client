import Store from '@orbit/store'
import schema from './schema'

const store = new Store({
  schema
})

const theSun = {
  type: 'sun',
  id: 'theSun',
  attributes: {
    name: 'The Sun',
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
    sun: { data: { type: 'sun', id: 'theSun' } }
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

const deepImpact = {
  type: 'satellite',
  id: 'deepImpact',
  attributes: {
    name: 'Deep Impact',
    class: 'spacecraft'
  },
  relationships: {
    sun: { data: { type: 'sun', id: 'theSun' } }
  }
}

const kepler = {
  type: 'satellite',
  id: 'kepler',
  attributes: {
    name: 'Kepler',
    class: 'spacecraft'
  },
  relationships: {
    sun: { data: { type: 'sun', id: 'theSun' } }
  }
}

const artemis = {
  type: 'satellite',
  id: 'artemis',
  attributes: {
    name: 'ARTEMIS',
    class: 'spacecraft'
  },
  relationships: {
    moon: { data: { type: 'moon', id: 'theMoon' } }
  }
}

const juno = {
  type: 'satellite',
  id: 'juno',
  attributes: {
    name: 'Juno',
    class: 'spacecraft'
  },
  relationships: {
    planet: { data: { type: 'planet', id: 'jupiter' } }
  }
}

const galileo = {
  type: 'satellite',
  id: 'galileo',
  attributes: {
    name: 'Galileo',
    class: 'spacecraft'
  },
  relationships: {
    planet: { data: { type: 'planet', id: 'jupiter' } }
  }
}


store.update(t => [
  t.addRecord(theSun),
  t.addRecord(jupiter),
  t.addRecord(earth),
  t.addRecord(venus),
  t.addRecord(io),
  t.addRecord(europa),
  t.addRecord(theMoon),
  t.addRecord(deepImpact),
  t.addRecord(kepler),
  t.addRecord(artemis),
  t.addRecord(juno),
  t.addRecord(galileo)
])

export default store

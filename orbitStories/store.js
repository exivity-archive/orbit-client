import Store from '@orbit/store'
import schema from './schema'

const store = new Store({
  schema
})

export const theSun = {
  type: 'sun',
  id: 'theSun',
  attributes: {
    name: 'The Sun',
    classification: 'Fusion giant'
  }
}

export const jupiter = {
  type: 'planet',
  id: 'jupiter',
  attributes: {
    name: 'Jupiter',
    classification: 'gas giant',
    atmosphere: true
  }
}

export const earth = {
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

export const venus = {
  type: 'planet',
  id: 'venus',
  attributes: {
    name: 'Venus',
    classification: 'terrestrial',
    atmosphere: true
  }
}

export const io = {
  type: 'moon',
  id: 'io',
  attributes: {
    name: 'Io'
  },
  relationships: {
    planet: { data: { type: 'planet', id: 'jupiter' } }
  }
}

export const europa = {
  type: 'moon',
  id: 'europa',
  attributes: {
    name: 'Europa'
  },
  relationships: {
    planet: { data: { type: 'planet', id: 'jupiter' } }
  }
}

export const undiscoveredMoon = {
  type: 'moon',
  id: 'undiscoveredMoon',
  attributes: {
    name: 'Undiscovered Moon'
  }
}

export const theMoon = {
  type: 'moon',
  id: 'theMoon',
  attributes: {
    name: 'The Moon'
  },
  relationships: {
    planet: { data: { type: 'planet', id: 'earth' } }
  }
}

export const deepImpact = {
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

export const kepler = {
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

export const artemis = {
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

export const juno = {
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

export const galileo = {
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
  t.addRecord(undiscoveredMoon),
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

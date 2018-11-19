import React from 'react'
import { DataProvider } from 'react-orbitjs'
import dataStore from '../../orbitStories/store'
import CrudContext from '../../src/components/Provider'

const addRecord = (record) => dataStore.update(t => t.addRecord(record))
const updateRecord = (record) => dataStore.update(t => t.replaceRecord(record))
const removeRecord = (record) => dataStore.update(t => t.removeRecord(record))

const crud = {
  buildRecord: (type) => PLANET(type),
  addRecord,
  updateRecord,
  removeRecord,
  performTransforms: (transforms) => dataStore.update(transforms),
}

const Wrapper = ({ children }) => (
  <CrudContext.Provider value={crud}>
    <DataProvider dataStore={dataStore}>
      { children }
    </DataProvider>
  </CrudContext.Provider>
)

export default Wrapper

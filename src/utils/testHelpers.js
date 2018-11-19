// import * as storeAndRecords from '../../orbitStories/store'
//
// const { store, ...records } = storeAndRecords
//
// const allRecords = [...records]

const transform = function (record) {
  return new Promise((resolve, reject) => {
    resolve(jest.fn(record))
  })
}

const context = {
  buildRecord: (type) => jest.fn(type),
  addRecord: (record) => transform(record),
  updateRecord: jest.fn(),
  removeRecord: (record) => transform({ type: record.type, id: record.id }),
}

export default context

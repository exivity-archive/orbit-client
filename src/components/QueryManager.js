import EventEmitter from './EventEmitter'

export default class QueryManager extends EventEmitter {
  constructor ({ schema, store }) {
    super()

    if (!QueryManager.instance) {
      this._queryStatus = new Map()
      this._schema = schema
      this._store = store

      this._queryOperations = {
        findRecord: (record) => QueryManager.createKey(...record),
        findRecords: (collection) => QueryManager.createKey(collection),
        findRelatedRecord: (record, relation) => QueryManager.createKey(...record, relation),
        findRelatedRecords: (record, relations) => QueryManager.createKey(...record, relations)
      }

      QueryManager.instance = this
    }

    return QueryManager.instance
  }

  static createKey (...args) {
    return args.join('-')
  }

  manager () {
    // setter
    // getter
  }

  query (query) {
    const key = this.analyseQuery(query)

    this._store.query(query)
      .then(() => this.setQueryStatus(key, { loading: false, error: false }))
      .catch((error) => this.setQueryStatus(key, { loading: false, error }))
  }

  analyseQuery (query, operations = this._queryOperations) {
    query(operations)
  }

  setQueryStatus (key, queryStatus) {
    this._queryStatus.set(key, queryStatus)
  }
}
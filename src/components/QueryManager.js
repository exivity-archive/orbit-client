class QueryManager {
  constructor(){
    if (!QueryManager.instance) {
      this._data = []
      QueryManager.instance = this
    }

    return QueryManager.instance
  }

  //rest is the same code as preceding example

}

const instance = new QueryManager()
Object.freeze(instance)

export default instance
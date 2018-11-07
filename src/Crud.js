import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Crud extends PureComponent {
  build = (...args) => {
    const { buildRecord } = this.props
    return buildRecord(...args)
  }

  add = async (...args) => {
    const { beforeAdd, addRecord, onAdd, onError } = this.props

    if (beforeAdd) {
      const proceed = await beforeAdd(...args)
      const fnArgs = proceed === true ? args : proceed

      if (proceed) addRecord(...fnArgs).then(onAdd).catch(onError)
    } else {
      addRecord(...args).then(onAdd).catch(onError)
    }
  }

  update = async (...args) => {
    const { beforeUpdate, updateRecord, onUpdate, onError } = this.props

    if (beforeUpdate) {
      const proceed = await beforeUpdate(...args)
      const fnArgs = proceed === true ? args : proceed

      if (proceed) updateRecord(...fnArgs).then(onUpdate).catch(onError)
    } else {
      updateRecord(...args).then(onUpdate).catch(onError)
    }
  }

  remove = async (...args) => {
    const { beforeRemove, removeRecord, onRemove, onError } = this.props

    if (beforeRemove) {
      const proceed = await beforeRemove(...args)
      const fnArgs = proceed === true ? args : proceed

      if (proceed) removeRecord(...fnArgs).then(onRemove).catch(onError)
    } else {
      removeRecord(...args).then(onRemove).catch(onError)
    }
  }

  render () {
    const handlers = {
      build: this.build,
      add: this.add,
      update: this.update,
      remove: this.remove
    }

    return this.props.children(handlers)
  }
}

Crud.propTypes = {
  /**  Callback with build, add, update, remove promises. */
  children: PropTypes.func.isRequired,
  /** Function to build objectType. */
  buildRecord: PropTypes.func,
  /** Function to add record. */
  addRecord: PropTypes.func,
  /** Function to update record. */
  updateRecord: PropTypes.func,
  /** Function to remove record. */
  removeRecord: PropTypes.func,
  /** Callback called when add() resolves. Provides added record. */
  onAdd: PropTypes.func,
  /** Callback called when update() resolves. Provides updated record. */
  onUpdate: PropTypes.func,
  /** Callback called when remove() resolves. Provides removed record. */
  onRemove: PropTypes.func,
  /** Callback called before add(). Takes a promise or function.
   Return truthy value to proceed with add() */
  beforeAdd: PropTypes.func,
  /** Callback called before update(). Takes a promise or function.
   Return truthy value to proceed with update() */
  beforeUpdate: PropTypes.func,
  /** Callback called before remove(). Takes a promise or function.
   Return truthy value to proceed with remove() */
  beforeRemove: PropTypes.func,
  /** Callback called when one of crud function catches */
  onError: PropTypes.func,
}

Crud.defaultProps = {
  buildRecord: () => {},
  addRecord: () => {},
  updateRecord: () => {},
  removeRecord: () => {},
  onAdd: () => {},
  onUpdate: () => {},
  onRemove: () => {},
  onError: () => {}
}

export default Crud

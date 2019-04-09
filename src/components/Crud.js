import { PureComponent } from 'react'
import PropTypes from 'prop-types'


class Crud extends PureComponent {
  build = (type) => {
    const { buildRecord } = this.props
    return buildRecord(type)
  }

  isRecord = (record) => record && record.hasOwnProperty('type')

  add = async (record, options) => {
    const { beforeAdd, addRecord, onAdd, onError, extensions } = this.props

    if (beforeAdd) {
      const proceed = await beforeAdd(record, extensions)
      const newRecord = this.isRecord(proceed) ? proceed : record

      if (proceed) addRecord(newRecord, options)
        .then((record) => onAdd(record, extensions))
        .catch((error) => onError(error, extensions))
    } else {
      addRecord(record, options)
        .then((record) => onAdd(record, extensions))
        .catch((error) => onError(error, extensions))
    }
  }

  update = async (record, options) => {
    const { beforeUpdate, updateRecord, onUpdate, onError, extensions } = this.props

    if (beforeUpdate) {
      const proceed = await beforeUpdate(record, extensions)
      const newRecord = this.isRecord(proceed) ? proceed : record

      if (proceed) updateRecord(newRecord, options)
        .then((record) => onUpdate(record, extensions))
        .catch((error) => onError(error, extensions))
    } else {
      updateRecord(record, options)
        .then((record) => onUpdate(record, extensions))
        .catch((error) => onError(error, extensions))
    }
  }

  remove = async (record, options) => {
    const { beforeRemove, removeRecord, onRemove, onError, extensions } = this.props

    if (beforeRemove) {
      const proceed = await beforeRemove(record, extensions)
      const newRecord = this.isRecord(proceed) ? proceed : record

      if (proceed) removeRecord(newRecord, options)
        .then((record) => onRemove(record, extensions))
        .catch((error) => onError(error, extensions))
    } else {
      removeRecord(record, options)
        .then((record) => onRemove(record, extensions))
        .catch((error) => onError(error, extensions))
    }
  }

  state = {
    buildRecord: this.build,
    addRecord: this.add,
    updateRecord: this.update,
    removeRecord: this.remove
  }

  render () {
    return this.props.children(this.state)
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
  /** Extensions which are provided with all callbacks */
  extensions: PropTypes.object,
}

Crud.defaultProps = {
  buildRecord: () => {},
  addRecord: () => {},
  updateRecord: () => {},
  removeRecord: () => {},
  onAdd: () => {},
  onUpdate: () => {},
  onRemove: () => {},
  onError: () => {},
  extensions: {}
}

export default Crud

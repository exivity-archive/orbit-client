import { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Crud extends PureComponent {
  build = (...args) => {
    const { buildRecord } = this.props
    return buildRecord(...args)
  }

  add = async (...args) => {
    const { beforeAdd, addRecord, onAdd } = this.props
    const proceed = await beforeAdd()

    if (proceed) addRecord(...args).then(onAdd)
  }

  update = async (...args) => {
    const { beforeUpdate, updateRecord, onUpdate } = this.props
    const proceed = await beforeUpdate()

    if (proceed) updateRecord(...args).then(onUpdate)
  }

  remove = async (...args) => {
    const { beforeRemove, removeRecord, onRemove } = this.props
    const proceed = await beforeRemove()

    if (proceed) removeRecord(...args).then(() => onRemove(...args))
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
  beforeRemove: PropTypes.func
}

Crud.defaultProps = {
  buildRecord: () => {},
  addRecord: () => {},
  updateRecord: () => {},
  removeRecord: () => {},
  onAdd: () => {},
  onUpdate: () => {},
  onRemove: () => {},
  beforeAdd: () => true,
  beforeUpdate: () => true,
  beforeRemove: () => true
}

export default Crud

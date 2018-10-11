import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export const withState = (WrappedComponent) => {
  class StateWrapper extends PureComponent {
    constructor (props) {
      super(props)

      this.state = {
        recordReference: props.record,
        record: props.record || props.buildRecord(props.type)
      }
    }

    static getDerivedStateFromProps (props, state) {
      if (props.record !== state.recordReference) {
        return {
          recordReference: props.record,
          record: props.record
        }
      }

      return null
    }

    onAdd = (record) => {
      this.recordToState(record)
      this.props.onAdd(record)
    }

    onUpdate = (record) => {
      this.recordToState(record)
      this.props.onUpdate(record)
    }

    recordToState = (record) => this.setState({ record })

    setAttribute = (attribute) => (value) => {
      this.setState(({ record }) => ({
        record: {
          ...record,
          attributes: {
            ...record.attributes,
            [attribute]: value
          }
        }
      }))
    }

    setRelationship = (relationship) => (value) => {
      this.setState(({ record }) => ({
        record: {
          ...record,
          relationships: {
            ...record.relationships,
            [relationship]: {
              data: value
            }
          }
        }
      }))
    }

    render () {
      const { record } = this.state

      const stateHandlers = {
        [record.type]: record,
        setAttribute: this.setAttribute,
        setRelationship: this.setRelationship
      }

      return (
        <WrappedComponent {...this.props}
          onAdd={this.onAdd}
          onUpdate={this.onUpdate}>
          {(handlers) => this.props.children({
            ...handlers,
            add: (...args) => handlers.add(record, ...args),
            update: (...args) => handlers.update(record, ...args),
            remove: (...args) => handlers.remove(record, ...args),
            ...stateHandlers
          })}
        </WrappedComponent>
      )
    }
  }

  StateWrapper.propTypes = {
    record: PropTypes.object,
    type: PropTypes.string,
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    onRemove: PropTypes.func
  }

  StateWrapper.defaultProps = {
    onAdd: () => {},
    onUpdate: () => {},
    onRemove: () => {}
  }

  return StateWrapper
}

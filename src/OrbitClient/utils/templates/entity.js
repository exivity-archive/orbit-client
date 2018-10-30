import React, { PureComponent } from 'react'
import { withData } from 'react-orbitjs'

import Crud from '../../Crud'
import { withCrudConsumer } from '../crudConsumer'

class _Entity extends PureComponent {
  constructor (props) {
    super(props)

    const recordNotFoundInCache = props.id && !props._entity

    this.state = {
      idReference: props.id,
      recordReference: props._entity,
      _entity: props._entity || props.buildRecord('_entity'),
      loading: recordNotFoundInCache,
      error: false
    }
  }

  static getDerivedStateFromProps (props, state) {
    const newIdProp = !!props.id && props.id !== state.idReference
    const buildRecord = !props.id && props.id !== state.idReference
    const newRecord = !!props._entity && (props._entity !== state.recordReference)
    const recordNotFoundInCache = props.id && !props._entity

    if (buildRecord) {
      const _entity = props.buildRecord('_entity')

      return {
        idReference: props.id,
        recordReference: _entity,
        _entity,
        loading: false,
        error: false
      }
    }

    if (newIdProp) {
      if (recordNotFoundInCache) {
        return {
          idReference: props.id,
          recordReference: null,
          _entity: null,
          loading: true,
          error: false
        }
      }

      return {
        idReference: props.id,
        recordReference: props._entity,
        _entity: props._entity,
        loading: false,
        error: false
      }
    }

    if (newRecord) {
      return {
        idReference: props.id,
        recordReference: props._entity,
        _entity: props._entity,
        loading: false,
        error: false
      }
    }

    return null
  }

  componentDidMount () {
    const { loading } = this.state

    if (loading) {
      this.queryStoreById(this.props.id)
    }
  }

  componentDidUpdate () {
    const { loading } = this.state

    if (loading) {
      this.queryStoreById(this.props.id)
    }
  }

  queryStoreById = async (id) => {
    try {
      await this.props.queryStore(q => q.findRecord({ type: '_entity', id }))
      this.setState({ loading: false })
    } catch (error) {
      this.setState({
        loading: false,
        error
      })
    }
  }

  setAttribute = (attribute) => (value) => {
    this.setState(({ _entity }) => ({
      _entity: {
      ..._entity,
      attributes: {
        ..._entity.attributes,
        [attribute]: value
      }
    }
  }))}

  setRelationship = (relationship) => (value) => {
    this.setState(({ _entity }) => ({
      _entity: {
        ..._entity,
        relationships: {
          ..._entity.relationships,
          [relationship]: {
            data: value
          }
        }
      }
    }))
  }

  onRemove = (...args) => {
    const { onRemove } = this.props

    this.setState({
      recordReference: null,
      _entity: null,
      error: {
        message: 'Record has been removed'
      }
    })

    onRemove && onRemove(...args)
  }

  render () {
    const { _entity, loading, error } = this.state

    return (
      <Crud {...this.props} onRemove={this.onRemove}>
        {({ build, add, update, remove }) => this.props.children({
          loading,
          error,
          _entity: _entity
            ?  {
              ..._entity,
              setAttribute: this.setAttribute,
              setRelationship: this.setRelationship,
              save: _entity && !_entity.id
                ? (...args) => add(_entity, ...args)
                : (...args) => update(_entity, ...args),
              remove: (...args) => remove(_entity, ...args),
            }
            : null
        })}
      </Crud>
    )
  }
}

const mapRecordsToProps = (ownProps) => {
  if (ownProps.id) {
    return { _entity: q => q.findRecord({ type: '_entity', id: ownProps.id }) }
  }

  return {}
}

const WithConsumer = withCrudConsumer(_Entity)

export default withData(mapRecordsToProps)(WithConsumer)
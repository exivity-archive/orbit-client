import React, { PureComponent } from 'react'
import { withData } from 'react-orbitjs'

import Crud from '../../src/Crud/index'
import { withCrudConsumer } from '../../src/OrbitClient/crudConsumer'

class Planet extends PureComponent {
  constructor (props) {
    super(props)

    const recordNotFoundInCache = props.id && !props.planet

    this.state = {
      idReference: props.id,
      recordReference: props.planet,
      planet: props.planet || props.buildRecord('planet'),
      loading: recordNotFoundInCache,
      error: false
    }
  }

  static getDerivedStateFromProps (props, state) {
    const newIdProp = !!props.id && props.id !== state.idReference
    const buildRecord = !props.id && props.id !== state.idReference
    const newRecord = !!props.planet && (props.planet !== state.recordReference)
    const recordNotFoundInCache = props.id && !props.planet

    if (buildRecord) {
      const planet = props.buildRecord('planet')

      return {
        idReference: props.id,
        recordReference: planet,
        planet,
        loading: false,
        error: false
      }
    }

    if (newIdProp) {
      if (recordNotFoundInCache) {
        return {
          idReference: props.id,
          recordReference: null,
          planet: null,
          loading: true,
          error: false
        }
      }

      return {
        idReference: props.id,
        recordReference: props.planet,
        planet: props.planet,
        loading: false,
        error: false
      }
    }

    if (newRecord) {
      return {
        idReference: props.id,
        recordReference: props.planet,
        planet: props.planet,
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
      await this.props.queryStore(q => q.findRecord({ type: 'planet', id }))
      this.setState({ loading: false })
    } catch (error) {
      this.setState({
        loading: false,
        error
      })
    }
  }

  setAttribute = (attribute) => (value) => {
    this.setState(({ planet }) => ({
      planet: {
      ...planet,
      attributes: {
        ...planet.attributes,
        [attribute]: value
      }
    }
  }))}

  setRelationship = (relationship) => (value) => {
    this.setState(({ planet }) => ({
      planet: {
        ...planet,
        relationships: {
          ...planet.relationships,
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
      planet: null,
      error: {
        message: 'Record has been removed'
      }
    })

    onRemove && onRemove(...args)
  }

  render () {
    const { planet, loading, error } = this.state

    return (
      <Crud {...this.props} onRemove={this.onRemove}>
        {({ build, add, update, remove }) => this.props.children({
          loading,
          error,
          planet: planet
            ?  {
              ...planet,
              setAttribute: this.setAttribute,
              setRelationship: this.setRelationship,
              save: planet && !planet.id
                ? (...args) => add(planet, ...args)
                : (...args) => update(planet, ...args),
              remove: (...args) => remove(planet, ...args),
            }
            : null
        })}
      </Crud>
    )
  }
}

const mapRecordsToProps = (ownProps) => {
  if (ownProps.id) {
    return { planet: q => q.findRecord({ type: 'planet', id: ownProps.id }) }
  }

  return {}
}

const WithConsumer = withCrudConsumer(Planet)

export default withData(mapRecordsToProps)(WithConsumer)
import React, { PureComponent } from 'react'
import { withData } from 'react-orbitjs'

import Crud from '../../src/Crud/index'
import { withCrudConsumer } from '../../src/OrbitClient/crudConsumer'

class Moon extends PureComponent {
  constructor (props) {
    super(props)

    const recordNotFoundInCache = props.id && !props.moon

    this.state = {
      idReference: props.id,
      recordReference: props.moon,
      moon: props.moon || props.buildRecord('moon'),
      loading: recordNotFoundInCache,
      error: false
    }
  }

  static getDerivedStateFromProps (props, state) {
    const newIdProp = !!props.id && props.id !== state.idReference
    const buildRecord = !props.id && props.id !== state.idReference
    const newRecord = !!props.moon && (props.moon !== state.recordReference)
    const recordNotFoundInCache = props.id && !props.moon

    if (buildRecord) {
      const moon = props.buildRecord('moon')

      return {
        idReference: props.id,
        recordReference: moon,
        moon,
        loading: false,
        error: false
      }
    }

    if (newIdProp) {
      if (recordNotFoundInCache) {
        return {
          idReference: props.id,
          recordReference: null,
          moon: null,
          loading: true,
          error: false
        }
      }

      return {
        idReference: props.id,
        recordReference: props.moon,
        moon: props.moon,
        loading: false,
        error: false
      }
    }

    if (newRecord) {
      return {
        idReference: props.id,
        recordReference: props.moon,
        moon: props.moon,
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
      await this.props.queryStore(q => q.findRecord({ type: 'moon', id }))
      this.setState({ loading: false })
    } catch (error) {
      this.setState({
        loading: false,
        error
      })
    }
  }

  setAttribute = (attribute) => (value) => {
    this.setState(({ moon }) => ({
      moon: {
      ...moon,
      attributes: {
        ...moon.attributes,
        [attribute]: value
      }
    }
  }))}

  setRelationship = (relationship) => (value) => {
    this.setState(({ moon }) => ({
      moon: {
        ...moon,
        relationships: {
          ...moon.relationships,
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
      moon: null,
      error: {
        message: 'Record has been removed'
      }
    })

    onRemove && onRemove(...args)
  }

  render () {
    const { moon, loading, error } = this.state

    return (
      <Crud {...this.props} onRemove={this.onRemove}>
        {({ build, add, update, remove }) => this.props.children({
          loading,
          error,
          moon: moon
            ?  {
              ...moon,
              setAttribute: this.setAttribute,
              setRelationship: this.setRelationship,
              save: moon && !moon.id
                ? (...args) => add(moon, ...args)
                : (...args) => update(moon, ...args),
              remove: (...args) => remove(moon, ...args),
            }
            : null
        })}
      </Crud>
    )
  }
}

const mapRecordsToProps = (ownProps) => {
  if (ownProps.id) {
    return { moon: q => q.findRecord({ type: 'moon', id: ownProps.id }) }
  }

  return {}
}

const WithConsumer = withCrudConsumer(Moon)

export default withData(mapRecordsToProps)(WithConsumer)
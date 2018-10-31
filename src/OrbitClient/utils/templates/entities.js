import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withData } from 'react-orbitjs'

import { CrudContext } from '../CrudProvider'
import { decorateQuery } from '../utils/decorateQuery'

class _Entities extends PureComponent {
  constructor (props) {
    super (props)

    this.state = {
      loading: false
    }
  }

  componentDidMount () {
    const { _entities } = this.props

    if (!_entities.length) {
      this.setState({
        loading: true,
      }, this.queryStore)
    }
  }

  findOne = (id) => {
    const { _entities } = this.props

    return _entities.find(item => item.id === id)
  }

  find = (ids) => {
    const { _entities } = this.props

    return ids.map(id =>  _entities.find(item => item.id === id))
  }

  findByAttribute = ({ attribute, value }) => {
    const { _entities } = this.props

    return _entities.filter(item => item.attributes[attribute] === value)
  }

  buildSaveTransforms = (records) => (t) => records.map((record) => {
    if (record.id) {
      return t.replaceRecord(record)
    }
     return t.addRecord(record)
  })

  buildRemoveTransforms = (records) => (t) => records.map((record) => {
    return t.removeRecord(record)
  })

  queryStore = async () => {
    try {
      await this.props.queryStore(q => q.findRecords('_entity'))
      this.setState({ loading: false })
    } catch (error) {
      this.setState({
        loading: false
      })
    }
  }

  render () {
    const { _entities } = this.props
    const { loading } = this.state

    return (
      <CrudContext.Consumer>
        {({ performTransforms }) => this.props.children({
          _entities: {
            findOne: this.findOne,
            find: this.find,
            findByAttribute: this.findByAttribute,
            all: () => _entities
          },
          loading,
          save: (records) => performTransforms(this.buildSaveTransforms(records)),
          remove: (records) => performTransforms(this.buildRemoveTransforms(records))
        })}
      </CrudContext.Consumer>
      )
  }
}

const mapRecordsToProps = ({ sort, filter, page }) => {
  return ({
    _entities: decorateQuery(q => q.findRecords('_entity'), { sort, filter, page }),
  })
}

export default withData(mapRecordsToProps)(_Entities)

_Entities.propTypes = {
  sort: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  filter: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  page: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
}
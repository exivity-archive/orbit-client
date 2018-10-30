import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withData } from 'react-orbitjs'

import { CrudContext } from '../CrudProvider'
import { decorateQuery } from '../utils/decorateQuery'

class Planets extends PureComponent {
  componentDidMount () {
    const { planets } = this.props

    if (!planets.length) {
      this.setState({
        loading: true,
      }, this.queryStore)
    }
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
      await this.props.queryStore(q => q.findRecords('planet'))
      this.setState({ loading: false })
    } catch (error) {
      this.setState({
        loading: false
      })
    }
  }

  render () {
    const { planets } = this.props

    return (
      <CrudContext.Consumer>
        {({ performTransforms }) => this.props.children({
          planets,
          save: (records) => performTransforms(this.buildSaveTransforms(records)),
          remove: (records) => performTransforms(this.buildRemoveTransforms(records))
        })}
      </CrudContext.Consumer>
      )
  }
}

const mapRecordsToProps = ({ sort, filter, page }) => {
  return ({
    planets: decorateQuery(q => q.findRecords('planet'), { sort, filter, page }),
  })
}

export default withData(mapRecordsToProps)(Planets)

Planets.propTypes = {
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
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withData } from 'react-orbitjs'

import { CrudContext } from '../CrudProvider'
import { decorateQuery } from '../utils/decorateQuery'

class Moons extends PureComponent {
  componentDidMount () {
    const { moons } = this.props

    if (!moons.length) {
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
      await this.props.queryStore(q => q.findRecords('moon'))
      this.setState({ loading: false })
    } catch (error) {
      this.setState({
        loading: false
      })
    }
  }

  render () {
    const { moons } = this.props

    return (
      <CrudContext.Consumer>
        {({ performTransforms }) => this.props.children({
          moons,
          save: (records) => performTransforms(this.buildSaveTransforms(records)),
          remove: (records) => performTransforms(this.buildRemoveTransforms(records))
        })}
      </CrudContext.Consumer>
      )
  }
}

const mapRecordsToProps = ({ sort, filter, page }) => {
  return ({
    moons: decorateQuery(q => q.findRecords('moon'), { sort, filter, page }),
  })
}

export default withData(mapRecordsToProps)(Moons)

Moons.propTypes = {
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
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

class StateContainer extends PureComponent {
  constructor (props) {
    super(props)

    this.state = props.store
  }

  storeState = (value) => {
    this.setState(value)
  }

  render () {
    return this.props.children(this.state, this.storeState)
  }
}

export default StateContainer

StateContainer.propTypes = {
  children: PropTypes.func
}

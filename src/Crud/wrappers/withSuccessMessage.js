import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { showSuccessMessage } from '../../../../actions/work'

export const withSuccessMessage = (WrappedComponent) => {
  class SuccessMessageWrapper extends PureComponent {
    niceName = (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

    handleOnAdd = (item) => {
      const { dispatch } = this.props

      dispatch(showSuccessMessage(`${this.niceName(item.type)} created.`))
      this.props.onAdd(item)
    }

    handleOnUpdate = (item) => {
      const { dispatch } = this.props

      dispatch(showSuccessMessage(`${this.niceName(item.type)} updated.`))
      this.props.onUpdate(item)
    }

    handleOnRemove = (item) => {
      const { dispatch } = this.props

      dispatch(showSuccessMessage(`${this.niceName(item.type)} deleted.`))
      this.props.onRemove(item)
    }

    render () {
      return (
        <WrappedComponent {...this.props}
          onAdd={this.handleOnAdd}
          onUpdate={this.handleOnUpdate}
          onRemove={this.handleOnRemove}>
          {(handlers) => this.props.children(handlers)}
        </WrappedComponent>
      )
    }
  }

  SuccessMessageWrapper.defaultProps = {
    onAdd: () => {},
    onUpdate: () => {},
    onRemove: () => {}
  }

  return connect()(SuccessMessageWrapper)
}

import React, { PureComponent } from 'react'
import { withData } from 'react-orbitjs'

export const withOrbitData = (WrappedComponent) => {
  class WithOrbitDataWrapper extends PureComponent {
    render () {
      if (this.props.query) {
        const queryKeys = Object.keys(this.props.query)
        const queryHandlers = queryKeys.reduce((handlers, query) => {
          handlers[query] = this.props[query]
          return handlers
        }, {})

        return (
          <WrappedComponent {...this.props} key={this.props.id}>
            {(handlers) => this.props.children({
              ...handlers,
              ...queryHandlers
            })}
          </WrappedComponent>
        )
      }

      return (
        <WrappedComponent {...this.props}>
          {(handlers) => this.props.children(handlers)}
        </WrappedComponent>
      )
    }
  }

  const mapRecordsToProps = (ownProps) => {
    // @ToDo React-orbit only takes a function.
    if (ownProps.query) {
      return ownProps.query
    }

    if (ownProps.id) {
      return { record: q => q.findRecord({ type: ownProps.type, id: ownProps.id }) }
    }

    return {}
  }

  return withData(mapRecordsToProps)(WithOrbitDataWrapper)
}

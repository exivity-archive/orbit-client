import React, { Component } from 'react'
import Prism from 'prismjs'
import './prism.css'

class Preview extends Component {
  componentDidMount() {
    Prism.highlightAll()
  }

  render () {
    return (
      <pre>
        <code className="language-javascript">
          {`
            <Planet id='earth'>
              {({ planet, loading, error }) => <Display name='client' object={{ planet, loading, error }} />}
            </Planet>
          `}
        </code>
      </pre>
    )
  }
}

export default Preview

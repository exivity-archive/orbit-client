import React, { Component } from 'react'
import Prism from 'prismjs'
import './prism.css'

const text =
`<Planet id='earth'>
  {({ planet, loading, error }) => (
    <Display name='client' object={{ planet, loading, error }} />
  )}
</Planet>`


class Preview extends Component {
  componentDidMount() {
    Prism.highlightAllUnder(document.querySelector('.language-javascript'))
  }

  render () {
    return (
      <pre className="language-javscript">
        <code id='main' className="language-javascript">
          {this.props.children}
        </code>
      </pre>
    )
  }
}

export default Preview

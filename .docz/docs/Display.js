import React from 'react'
import ReactJson from 'react-json-view'

const Display = ({ object }) => (
  <ReactJson name={object.type} src={object}
    shouldCollapse={(field) => {
        return ['attributes', 'relationships'].includes(field.name)}
    }/>
)

export default Display

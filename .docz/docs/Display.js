import React from 'react'
import ReactJson from 'react-json-view'

const Display = ({ name, object, collapsed }) => (
  <ReactJson name={name || object.type} src={object} collapsed={collapsed}
    shouldCollapse={(field) => {
        return [name !== 'planet' && 'planet', 'attributes', 'relationships', '0' , '1' , '2'].includes(field.name)}
    }/>
)

export default Display

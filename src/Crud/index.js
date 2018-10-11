import Crud from './Basic.js'
import {
  withOrbit,
  withOrbitData,
  withState,
  withSuccessMessage,
  withSchemaValidation
} from './wrappers'

const Default = withSuccessMessage(withOrbit(Crud))
const Standard = withOrbit(withOrbitData(withState(withSchemaValidation(Default))))

export {
  Default,
  Standard,
  withOrbit,
  withOrbitData,
  withState,
  withSuccessMessage
}

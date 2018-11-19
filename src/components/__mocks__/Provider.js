import context from '../../utils/testHelpers'

export const MyContext = ({
  Consumer (props) {
    return props.children(context)
  }
})

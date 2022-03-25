import PropTypes from 'prop-types'

import View from './View'
import Label from './Label'

const Checkbox = ({ children, id, value, onChange, ...viewProps }) => (
  <View display="flex" alignItems="center" {...viewProps}>
    <input id={id} value={value} onChange={onChange} type="checkbox"></input>
    <Label ml="5px" htmlFor={id}>
      {children}
    </Label>
  </View>
)

Checkbox.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
}

export default Checkbox

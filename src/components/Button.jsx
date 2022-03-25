import styled from 'styled-components'
import { color, space, layout, border, variant } from 'styled-system'

const buttonVariants = () =>
  variant({
    variants: {
      primary: {
        color: 'white',
        bg: '#2B4EE8'
      }
    }
  })

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #eeeeee;
  margin-right: 25px;
  color: #949494;
  border-radius: 5px;

  ${buttonVariants}
  ${color}
  ${space}
  ${layout}
  ${border}
`

export default Button

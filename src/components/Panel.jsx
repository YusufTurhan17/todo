import styled from 'styled-components'
import { grid, space, variant, color } from 'styled-system'

const panelVariants = () =>
  variant({
    variants: {
      primary: {
        border: '1px solid #2B4EE8'
      }
    }
  })

const Panel = styled.div`
  border: 1px solid #ddd;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);

  ${panelVariants}
  ${grid}
    ${space}
`

const PanelBody = styled.div`
  padding: 20px;
`

const PanelHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 15px;
  }

  ${color}
`

const PanelFooter = styled.div`
  display: flex;
  padding: 20px;
`
const PanelEmptyState = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 150px;
  justify-content: center;
`

Panel.Body = PanelBody
Panel.Header = PanelHeader
Panel.Footer = PanelFooter
Panel.EmptyState = PanelEmptyState

Panel.displayName = 'Panel'

export default Panel

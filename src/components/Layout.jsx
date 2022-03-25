import styled from 'styled-components'

const Layout = styled.div`
  display: grid;
  grid-template-areas: 'header header' 'products categories' 'review categories';
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

export default Layout

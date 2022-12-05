import styled from 'styled-components'

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: normal;
  color: ${({theme}) => theme.colors.white};
`

export type TablePropsTypes = {
    textAlign?: 'left' | 'right'
}

export const THead = styled.thead<TablePropsTypes>`
  height: 3rem;
  font-size: ${({theme}) => theme.fonts.sizes.little};
  text-align: ${({textAlign}) => textAlign ?? 'left'};
  
  @media (${({theme}) => theme.media.phone}) {
    &{
      font-size: ${({theme}) => theme.fonts.sizes.default};
      height: 5rem;
    }
  }
`

export const TFoot = styled.tfoot`
`

export const TBody = styled.tbody`
    
`

export const TR = styled.tr`
  border-bottom: 1px solid #33373f;
  line-height: 2rem;
  
  @media (${({theme}) => theme.media.phone}) {
    line-height: 2rem;
  }

  @media (${({theme}) => theme.media.computer}) {
    &:hover {
      background: ${({theme}) => theme.colors.hoverGrey};
    }

`

export const TH = styled.th<TablePropsTypes>`
  text-align: ${({textAlign}) => textAlign};
  padding: 0.5rem 1rem;
  
  &:nth-child(2) {
    padding-left: 4.2rem;
  }

  &:nth-child(1) {
    width: 7%;
  }

  @media (${({theme}) => theme.media.phone}) {
    &:nth-child(1){
      max-width: 50px;
    }
  }
`

export const TD = styled.td<TablePropsTypes>`
  text-align: ${({textAlign}) => textAlign};
  padding: 0.5rem 1rem;

  @media (${({theme}) => theme.media.tablet}) {
    &:nth-child(2) {
      background-color: ${({theme}) => theme.colors.darkPrimary};
      position: sticky;
      left: -1px;
      z-index: 100;
    }
  }



`
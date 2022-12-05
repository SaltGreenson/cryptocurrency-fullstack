import styled from "styled-components";

export type StyledParagraphPropsTypes = {
    fontSize?: string,
    mobileModeFontSize?: string,
    margin?: string,
    cursor?: string,
    color?: 'darkWhite' | 'lightGrey' | string,
    letterSpacing?: string
}

export const DefaultParagraphStyled = styled.p<StyledParagraphPropsTypes>`
  font-size: ${({fontSize, theme}) => fontSize ?? theme.fonts.sizes.default};
  margin: ${({margin}) => margin};
  cursor: ${({cursor}) => cursor};
  letter-spacing: ${({letterSpacing}) => letterSpacing};
  color: ${({color, theme}) =>
          color === 'darkWhite'
                  ? theme.colors.darkWhite
                  : color === 'lightGrey'
                          ? theme.colors.lightGrey : color
  };

  @media (${({theme}) => theme.media.phone}) {
    & {
      font-size: ${({theme}) => theme.fonts.sizes.medium};
    }
  }
`

export const BoldParagraphStyled = styled(DefaultParagraphStyled)`
  font-weight: 700;
`

export const HiddenParagraphStyled = styled.p`
  display: none;
`
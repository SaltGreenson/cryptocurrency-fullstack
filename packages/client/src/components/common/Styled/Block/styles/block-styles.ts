import styled, {css} from 'styled-components';

export type FlexPropsTypes = {
    align?: string,
    justify?: string
    margin?: string,
    padding?: string,
    direction?: string,
    fontSize?: string
    flexWrap?: 'wrap',
    marginPhoneMode?: string,
    justifyPhoneMode?: string
}

export type ContentBlockTypes = {
    computerModeMaxWidth?: string,
    tabletModeMaxWidth?: string,
    phoneModeMaxWidth?: string,
    align?: 'left' | 'right' | 'center',
    margin?: string,
    padding?: string,
    position?: string,
    left?: string,
    right?: string,
    bottom?: string,
    top?: string,
}

export const BlockFlexStyles = styled.div<FlexPropsTypes>`
  display: flex;
  flex-wrap: ${({flexWrap}) => flexWrap};
  flex-direction: ${({direction}) => direction ?? 'row'};
  align-items: ${({align}) => align ?? 'stretch'};
  justify-content: ${({justify}) => justify ?? 'stretch'};
  margin: ${({margin}) => margin ?? '0'};
  max-height: 100%;
  font-size: ${({fontSize}) => fontSize ?? 'inherit'};
`;

export const BlockContentStyles = styled.div<ContentBlockTypes>`
  margin: ${({margin}) => margin};
  padding: ${({padding}) => padding};
  position: ${({position}) => position};
  left: ${({left}) => left};
  right: ${({right}) => right};
  bottom: ${({bottom}) => bottom};
  top: ${({top}) => top};

  max-width: ${({computerModeMaxWidth}) =>
          computerModeMaxWidth ?? '100%'};

  ${({align}) =>
          align === 'right'
                  ? css`
                    position: fixed;
                    right: 0;`
                  : align === 'center'
                          ? css`
                            margin: 0 auto;`
                  : null

  };

  @media (${({theme}) => theme.media.tablet}) {
    & {
      max-width: ${({tabletModeMaxWidth}) =>
              tabletModeMaxWidth ?? '99%'};
      overflow-x: scroll;
    }
  }

  @media (${({theme}) => theme.media.phone}) {
    & {
      max-width: ${({phoneModeMaxWidth}) =>
              phoneModeMaxWidth ?? '97%'};
    }
  }
`
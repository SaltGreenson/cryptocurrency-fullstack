import React from "react";
import {
    BoldParagraphStyled,
    DefaultParagraphStyled,
    HiddenParagraphStyled,
    StyledParagraphPropsTypes
} from "./styles/Paragraph-styles";

type ParagraphPropsTypes = {
    children: React.FC<StyledParagraphPropsTypes> | React.DetailedHTMLProps<any, any>
}

type ParagraphTypes = {
    Bold: React.FC<ParagraphPropsTypes & StyledParagraphPropsTypes>,
    Hidden: React.FC<ParagraphPropsTypes>
}

export const P: React.FC<ParagraphPropsTypes & StyledParagraphPropsTypes> & ParagraphTypes = ({children, ...rest}) => (
    <DefaultParagraphStyled {...rest}>
        {children}
    </DefaultParagraphStyled>
);

P.Bold = ({children, ...rest}) => <BoldParagraphStyled {...rest}>
    {children}
</BoldParagraphStyled>

P.Hidden = ({children}) => <HiddenParagraphStyled>
    {children}
</HiddenParagraphStyled>
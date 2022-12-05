import React from 'react';
import {BlockContentStyles, BlockFlexStyles, ContentBlockTypes, FlexPropsTypes} from './styles/block-styles';

type BlockPropsTypes = {
    children: React.FC | React.DetailedHTMLProps<any, any>
}

type BlockTypes = {
    Flex: React.FC<BlockPropsTypes & FlexPropsTypes>
    Content: React.FC<BlockPropsTypes & ContentBlockTypes>
}

const Block: React.FC<BlockPropsTypes> & BlockTypes = ({children}) => (
    <div>
        {children}
    </div>
);

Block.Flex = ({children, ...rest}) => <BlockFlexStyles {...rest}>
    {children}
</BlockFlexStyles>

Block.Content = ({children, ...rest}) => <BlockContentStyles {...rest}>
    {children}
</BlockContentStyles>

export default Block;

import React from 'react';
import {Link} from 'react-router-dom';
import {AssetsType} from '../../api/types-api';
import Button from '../common/Styled/Button/Button';
import {formatNumbersToPrettyStyle, formatNumberToPrice} from '../utils/helpers/helpers';
import {Table} from "../common/Styled/Table/Table";
import Block from "../common/Styled/Block/Block";
import {P} from "../common/Styled/Paragraph/Paragraph";

type PropsTypes = {
    coin: AssetsType,
    alreadyInFavourite: boolean
    onClickHandler: (coin: AssetsType) => void
}

export const CoinElement: React.FC<PropsTypes> = ({
  coin,
  alreadyInFavourite,
  onClickHandler,
}) => (
  <Table.TR>

    <Table.TD>
      <P>{coin.rank}</P>
    </Table.TD>

    <Table.TD>
        <Block.Flex align={"center"}>

        <Button.Transparent
          type="button"
          color={alreadyInFavourite ? 'yellow' : 'blue'}
          onClick={onClickHandler}
          onClickTransmittedValues={coin}
          data-cy={`coinElement_rank${coin.rank}`}
        >
          &#9733;
        </Button.Transparent>
            <Block.Content
                margin={"1em 0"}
            >
        <Link
            to={`/:id=${coin.id}`}
            data-cy="linkToDescription"
        >
            <P.Bold
                cursor={'pointer'}
                letterSpacing={'1px'}
            >{coin.name}</P.Bold>
        </Link>
            </Block.Content>
        <Link
            to={`/:id=${coin.id}`}>

            <P cursor={'pointer'}
               color={"darkWhite"}
               fontSize={'16px'}
               margin={'0 0 0 0.6rem'}
            >
                {coin.symbol}
            </P>
        </Link>

      </Block.Flex>
    </Table.TD>
    <Table.TD textAlign={"right"}>
      <P>{formatNumberToPrice(+coin.priceUsd)}</P>
    </Table.TD>

    <Table.TD textAlign={"right"}>
      <P>{formatNumbersToPrettyStyle(+coin.changePercent24Hr)}</P>
    </Table.TD>

    <Table.TD textAlign={"right"}>
      <P color={'lightGrey'}>
        {formatNumbersToPrettyStyle(+coin.supply, 2, 15)}
        {' '}
        {coin.symbol}
      </P>
    </Table.TD>

    <Table.TD textAlign={"right"}>
      <P color={'lightGrey'}>{formatNumberToPrice(+coin.marketCapUsd)}</P>
    </Table.TD>

    <Table.TD textAlign={"right"}>
      <P>{formatNumberToPrice(+coin.volumeUsd24Hr)}</P>
    </Table.TD>

  </Table.TR>
);

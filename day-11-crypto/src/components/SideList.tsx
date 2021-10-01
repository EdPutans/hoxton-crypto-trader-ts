import React from 'react';
import { CryptoItem } from '../types';
// Notice how we give our Props type a new name - we avoid collision and is more readable this way:
import SideListItem, { Props as SideListItemProps } from "./SideListItem";

type Props = {
  cryptoList: CryptoItem[];
  // see comment in src/types.ts if this doesn't make sense :)
  isSelectedCrypto: SideListItemProps['isSelectedCrypto']
  selectCrypto: SideListItemProps['selectCrypto']
}

 const SideList :React.FunctionComponent<Props> =({
  cryptoList,
  isSelectedCrypto,
  selectCrypto
}) => {
  return (
    <ul>
      {cryptoList.map((item) => (
        <SideListItem
          item={item}
          isSelectedCrypto={isSelectedCrypto}
          selectCrypto={selectCrypto}
        />
      ))}
    </ul>
  );
}

export default SideList;

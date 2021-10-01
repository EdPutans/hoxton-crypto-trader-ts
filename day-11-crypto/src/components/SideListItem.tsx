import React from 'react';
import { CryptoItem, CryptoId } from "../types";

export type Props = {
  isSelectedCrypto: (id: CryptoId) => boolean;
  selectCrypto: (id: CryptoId) => void;
  item: Partial<CryptoItem>
}

const SideListItem: React.FunctionComponent<Props> = ({
  isSelectedCrypto,
  selectCrypto,
  item: { id, name }
}) => (
    <li key={id}>
      <button
        className={(id && isSelectedCrypto(id)) ? "selected" : ""}
        onClick={() => id ? selectCrypto(id): undefined}
      >
        {name}
      </button>
    </li>
  );

export default SideListItem;
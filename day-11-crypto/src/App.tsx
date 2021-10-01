import React, { useState, useMemo } from "react";

import { CRYPTO_LIST } from "./constants";
import MainDetail from "./components/MainDetail";
import NewsFeed from "./components/NewsFeed";
import SideList from "./components/SideList";
import useFetch from "./hooks/useFetch";
import { CryptoId, CryptoItem} from "./types";

//////////////////////////////////////////////////
//                                              //
//  Don't forget to check all the code again!!  //
//                                              //
//////////////////////////////////////////////////

const App: React.FunctionComponent<{}> = () => {
  const [cryptoList, setCryptoList] = useFetch<CryptoItem>(CRYPTO_LIST, null);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoId | null>(null);

  function selectCrypto(selectedId: CryptoId):void {
    setSelectedCrypto(selectedId);
  }

  function findCrypto(cryptoId: CryptoId): CryptoItem | undefined {
    return cryptoList.find(({ id }) => id === cryptoId);
  }


  function updateCryptoData(data: Partial<CryptoItem>, id: CryptoId):void {
    setCryptoList(
      cryptoList.map((crypto) =>
        crypto.id === id ? { ...crypto, ...data } : crypto
      )
    )
  }

  function isSelectedCrypto(id: CryptoId): boolean {
    return selectedCrypto === id;
  }

  // useMemo allows us to calculate a value and then use it as a cached variable. That's convenient and yields
  // us a lot of performance benefits. It's called memoization. Feel free to read more here: 
  // https://reactjs.org/docs/hooks-reference.html#usememo
  // In this case, we use it to surpass an otherwise failing TS check on L73
  const selectedCryptoItem = useMemo(() => {
    if(!selectedCrypto) return null;

    return findCrypto(selectedCrypto);
  }, [selectedCrypto])

  return (
    <>
      <aside className="side-list">
        <SideList
          cryptoList={cryptoList}
          isSelectedCrypto={isSelectedCrypto}
          selectCrypto={selectCrypto}
        />
      </aside>
      <main className="main-detail">
        {selectedCryptoItem ? (
          <MainDetail
            selectedCrypto={selectedCryptoItem}
            updateCryptoData={updateCryptoData}
          />
        ) : (
          "Select a coin bro!"
        )}
        <NewsFeed />
      </main>
    </>
  );
}

export default App;

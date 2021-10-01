import { useEffect, useState } from "react";
import { getCryptoUpdateUrl } from "../constants";
import { CryptoId, CryptoItem } from "../types";

type Props = {
  selectedCrypto: CryptoItem;
  // Partial Generic means that we are only using part of the type. Effectively,
  // every { key: type } transforms into { key: type | undefined } or, simplified: { key?: type }
  updateCryptoData: (data: Partial<CryptoItem>, id: CryptoId) => void 
}

function currentTime(): number {
  return Math.round(Date.now() / 1000);
}

function convertToSeconds(dateValue: string | number): number {
  // This guard is needed due to the API discrepancies in handling dates
  return typeof dateValue === "string"
    ? Math.round(Date.parse(dateValue) / 1000)
    : dateValue;
}

const MainDetail: React.FunctionComponent<Props> = ({
  selectedCrypto: { id, name, current_price, last_updated, symbol },
  updateCryptoData
}) => {
  // Some parts of the sate will be replaced by your custom hooks
  const [counter, setCounter] = useState<number>(30);
  const [playTicker, setPlayTicker] = useState<boolean>(false);
  const [currTime, setCurrTime] = useState<number>(currentTime());

  //////////////////////////////////////////////////////////////////////////////////////
  //                                                                                  //
  //  The following comments give you an indication of what you can put in            //
  //  a custom hook.                                                                  //
  //                                                                                  //
  //  They don't represent separate hooks that you might have to create.              //
  //                                                                                  //
  //  You can put them all in one custon hook, if you think that's the best approach  //
  //                                                                                  //
  //////////////////////////////////////////////////////////////////////////////////////

  // You can turn this into a custom hook////////////////////
  useEffect(() => {
    if (counter < 0) {
      fetch(getCryptoUpdateUrl(id))
        .then((resp) => resp.json())
        .then((data) => {
          updateCryptoData(
            {
              current_price: data[id].gbp,
              last_updated: data[id]["last_updated_at"]
            },
            id
          );
        });
      setCounter(30);
    }
  }, [id, counter, setCounter, updateCryptoData]);
  ///////////////////////////////////////////////////////////

  // You can turn this into a custom hook////////////////////
  useEffect(() => {
    const interval =
      playTicker &&
      setInterval(() => {
        setCounter((count) => count - 1);
      }, 1000);

    return () => {
      if (!interval) return;
    
      clearInterval(interval);
    }
  }, [setCounter, playTicker]);
  ///////////////////////////////////////////////////////////

  // You can turn this into a custom hook////////////////////
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrTime((current) => current + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [setCurrTime]);
  ///////////////////////////////////////////////////////////

  return (
    <>
      <section className="main-detail__central">
        <div className="main-detail__update">
          <p>
            {playTicker &&
              `next update ${counter ? `in ${counter}` : "about to happen"}`}
          </p>
          <button
            className="main-detail__button"
            onClick={() => setPlayTicker((val) => !val)}
          >
            {playTicker ? "Pause" : "Start"} update
          </button>
        </div>
        <div className="main-detail__name">
          <h2>{name}</h2>
          <p>
            <span className="small">a.k.a </span>
            {symbol}
          </p>
        </div>
        <div className="main-detail__price">
          <p>£{current_price}</p>
          <p>Updated {currTime - convertToSeconds(last_updated)} seconds ago</p>
        </div>
      </section>
    </>
  );
}

export default MainDetail
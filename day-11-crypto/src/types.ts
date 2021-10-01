export type CryptoItem = { 
  id: string; 
  name: string; 
  current_price: string; 
  last_updated: string;
  symbol: string;
}

// this syntax pulls the type from CryptoItem. If we use this instead of "string" across our app,
// then if/when the type of id changes (e.g. to a number) in the CryptoItem type,
// we won't need to update it everywhere it's used. Good pattern to follow as your app grows.
export type CryptoId = CryptoItem['id'];

export type NewsItem = {
  description: string;
}

export type UseFetchReturn<DataType> = [
  data: DataType[],
  setData: (items: DataType[]) => void
];
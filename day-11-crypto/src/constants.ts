import { CryptoId } from "./types";

const API = "https://api.coingecko.com/api/v3";

export const STATUS_UPDATES: string = `${API}/status_updates`;
export const CRYPTO_LIST: string = `${API}/coins/markets?vs_currency=gbp`;
export const getCryptoUpdateUrl = (id: CryptoId): string =>
  `${API}/simple/price?ids=${id}&vs_currencies=gbp&include_last_updated_at=true`;

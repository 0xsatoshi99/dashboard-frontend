export interface IMyWalletInfo {
  name: string;
  address: string;
  balance: number;
  tokens: IToken[];
  transactions: ITransaction[];
}
export interface IToken {
  mint: string;
  name: string;
  symbol: string;
  amount: number;
  image?: string;
  price?: number;
  buyPrice?: number;
}

export interface ITransaction {
  signature: string;
  isPump: boolean;
  name: string;
  account: string;
  type: "BUY" | "SELL";
  solAmount: number;
  timestamp: number;
  tokenAmount: number;
  token: {
    mint: string;
    image: string;
    symbol: string;
    name: string;
  };
}

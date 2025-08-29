export interface IPumpToken {
  signature: string;
  name: string;
  symbol: string;
  uri: string;
  mint: string;
  curve: string;
  user: string;
  timestamp: number;
  trades: IPumpTokenTrade[];
  social?: IPumpTokenIPFS;
  isSuccess: boolean;
  isMigrated: boolean;
  isMigrating: boolean;
  isBought: false;
  marketcap?: number;
  volume?: number;
  holders?: any[];
  holding?: number;
}
export interface IPumpTokenTrade {
  signature: string;
  isDev: boolean;
  discriminator: string;
  mint: string;
  solAmount: number;
  tokenAmount: number;
  isBuy: boolean;
  user: string;
  timestamp: number;
}

export interface IPumpTokenIPFS {
  mint: string;
  image?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
}

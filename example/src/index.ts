import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { MeteoraApi } from '@cryptoscan/meteora-sdk';
import 'dotenv/config'
import { Connection } from '@solana/web3.js';

const connectionUrl = process.env.WS_CONNECTION_URL;
const connection = connectionUrl ? new Connection(process.env.CONNECTION_URL!, {wsEndpoint: connectionUrl }) : undefined;
const wallet = getWallet(process.env.SECRET_KEY!);
const coinAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const sol = 0.05;
const api = new MeteoraApi({ connection });
console.log(wallet.publicKey.toString())

api.buy({
  wallet,
  coinAddress,
  sol,
}).then((tx) => console.log(tx))

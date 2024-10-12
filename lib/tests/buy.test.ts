import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { MeteoraApi } from '../MeteoraApi.js';
import { Connection } from '@solana/web3.js';
import { describe, test, expect } from 'vitest';

describe('Test buy', () => {
  test('Should buy', async () => {
    const api = new MeteoraApi({
      connection: new Connection(process.env.CONNECTION_URL!),
    });
    const coinAddress = process.env.COIN_ADDRESS! || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
    const wallet = getWallet(process.env.TEST_SECRET_KEY!);
    console.log('WALLET:', wallet.publicKey.toString());

    const tx = await api.buy({
      wallet,
      coinAddress,
      sol: 0.05,
      fee: 0.0001,
      // priorityFee: 0.00001,
    })

    console.log('TX:', tx)

    expect(typeof tx === 'string').toBe(true)
    expect(!!tx).toBe(true)
  }, 60_000)
})

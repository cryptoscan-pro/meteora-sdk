import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { describe, test, expect } from 'vitest';
import { MeteoraApi } from '../MeteoraApi.js';
import { Connection } from '@solana/web3.js';

describe('Test sell', () => {
  test('Should sell', async () => {
    const api = new MeteoraApi({
      connection: new Connection(process.env.CONNECTION_URL!),
    });
    const coinAddress = process.env.COIN_ADDRESS! || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
    const wallet = getWallet(process.env.TEST_SECRET_KEY!);

    const tx = await api.sell({
      wallet,
      coinAddress,
      sol: 0.045,
      fee: 0.0001,
    })

    console.log('TX:', tx)

    expect(typeof tx === 'string').toBe(true)
    expect(!!tx).toBe(true)
  }, 60_000)
})

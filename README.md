# @cryptoscan/meteora-sdk

The fastest and easiest way to trade on Meteora

- Get rate/price of coin in USD/Solana
- Buy/Sell coin
- Transfer coins to another wallet
- Transfer solana to another wallet

[[GitHub]](https://github.com/cryptoscan-pro/meteora-sdk)
[[Our website]](https://cryptoscan.pro/)
[[Docs]](https://cryptoscan.pro/docs/)
[[Discord]](https://discord.gg/ktewAs67fE)

## Getting started

Let's see our [Project example](https://github.com/cryptoscan-pro/meteora-sdk/tree/main/example)

```
npm install @cryptoscan/meteora-sdk
```

## Buy Example

Request

- `wallet` - wallet keypair (by secret key)
- `sol` - amount of SOL to buy, (Optional) if empty - all balance
- `coinAddress` - coin address
- `fee` - amount of SOL to pay fee (Optional)
- `payerWallet` - payer wallet keypair (Optional)
- `slippage` - amount of slippage (Default: 1)
- `priorityFee` - amount of SOL to pay priority fee (Optional)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { MeteoraApi } from '@cryptoscan/meteora-sdk';

const wallet = getWallet(process.env.SECRET_KEY!);
const coinAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const sol = 0.05;
const api = new MeteoraApi();

api.buy({
  wallet,
  coinAddress,
  sol,
})
```

## Sell Example

Request

- `wallet` - wallet keypair (by secret key)
- `sol` - amount of SOL to sell, (Optional) if empty - all balance
- `coinAddress` - coin address
- `fee` - amount of SOL to pay fee (Optional)
- `payerWallet` - payer wallet keypair (Optional)
- `slippage` - amount of slippage (Default: 10)
- `priorityFee` - amount of SOL to pay priority fee (Optional)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { MeteoraApi } from '@cryptoscan/meteora-sdk';

const wallet = getWallet(process.env.SECRET_KEY!);
const coinAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const sol = undefined; // Sell all
const api = new MeteoraApi();

api.sell({
  wallet,
  coinAddress,
  sol,
})
```

## Transfer Solana Example

Request

- `wallet` - wallet keypair (by secret key)
- `sol` - amount of SOL to transfer, (Optional) if empty - all balance
- `coinAddress` - coin address (Optional)
- `fee` - amount of SOL to pay fee (Optional)
- `payerWallet` - payer wallet keypair (Optional)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { MeteoraApi } from '@cryptoscan/meteora-sdk';

const wallet = getWallet(process.env.SECRET_KEY!);
const sol = undefined; // All amount
const api = new MeteoraApi();

api.transfer({
  wallet,
  sol,
})
```

## Transfer Coins Example

Request

- `wallet` - wallet keypair (by secret key)
- `sol` - amount of coins in SOL to transfer, (Optional) if empty - all balance
- `coinAddress` - coin address (Optional)
- `fee` - amount of SOL to pay fee (Optional)
- `payerWallet` - payer wallet keypair (Optional)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { MeteoraApi } from '@cryptoscan/meteora-sdk';

const wallet = getWallet(process.env.SECRET_KEY!);
const coinAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const sol = 0.01;
const api = new MeteoraApi();

api.transfer({
  wallet,
  coinAddress,
  sol,
})
```
## Listen transactions

Request

- `coinAddress` - coin address
- `callback` - listen transaction callback
	- `tx` - transaction hash
	- `baseAmount` - amount of base coin
	- `quoteAmount` - amount of quote coin
	- `amount` - amount of base coin

```javascript
import { MeteoraApi } from '@cryptoscan/meteora-sdk';

const api = new MeteoraApi();
const coinAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

api.listenTransactions(coinAddress, (transaction) => {
  console.log(transaction)
})
```

## FAQ

<details>
  <summary>Is it secure to use sdk with private key?</summary>

  Yes. You don't share private key through api request.
  You sign transaction with private key locally only.
  Library is based on [@cryptoscan/swap-sdk](https://docs.cryptoscan.pro/swap/sdk)
</details>
<details>
  <summary>Is it free?</summary>

  We charge a 0.39% fee on each successful transaction instruction. 
  If you want to decrease fee - please contact us in [discord](https://discord.gg/ktewAs67fE) or [telegram](https://t.me/nomoney_trader)
  We can increase fee down to 0.1% if you will contribute us.
</details>
<details>
  <summary>How to contribute?</summary>

  You can create pull requests or make a project based on our packages. 
  You have chance to get some supply for a work and get fee reduced for the api.
</details>

---

## Contribute

To install dependencies:

```bash
npm install
```

To build:

```bash
npm build
```

This project was created using `bun init` in bun v1.1.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

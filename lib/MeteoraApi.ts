import { CreateSwapParams, CreateTransferParams, swap } from "@cryptoscan/swap-sdk";
import { getRate } from '@cryptoscan/scanner-sdk';
import { Connection } from "@solana/web3.js";
import { TransferParams } from './types/TransferParams.js';
import { BuyParams } from "./types/BuyParams.js";
import { MeteoraApiParams } from "./types/MeteoraApiParams.js";
import { SellParams } from "./types/SellParams.js";
import { SwapParams } from '@cryptoscan/swap-sdk';
import { getBalance } from '@cryptoscan/solana-wallet-sdk';

export class MeteoraApi {
	protected readonly params: MeteoraApiParams = {
		buySlippage: 1,
		sellSlippage: 10,
		bumpSlippage: 10,
		buyFee: 0.00005,
		sellFee: 0.00005,
		transferFee: 0.00005,
		connection: new Connection('https://api.mainnet-beta.solana.com/'),
	}

	public constructor(params?: Partial<MeteoraApiParams>) {
		if (params) {
			this.params = {
				...this.params,
				...params,
			}
		}
	}

	public async buy(_params: BuyParams): Promise<string> {
		const params: SwapParams<Omit<CreateSwapParams, 'walletAddress'>> = {
			..._params,
			type: 'swap',
			network: 'solana',
			amount: _params.sol,
			wallet: _params.payerWallet || _params.wallet,
			from: 'So11111111111111111111111111111111111111112',
			to: _params.coinAddress,
			fee: _params.fee || this.params.buyFee,
			slippage: _params.slippage || this.params.buySlippage,
			connection: this.params.connection,
		};

		return swap(params);
	}

	public async sell(_params: SellParams): Promise<string> {
		let sol = _params.sol;
		let amount: number | undefined;

		if (!_params.sol) {
			const balance = await getBalance(_params.wallet.publicKey.toString(), _params.coinAddress);
			amount = balance;
		}
		if (!amount) {
			amount = await getRate({
				network: 'solana',
				from: 'So11111111111111111111111111111111111111112',
				to: _params.coinAddress,
				amount: sol,
			}).then((r) => r?.amount)
		}

		if (!amount) {
			throw new Error('Failed to get price')
		}

		const params: SwapParams<Omit<CreateSwapParams, 'walletAddress'>> = {
			..._params,
			type: 'swap',
			network: 'solana',
			amount,
			wallet: _params.payerWallet || _params.wallet,
			from: _params.coinAddress,
			to: 'So11111111111111111111111111111111111111112',
			fee: _params.fee || this.params.sellFee,
			slippage: _params.slippage || this.params.sellSlippage,
			connection: this.params.connection,
		};

		return swap(params);
	}

	public async transfer(_params: TransferParams): Promise<string> {
		let amount = _params.sol;

		if (!_params.sol) {
			amount = await getBalance(_params.walletFrom.publicKey.toString());
		}
		if (!!_params.coinAddress || _params.coinAddress?.toLowerCase() === 'so11111111111111111111111111111111111111112') {
			amount = await getRate({
				network: 'solana',
				from: 'So11111111111111111111111111111111111111112',
				to: _params.coinAddress,
				amount,
			}).then((r) => r?.amount)

			if (!amount) {
				throw new Error('Failed to get price')
			}
		}

		const params: SwapParams<CreateTransferParams> = {
			..._params,
			type: 'transfer',
			network: 'solana',
			wallet: _params.payerWallet || _params.walletFrom,
			coinAddress: _params.coinAddress || 'So11111111111111111111111111111111111111112',
			from: _params.walletFrom.publicKey.toString(),
			to: _params.walletTo.publicKey.toString(),
			amount: amount!,
			fee: _params.fee || this.params.transferFee,
			connection: this.params.connection,
		};

		return swap(params)
	}

	public async listenTransactions(address: string, onTransaction: (transaction: Record<string, unknown>) => void) {
		throw new Error('is not implemented')
	}
}

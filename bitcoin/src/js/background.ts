import { Message } from "./constants";

/** Local storage key to store bitcoin amount. */
const storageKey = "BITCOIN_EXTENSION_AMOUNT";

/** Returns amount of bitcoins. */
function getBitcoinAmount(): number {
	const valueInStorage = localStorage.getItem(storageKey);
	return valueInStorage ? +valueInStorage : 0;
}

/** Function type for buy/sell bitcoin callback. */
type BuySellCallback = (data: { amount?: number, error?: string }) => void;

/**
 * Increase amount of bitcoins by provided value. Calls `callback` with new amount.
 */
function buyBitcoins(amountToBuy: number, callback: BuySellCallback): void {
	const amount = getBitcoinAmount() + amountToBuy;
	localStorage.setItem(storageKey, amount + "");
	callback({ amount });
}

/**
 * Decrease amount of bitcoins by provided value if possible. Otherwise calls `callback` with error
 * message.
 */
function sellBitcoins(amountToSell: number, callback: BuySellCallback): void {
	let amount = getBitcoinAmount();
	if (amount - amountToSell < 0) {
		callback({ error: `You do not have enough bitcoins! Current balance: ${amount}.` });
	} else {
		amount -= amountToSell;
		localStorage.setItem(storageKey, amount + "");
		callback({ amount });
	}
}

/**
 * Filters all tabs to find an active one and send message to it.
 * @param message Object with type an payload.
 */
function sendMessageToActiveTab(message: Message): void {
	// @ts-ignore
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		const activeTab = tabs[0];
		// @ts-ignore
		chrome.tabs.sendMessage(activeTab.id, message);
	});
}

/**
 * Event handler for received messages.
 * @param message Object with type and payload.
 * @param sender Message sender.
 * @param sendResponse Function to call when you have a response.
 */
function onMessageReceived(message: Message, sender: any, sendResponse: BuySellCallback): void {
	switch (message.type) {
		case "GET_AMOUNT":
			sendResponse({ amount: getBitcoinAmount() });
			break;
		case "BUY":
			buyBitcoins(message.amount, sendResponse);
			break;
		case "SELL":
			sellBitcoins(message.amount, sendResponse);
			break;
		default: console.warn("Unknown message type ", message.type);
	}
}

/**
 * Initialization function.
 */
function init(): void {
	// @ts-ignore
	chrome.runtime.onMessage.addListener(onMessageReceived);
}

init();
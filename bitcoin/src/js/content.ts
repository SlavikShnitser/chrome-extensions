import { NotificationService } from "./NotificationService";
import { HTMLConfig, UIHelper } from "./UIHelper";
import { CSS_PREFIX, Message } from "./constants";

/**
 * An ID for "Buy Bitcoin" button.
 * @type {string}
 */
const BUY_BTN_ID = "bitcoin-extension-buy-btn";
/**
 * An ID for "Sell Bitcoin" button.
 * @type {string}
 */
const SELL_BTN_ID = "bitcoin-extension-sell-btn";

/**
 * Configuration object to create HTML element with specified class, attributes and children.
 */
const elementConfig: HTMLConfig = {
    tagName: "div",
    className: `${CSS_PREFIX}-container`,
    children: [
        {
            tagName: "div",
            className: `${CSS_PREFIX}-toggle`,
            attributes: { draggable: "true" },
            properties: { onclick: togglePanel, ondrag: dragContainer },
            children: [
                {
                    tagName: "img",
                    className: `${CSS_PREFIX}-icon`,
                    // @ts-ignore
                    attributes: { src: chrome.runtime.getURL("assets/icon.png") }
                }
            ]
        },
        {
            tagName: "div",
            className: `${CSS_PREFIX}-panel closed`,
            children: [
                {
                    tagName: "div",
                    className: `${CSS_PREFIX}-title`,
                    properties: { innerHTML: "Your Bitcoin wallet" }
                },
                {
                    tagName: "input",
                    className: `${CSS_PREFIX}-input`,
                    attributes: { disabled: "true" }
                },
                {
                    tagName: "div",
                    className: `${CSS_PREFIX}-hint`,
                    properties: { innerHTML: "Bitcoins" }
                },
                {
                    tagName: "div",
                    className: `${CSS_PREFIX}-buttons-container`,
                    children: [
                        {
                            tagName: "button",
                            className: `${CSS_PREFIX}-btn`,
                            attributes: { id: BUY_BTN_ID },
                            properties: { innerHTML: "Buy Bitcoin", onclick: buyButtonHandler }
                        },
                        {
                            tagName: "button",
                            className: `${CSS_PREFIX}-btn`,
                            attributes: { id: SELL_BTN_ID },
                            properties: { innerHTML: "Sell Bitcoin", onclick: sellButtonHandler }
                        }
                    ]
                }
            ]
        }
    ]
};

/**
 * Toggles CSS class "closed" for panel.
 */
function togglePanel(): void {
    const panel = document.body.querySelector(`.${CSS_PREFIX}-panel`);
    panel.classList.toggle("closed");
}

/**
 * Updates vertical position of main container.
 * @param event An instance of DragEvent.
 */
function dragContainer(event: MouseEvent): void {
    const container = document.body.querySelector(`.${CSS_PREFIX}-container`) as HTMLElement;
    if (event.clientY === 0) {
        return;
    }

    // do not allow to drag panel outside of the screen top edge
    let top = Math.max(0, event.clientY - 50);
    // do not allow to drag panel outside of the screen bottom edge
    top = Math.min(top, window.innerHeight - 360);

    container.style.top = `${top}px`;
}

/**
 * Sets the specified value to the input.
 * @param value
 */
function setInputValue(value: string): void {
    const input = document.body.querySelector(`.${CSS_PREFIX}-input`) as HTMLInputElement;
    input.value = value;
}

/**
 * Sends message to the background script with type `BUY`.
 */
function buyButtonHandler(): void {
    // @ts-ignore
    chrome.runtime.sendMessage({ type: "BUY", amount: 1 }, response => {
        const { amount, error } = response;
        error === undefined ?
            setInputValue(amount) :
            NotificationService.showNotification("error", error);
    });
}

/**
 * Sends message to the background script with type `SELL`.
 */
function sellButtonHandler(): void {
    // @ts-ignore
    chrome.runtime.sendMessage({ type: "SELL", amount: 1 }, response => {
        const { amount, error } = response;
        error === undefined ?
            setInputValue(amount) :
            NotificationService.showNotification("error", error);
    });
}

/**
 * Event handler for received messages from background script.
 * @param message Object with type an payload.
 */
function onMessageReceived(message: Message): void { }

/**
 * Initialization function.
 */
function init(): void {
    const container = UIHelper.buildHTML(elementConfig);
    document.body.appendChild(container);

    // @ts-ignore
    chrome.runtime.onMessage.addListener(onMessageReceived);
    // @ts-ignore
    chrome.runtime.sendMessage(
        { type: "GET_AMOUNT" },
        (response: Message) => setInputValue(response.amount)
    );
}

init();
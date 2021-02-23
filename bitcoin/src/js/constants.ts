/**
 * The prefix of all CSS classes used by extension. This approach helps to avoid collisions
 * between custom class names and web-page class name.
 * @type {string}
 */
export const CSS_PREFIX = "bitcoin-extension";

/**
 * Represents messages that allows to communicate between content and background scripts.
 */
export interface Message {
    type: string;
    [key: string]: any;
}
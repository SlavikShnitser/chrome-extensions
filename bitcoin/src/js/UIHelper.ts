
export interface HTMLConfig {
  tagName: string;
  className?: string;
  attributes?: { [key: string]: string };
  properties?: { [key: string]: string | EventListenerOrEventListenerObject };
  children?: HTMLConfig[];
}

/**
 * Helper class allows to create complex HTML structures by calling method `buildHTML` with
 * custom configuration object.
 */
export class UIHelper {
  /** An array of allowed HTML attributes. */
  static readonly attributes = [
    "draggable",
    "src",
    "id",
    "type",
    "disabled"
  ];
  /** An array of allowed HTML element's properties. */
  static readonly properties = [
    "innerHTML",
    "onclick",
    "ondrag"
  ];

  /**
   * Builds and HTML element with specified class, attributes, properties and children.
   * @param config Configuration object.
   * @return HTML element.
   */
  static buildHTML(config: HTMLConfig): HTMLElement {
    const { tagName, className, attributes, properties, children } = config;
    const element = document.createElement(tagName);

    if (className) {
      element.classList.add(...className.split(" "));
    }

    if (attributes) {
      Object.keys(attributes).forEach(key => {
        if (UIHelper.attributes.includes(key)) {
          const value = attributes[key];
          element.setAttribute(key, value);
        }
      });
    }

    if (properties) {
      Object.assign(element, properties);
    }

    if (children) {
      children.forEach(item => {
        element.appendChild(UIHelper.buildHTML(item));
      });
    }

    return element;
  }
}
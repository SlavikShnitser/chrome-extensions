import { UIHelper } from "./UIHelper";
import { CSS_PREFIX } from "./constants";

/**
 * A service to show notifications.
 */
export class NotificationService {
  /** HTML element that acts as a container for notifications.  */
  static container: HTMLElement | undefined;

  /** Allowed types of notification. Default `success`. */
  static readonly types = [
    "success",
    "warning",
    "error",
  ];

  /** Determines how long each notification is visible. */
  static duration = 5000;

  /** Creates container and appends it to the body. */
  static init(): void {
    if (NotificationService.container) {
      return;
    }

    NotificationService.container = UIHelper.buildHTML({
      tagName: "div",
      className: `${CSS_PREFIX}-notifications-container`
    });
    document.body.appendChild(NotificationService.container);
  }

  /**
   * Creates a notification HTML element and appends it to the container. Removes it from
   * container after `NotificationService.duration` milliseconds.
   * @param type Notification type.
   * @param message Message to display.
   */
  static showNotification(type: string, message: string): void {
    // If container is not created yet call init function
    if (!NotificationService.container) {
      NotificationService.init();
    }

    // Use `success` type as a default
    if (!NotificationService.types.includes(type)) {
      type = "success";
    }

    const notification = UIHelper.buildHTML({
      tagName: "div",
      className: `${CSS_PREFIX}-notification ${CSS_PREFIX}-${type}`,
      properties: { innerHTML: message }
    });

    NotificationService.container.appendChild(notification);

    setTimeout(() => {
      NotificationService.container.removeChild(notification);
    }, NotificationService.duration);
  }
}
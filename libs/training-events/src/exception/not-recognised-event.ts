export class NotRecognisedEvent extends Error {
  constructor(eventName: string) {
    super(`Event  "${eventName}" is not recognised, consider redeploying the service with the new events logic.`);
  }
}

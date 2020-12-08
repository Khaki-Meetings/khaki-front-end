export class NotImplementedException extends Error {
  constructor() {
    super();
    this.message = 'Not Implemented';
  }
}

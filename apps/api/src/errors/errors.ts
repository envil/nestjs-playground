export class CredinordError extends Error {
  constructor(public code: number, public message: string) {
    super();
  }
}

export class BadMoodError extends CredinordError {
  constructor(public message: string) {
    super(500, message);;
  }
}

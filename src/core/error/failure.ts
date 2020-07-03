export abstract class Failure {
  properties: {}[]
}

export class ServerFailure extends Failure {}

export class CacheFailure extends Failure {}

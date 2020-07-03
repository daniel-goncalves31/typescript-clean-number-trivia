export interface Failure {
  properties: {}[]
}

export interface ServerFailure extends Failure {}

export interface CacheFailure extends Failure {}

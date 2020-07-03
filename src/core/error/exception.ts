export class ServerException implements Error {
  constructor (public name: string, public message: string) {}
}

export class CacheException implements Error {
  constructor (public name: string, public message: string) {}
}

import NumberTriviaRepository from '@/domain/repositories/number_trivia_repository'
import { Failure } from '@/core/error/failure'
import NumberTrivia from '@/domain/entities/number_trivia'
import { NumberTriviaLocalDataSource } from '../datasources/number_trivia_local_datasource'
import { NumberTriviaRemoteDataSource } from '../datasources/number_trivia_remote_datasource'
import { NetworkInfo } from '@/core/utils/network_info'

export default class NumberTriviaRepositoryImpl implements NumberTriviaRepository {
  constructor (
    private readonly localDataSource: NumberTriviaLocalDataSource,
    private readonly remoteDataSource: NumberTriviaRemoteDataSource,
    private readonly networkInfo: NetworkInfo
  ) {}

  async getConcreteNumberTrivia (number: number): Promise<Failure | NumberTrivia> {
    this.networkInfo.isConnected()
    const numberTrivia = await this.remoteDataSource.getConcreteNumberTrivia(number)
    this.localDataSource.cacheNumberTrivia(numberTrivia)
    return numberTrivia
  }

  getRandomNumberTrivia (): Promise<Failure | NumberTrivia> {
    return {} as any
  }
}

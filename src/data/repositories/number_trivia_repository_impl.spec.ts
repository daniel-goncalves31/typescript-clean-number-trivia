import { ServerException } from '@/core/error/exception'
import { ServerFailure } from '@/core/error/failure'
import { NetworkInfo } from '@/core/utils/network_info'
import NumberTrivia from '@/domain/entities/number_trivia'
import { mock } from 'jest-mock-extended'
import { NumberTriviaLocalDataSource } from '../datasources/number_trivia_local_datasource'
import { NumberTriviaRemoteDataSource } from '../datasources/number_trivia_remote_datasource'
import NumberTriviaModel from '../models/number_trivia_model'
import NumberTriviaRepositoryImpl from './number_trivia_repository_impl'

const numberTriviaLocalDataSourceSpy = mock<NumberTriviaLocalDataSource>()
const numberTriviaRemoteDataSourceSpy = mock<NumberTriviaRemoteDataSource>()
const networkInfoSpy = mock<NetworkInfo>()

const sut = new NumberTriviaRepositoryImpl(
  numberTriviaLocalDataSourceSpy,
  numberTriviaRemoteDataSourceSpy,
  networkInfoSpy
)

const tNumber = 1
const tNumberTriviaModel = new NumberTriviaModel('any_text', 1)
const tNumberTrivia: NumberTrivia = tNumberTriviaModel

describe('Number Trivia Repository Impl', () => {
  beforeAll(() => {
    networkInfoSpy
      .isConnected
      .mockReturnValue(Promise.resolve(true))
  })

  test('should check if the device is online', () => {
    networkInfoSpy.isConnected.mockReturnValue(Promise.resolve(true))
    sut.getConcreteNumberTrivia(tNumber)
    expect(networkInfoSpy.isConnected).toHaveBeenCalled()
  })

  describe('Device is online', () => {
    beforeAll(() => {
      networkInfoSpy
        .isConnected
        .mockImplementation(async () => {
          return true
        })
    })

    test('should return remote data when the call to remote data source is successful', async () => {
      numberTriviaRemoteDataSourceSpy
        .getConcreteNumberTrivia
        .mockReturnValue(Promise.resolve(tNumberTriviaModel))

      const result = await sut.getConcreteNumberTrivia(tNumber)
      expect(numberTriviaRemoteDataSourceSpy.getConcreteNumberTrivia).toHaveBeenCalledWith(tNumber)
      expect(result).toEqual(tNumberTrivia)
    })

    test('should cache the data locally when the call to remote data source is successful', async () => {
      numberTriviaRemoteDataSourceSpy
        .getConcreteNumberTrivia
        .mockReturnValue(Promise.resolve(tNumberTriviaModel))

      await sut.getConcreteNumberTrivia(tNumber)
      expect(numberTriviaLocalDataSourceSpy.cacheNumberTrivia).toHaveBeenCalledWith(tNumberTriviaModel)
    })

    test('should return server failure when the call to remote data source is unsuccessful', async () => {
      numberTriviaRemoteDataSourceSpy
        .getConcreteNumberTrivia
        .mockImplementationOnce(() => {
          throw new ServerException()
        })
      const result = await sut.getConcreteNumberTrivia(tNumber)
      expect(numberTriviaLocalDataSourceSpy.cacheNumberTrivia).not.toHaveBeenCalled()
      expect(result).toEqual(new ServerFailure())
    })
  })

  describe('Device is offline', () => {
    beforeAll(() => {
      networkInfoSpy
        .isConnected
        .mockReturnValue(Promise.resolve(false))
    })

    test('should return last locally cached data when the cached data is present', async () => {
      numberTriviaLocalDataSourceSpy
        .getLastNumberTrivia
        .mockReturnValue(Promise.resolve(tNumberTriviaModel))

      const result = await sut.getConcreteNumberTrivia(tNumber)
      expect(numberTriviaRemoteDataSourceSpy.getConcreteNumberTrivia).not.toHaveBeenCalled()
      expect(numberTriviaLocalDataSourceSpy.getLastNumberTrivia).toHaveBeenCalled()
      expect(result).toEqual(tNumberTrivia)
    })
  })
})

import { NumberTriviaLocalDataSource } from '../datasources/number_trivia_local_datasource'
import { NumberTriviaRemoteDataSource } from '../datasources/number_trivia_remote_datasource'
import { mock, MockProxy } from 'jest-mock-extended'
import { NetworkInfo } from '@/core/utils/network_info'
import NumberTriviaRepositoryImpl from './number_trivia_repository_impl'
import NumberTriviaModel from '../models/number_trivia_model'
import NumberTrivia from '@/domain/entities/number_trivia'

type SutType = {
  numberTriviaLocalDataSourceSpy: NumberTriviaLocalDataSource & MockProxy<NumberTriviaLocalDataSource>,
  numberTriviaRemoteDataSourceSpy: NumberTriviaRemoteDataSource & MockProxy<NumberTriviaRemoteDataSource>,
  networkInfoSpy: NetworkInfo & MockProxy<NetworkInfo>
  sut: NumberTriviaRepositoryImpl
}

const makeSut = (): SutType => {
  const numberTriviaLocalDataSourceSpy = mock<NumberTriviaLocalDataSource>()
  const numberTriviaRemoteDataSourceSpy = mock<NumberTriviaRemoteDataSource>()
  const networkInfoSpy = mock<NetworkInfo>()
  const sut = new NumberTriviaRepositoryImpl(
    numberTriviaLocalDataSourceSpy,
    numberTriviaRemoteDataSourceSpy,
    networkInfoSpy
  )

  return {
    numberTriviaLocalDataSourceSpy,
    numberTriviaRemoteDataSourceSpy,
    networkInfoSpy,
    sut
  }
}

describe('Number Trivia Repository Impl', () => {
  const tNumber = 1
  const tNumberTriviaModel = new NumberTriviaModel('any_text', 1)
  const tNumberTrivia: NumberTrivia = tNumberTriviaModel

  test('should check if the device is online', () => {
    const { sut, networkInfoSpy } = makeSut()
    networkInfoSpy.isConnected.mockReturnValue(Promise.resolve(true))
    sut.getConcreteNumberTrivia(tNumber)
    expect(networkInfoSpy.isConnected).toHaveBeenCalled()
  })

  describe('Device is online', () => {
    beforeAll(() => {
      const { networkInfoSpy } = makeSut()
      networkInfoSpy.isConnected.mockReturnValue(Promise.resolve(true))
    })

    test('should return remote data when the call to remote data source is successful', async () => {
      const { sut, numberTriviaRemoteDataSourceSpy } = makeSut()
      numberTriviaRemoteDataSourceSpy.getConcreteNumberTrivia.mockReturnValue(Promise.resolve(tNumberTriviaModel))
      const result = await sut.getConcreteNumberTrivia(tNumber)
      expect(numberTriviaRemoteDataSourceSpy.getConcreteNumberTrivia).toHaveBeenCalledWith(tNumber)
      expect(result).toEqual(tNumberTrivia)
    })

    test('should cache the data locally when the call to remote data source is successful', async () => {
      const { sut, numberTriviaRemoteDataSourceSpy, numberTriviaLocalDataSourceSpy } = makeSut()
      numberTriviaRemoteDataSourceSpy.getConcreteNumberTrivia.mockReturnValue(Promise.resolve(tNumberTriviaModel))
      await sut.getConcreteNumberTrivia(tNumber)
      expect(numberTriviaLocalDataSourceSpy.cacheNumberTrivia).toHaveBeenCalledWith(tNumberTriviaModel)
    })
  })
})

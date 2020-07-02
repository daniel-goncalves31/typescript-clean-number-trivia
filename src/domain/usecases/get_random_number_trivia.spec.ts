import NumberTriviaRepository from '../repositories/number_trivia_repository'
import { MockProxy, mock } from 'jest-mock-extended'
import NumberTrivia from '../entities/number_trivia'
import GetRandomNumberTrivia from './get_random_number_trivia'

type SutType = {
  sut: GetRandomNumberTrivia
  numberTriviaRepositorySpy: NumberTriviaRepository & MockProxy<NumberTriviaRepository>
}

const makeSut = (): SutType => {
  const numberTriviaRepositorySpy = mock<NumberTriviaRepository>()
  const sut = new GetRandomNumberTrivia(numberTriviaRepositorySpy)
  return {
    sut,
    numberTriviaRepositorySpy
  }
}

describe('Get Random Number Trivia', () => {
  test('Should get trivia from the repository', async () => {
    const { sut, numberTriviaRepositorySpy } = makeSut()
    const numberTrivia: NumberTrivia = { text: '', number: 1 }
    numberTriviaRepositorySpy.getRandomNumberTrivia.mockReturnValue(Promise.resolve(numberTrivia))
    const result = await sut.execute()
    expect(result).toEqual(numberTrivia)
    expect(numberTriviaRepositorySpy.getRandomNumberTrivia).toHaveBeenCalledWith()
    expect(numberTriviaRepositorySpy.getRandomNumberTrivia).toHaveBeenCalledTimes(1)
  })
})

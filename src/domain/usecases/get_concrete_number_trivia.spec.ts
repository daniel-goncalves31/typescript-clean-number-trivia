import { mock, MockProxy } from 'jest-mock-extended'
import GetConcreteNumberTivia from './get_concrete_number_trivia'
import NumberTriviaRepository from '../repositories/number_trivia_repository'

type SutType = {
  numberTriviaRepositorySpy: NumberTriviaRepository & MockProxy<NumberTriviaRepository>
  sut: GetConcreteNumberTivia
}

const makeSut = (): SutType => {
  const numberTriviaRepositorySpy = mock<NumberTriviaRepository>()
  const sut = new GetConcreteNumberTivia(numberTriviaRepositorySpy)
  return { numberTriviaRepositorySpy, sut }
}

describe('Number Trivia Repository', () => {
  test('should get trivia for the number from the repository', async () => {
    const { sut, numberTriviaRepositorySpy } = makeSut()
    const tNumber = 2
    const expectedResult = { number: tNumber, text: '' }
    numberTriviaRepositorySpy.getConcreteNumberTrivia.mockReturnValue(Promise.resolve(expectedResult))
    const result = await sut.execute(tNumber)
    expect(numberTriviaRepositorySpy.getConcreteNumberTrivia).toHaveBeenCalledWith(tNumber)
    expect(result).toEqual(expectedResult)
  })
})

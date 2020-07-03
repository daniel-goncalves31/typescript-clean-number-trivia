import NumberTriviaModel from './number_trivia_model'
import NumberTrivia from '@/domain/entities/number_trivia'
import jsonFixture from '@/core/fixtures/trivia.json'

describe('Number Trivia Model', () => {
  type SutType = {
    sut: NumberTriviaModel
  }

  const makeSut = (): SutType => {
    const sut = new NumberTriviaModel(jsonFixture.text, jsonFixture.number)
    return {
      sut
    }
  }

  test('should be a subclass of NumberTriviaEntity', () => {
    const { sut } = makeSut()
    expect(sut).toBeInstanceOf(NumberTrivia)
  })

  test('should return a valid model when an JSON object is provided', () => {
    const { sut } = makeSut()
    const result = NumberTriviaModel.fromJson(jsonFixture)
    expect(result).toEqual(sut)
  })
})

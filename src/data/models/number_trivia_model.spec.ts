import NumberTriviaModel from './number_trivia_model'
import NumberTrivia from '@/domain/entities/number_trivia'

describe('Number Trivia Model', () => {
  type SutType = {
    sut: NumberTriviaModel
  }

  const makeSut = (): SutType => {
    const sut = new NumberTriviaModel('any_text', 1)
    return {
      sut
    }
  }

  test('should be a subclass of NumberTriviaEntity', () => {
    const { sut } = makeSut()
    expect(sut).toBeInstanceOf(NumberTrivia)
  })
})

import NumberTrivia from '@/domain/entities/number_trivia'

export default class NumberTriviaModel extends NumberTrivia {
  constructor (public text: string, public number: number) {
    super()
  }
}

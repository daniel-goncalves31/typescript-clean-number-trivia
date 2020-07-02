import NumberTriviaRepository from '../repositories/number_trivia_repository'
import { Failure } from '@/core/error/failure'
import NumberTrivia from '../entities/number_trivia'

export default class GetConcreteNumberTivia {
  constructor (private repository: NumberTriviaRepository) {}

  async execute (number: number): Promise<Failure | NumberTrivia> {
    return await this.repository.getConcreteNumberTrivia(number)
  }
}

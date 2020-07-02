import NumberTriviaRepository from '../repositories/number_trivia_repository'
import { Failure } from '@/core/error/failure'
import NumberTrivia from '../entities/number_trivia'

export default class GetRandomNumberTrivia {
  constructor (private readonly repository: NumberTriviaRepository) {}

  async execute (): Promise<Failure | NumberTrivia> {
    return this.repository.getRandomNumberTrivia()
  }
}

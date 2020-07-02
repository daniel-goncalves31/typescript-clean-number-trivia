import NumberTrivia from '../entities/number_trivia'
import { Failure } from '@/core/error/failure'

export default interface NumberTriviaRepository {
  getConcreteNumberTrivia(number: number): Promise<Failure | NumberTrivia>
  getRandomNumberTrivia(): Promise<Failure | NumberTrivia>
}

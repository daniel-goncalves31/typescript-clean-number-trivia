import NumberTriviaModel from '../models/number_trivia_model'

export interface NumberTriviaRemoteDataSource {
  /**
   * Calls the http://numberapi.com/@number endpoint
   *
   * Throws a [ServerException] for all errors code
   * @param number number to get the trivia from
   */
  getConcreteNumberTrivia(number: number): Promise<NumberTriviaModel>

  /**
   * Calls the http://numberapi.com/random endpoint
   *
   * Throws a [ServerException] for all errors code
   * @param number number to get the trivia from
   */
  getRandomNumberTrivia(): Promise<NumberTriviaModel>
}

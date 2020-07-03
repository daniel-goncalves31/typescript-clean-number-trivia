import NumberTriviaModel from '../models/number_trivia_model'

export interface NumberTriviaLocalDataSource {
  /**
   * Gets the cached @NumberTriviaModel which was goten the last time
   * the user had an internet connection
   *
   * Throws a @CacheException if no cache data is present
   */
  getLastNumberTrivia(): Promise<NumberTriviaModel>

  /**
   * Cache the number trivia
   * @param {NumberTriviaModel} triviaToCache - The trivia to cache
   */
  cacheNumberTrivia(triviaToCache: NumberTriviaModel): Promise<void>
}

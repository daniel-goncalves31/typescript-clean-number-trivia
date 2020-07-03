import NumberTrivia from '@/domain/entities/number_trivia'

export default class NumberTriviaModel extends NumberTrivia {
  constructor (public text: string, public number: number) {
    super()
  }

  static fromJson (json: NumberTriviaApiResponseType): NumberTriviaModel {
    return new NumberTriviaModel(json.text, json.number)
  }

  // toJson (): NumberTrivia {
  //   return {
  //     text: this.text,
  //     number: this.number
  //   }
  // }
}

type NumberTriviaApiResponseType = {
  text: string,
  number: number
  found: boolean,
  type: string
}

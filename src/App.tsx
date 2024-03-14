import { Component, MouseEvent } from "react";
import img0 from "./assets/0.jpg";
import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";
import img5 from "./assets/5.jpg";
import img6 from "./assets/6.jpg";
import { randomWord } from './Words'

interface HangmanProps {}

interface HangmanState {
  nWrong: number;
  guessed: Set<string>;
  answer: string;
}

class Hangman extends Component<HangmanProps, HangmanState> {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    alttxt: [
      '0 Wrong guesses',
      '1 Wrong guesses',
      '2 Wrong guesses',
      '3 Wrong guesses',
      '4 Wrong guesses',
      '5 Wrong guesses',
      '6 Wrong guesses'
    ]
  };

  constructor(props: HangmanProps) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
  }

  guessedWord(): string[] {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess = (evt: MouseEvent<HTMLButtonElement>) => {
    let ltr = (evt.target as HTMLButtonElement).value;
    this.setState(st => ({
      guessed: new Set(st.guessed.add(ltr)),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  };

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        className="inline-block mx-1 my-1 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
      >
        {ltr}
      </button>
    ));
  }

  restart() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  handleRestart = () => {
    this.restart();
  };

  render() {
    const gameOver = this.state.nWrong >= Hangman.defaultProps.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameState: string | JSX.Element[] = this.generateButtons();
    if (isWinner) gameState = 'You Win';
    if (gameOver) gameState = 'You Lose!';
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-yellow-300">
        <h1 className="text-3xl font-bold mb-4">Hangman</h1>
        <img src={Hangman.defaultProps.images[this.state.nWrong]} alt={Hangman.defaultProps.alttxt[this.state.nWrong]} className="max-w-xs mb-4" />
        <p className="mb-2">Guessed Wrong: {this.state.nWrong}</p>
        <p className="mb-4">{!gameOver ? this.guessedWord() : this.state.answer}</p>
        <div className="mb-4">{gameState}</div>
        <button onClick={this.handleRestart} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Restart
        </button>
      </div>
    );
  }
}

export default Hangman;



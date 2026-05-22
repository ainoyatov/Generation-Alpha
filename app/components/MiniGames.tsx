"use client"

import { useState } from "react"

type Props = {
  onAddPoints: (points: number) => void
}

export default function MiniGames({ onAddPoints }: Props) {
  const [pendingPoints, setPendingPoints] = useState(0)

  const [clickScore, setClickScore] = useState(0)
  const [rpsResult, setRpsResult] = useState("")

  const [guess10Number, setGuess10Number] = useState(Math.floor(Math.random() * 10) + 1)
  const [guess10Input, setGuess10Input] = useState("")
  const [guess10Result, setGuess10Result] = useState("")

  const [guess100Number, setGuess100Number] = useState(Math.floor(Math.random() * 100) + 1)
  const [guess100Input, setGuess100Input] = useState("")
  const [guess100Result, setGuess100Result] = useState("")

  const [guess1000Number, setGuess1000Number] = useState(Math.floor(Math.random() * 1000) + 1)
  const [guess1000Input, setGuess1000Input] = useState("")
  const [guess1000Result, setGuess1000Result] = useState("")

  const [reactionStarted, setReactionStarted] = useState(false)
  const [reactionReady, setReactionReady] = useState(false)
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [reactionStartTime, setReactionStartTime] = useState(0)

  const [coinResult, setCoinResult] = useState("")

  function addPending(points: number) {
    setPendingPoints((current) => current + points)
  }

  function collectPoints() {
    if (pendingPoints <= 0) return

    onAddPoints(pendingPoints)
    setPendingPoints(0)
  }

  function playClicker() {
    const newScore = clickScore + 1
    setClickScore(newScore)

    if (newScore % 100 === 0) {
      addPending(100)
    }
  }

  function playRPS(choice: string) {
    const options = ["Rock", "Paper", "Scissors"]
    const computer = options[Math.floor(Math.random() * options.length)]

    if (choice === computer) {
      setRpsResult(`Tie! Both picked ${choice}. +100 pending UserPoints`)
      addPending(100)
      return
    }

    if (
      (choice === "Rock" && computer === "Scissors") ||
      (choice === "Paper" && computer === "Rock") ||
      (choice === "Scissors" && computer === "Paper")
    ) {
      setRpsResult(`You Win! ${choice} beats ${computer}. +250 pending UserPoints`)
      addPending(250)
    } else {
      setRpsResult(`You Lose! ${computer} beats ${choice}. +0 UserPoints`)
    }
  }

  function checkGuess(
    input: string,
    answer: number,
    reward: number,
    setResult: (value: string) => void,
    resetAnswer: () => void,
    clearInput: () => void
  ) {
    const guessed = Number(input)

    if (!guessed) {
      setResult("Enter a number.")
      return
    }

    if (guessed === answer) {
      setResult(`Correct! +${reward} pending UserPoints`)
      addPending(reward)
      resetAnswer()
      clearInput()
    } else if (guessed > answer) {
      setResult("Too high!")
    } else {
      setResult("Too low!")
    }
  }

  function startReactionGame() {
    setReactionStarted(true)
    setReactionReady(false)
    setReactionTime(null)

    const delay = Math.random() * 4000 + 1000

    setTimeout(() => {
      setReactionReady(true)
      setReactionStartTime(Date.now())
    }, delay)
  }

  function clickReaction() {
    if (!reactionReady) return

    const time = Date.now() - reactionStartTime

    let reward = 100

    if (time < 300) reward = 1000
    else if (time < 500) reward = 700
    else if (time < 800) reward = 400

    setReactionTime(time)
    setReactionStarted(false)
    setReactionReady(false)
    addPending(reward)
  }

  function flipCoin() {
    const result = Math.random() > 0.5 ? "Heads" : "Tails"
    setCoinResult(`${result}! +100 pending UserPoints`)
    addPending(100)
  }

  return (
    <div className="fixed right-4 top-24 z-40 max-h-[80vh] w-[340px] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">
      <h2 className="text-center text-3xl font-black text-green-900">Mini Games</h2>

      <div className="mt-4 rounded-xl bg-black p-4 text-center text-white">
        <p className="text-xl font-black">Pending: {pendingPoints} UserPoints</p>

        <button
          onClick={collectPoints}
          className="mt-3 w-full rounded-lg bg-green-600 px-4 py-3 font-black text-white"
        >
          Collect Points
        </button>
      </div>

      <div className="mt-6 rounded-xl bg-green-100 p-4">
        <h3 className="text-xl font-bold text-green-900">Clicker Game</h3>
        <p className="mt-2 font-bold">Reward: +100 every 100 clicks</p>
        <p className="mt-2 text-lg font-bold">Clicks: {clickScore}</p>

        <button onClick={playClicker} className="mt-3 w-full rounded-lg bg-green-900 px-4 py-3 font-bold text-white">
          Click Me
        </button>

        <button onClick={() => setClickScore(0)} className="mt-3 w-full rounded-lg bg-gray-700 px-4 py-3 font-bold text-white">
          Reset Clicks
        </button>
      </div>

      <div className="mt-6 rounded-xl bg-blue-100 p-4">
        <h3 className="text-xl font-bold text-blue-900">Rock Paper Scissors</h3>
        <p className="mt-2 font-bold">Win: +250 | Tie: +100</p>

        <div className="mt-3 flex gap-2">
          <button onClick={() => playRPS("Rock")} className="flex-1 rounded-lg bg-blue-700 px-3 py-2 text-white">Rock</button>
          <button onClick={() => playRPS("Paper")} className="flex-1 rounded-lg bg-blue-700 px-3 py-2 text-white">Paper</button>
          <button onClick={() => playRPS("Scissors")} className="flex-1 rounded-lg bg-blue-700 px-3 py-2 text-white">Scissors</button>
        </div>

        {rpsResult && <p className="mt-3 font-bold text-blue-900">{rpsResult}</p>}
      </div>

      <div className="mt-6 rounded-xl bg-yellow-100 p-4">
        <h3 className="text-xl font-bold text-yellow-900">Guess 1-10</h3>
        <p className="mt-2 font-bold">Correct: +500</p>

        <input
          value={guess10Input}
          onChange={(e) => setGuess10Input(e.target.value)}
          placeholder="1-10"
          className="mt-3 w-full rounded-lg border p-3"
        />

        <button
          onClick={() =>
            checkGuess(
              guess10Input,
              guess10Number,
              500,
              setGuess10Result,
              () => setGuess10Number(Math.floor(Math.random() * 10) + 1),
              () => setGuess10Input("")
            )
          }
          className="mt-3 w-full rounded-lg bg-yellow-600 px-4 py-3 font-bold text-white"
        >
          Guess
        </button>

        {guess10Result && <p className="mt-3 font-bold text-yellow-900">{guess10Result}</p>}
      </div>

      <div className="mt-6 rounded-xl bg-orange-100 p-4">
        <h3 className="text-xl font-bold text-orange-900">Guess 1-100</h3>
        <p className="mt-2 font-bold">Correct: +2,000</p>

        <input
          value={guess100Input}
          onChange={(e) => setGuess100Input(e.target.value)}
          placeholder="1-100"
          className="mt-3 w-full rounded-lg border p-3"
        />

        <button
          onClick={() =>
            checkGuess(
              guess100Input,
              guess100Number,
              2000,
              setGuess100Result,
              () => setGuess100Number(Math.floor(Math.random() * 100) + 1),
              () => setGuess100Input("")
            )
          }
          className="mt-3 w-full rounded-lg bg-orange-600 px-4 py-3 font-bold text-white"
        >
          Guess
        </button>

        {guess100Result && <p className="mt-3 font-bold text-orange-900">{guess100Result}</p>}
      </div>

      <div className="mt-6 rounded-xl bg-pink-100 p-4">
        <h3 className="text-xl font-bold text-pink-900">Guess 1-1000</h3>
        <p className="mt-2 font-bold">Correct: +10,000</p>

        <input
          value={guess1000Input}
          onChange={(e) => setGuess1000Input(e.target.value)}
          placeholder="1-1000"
          className="mt-3 w-full rounded-lg border p-3"
        />

        <button
          onClick={() =>
            checkGuess(
              guess1000Input,
              guess1000Number,
              10000,
              setGuess1000Result,
              () => setGuess1000Number(Math.floor(Math.random() * 1000) + 1),
              () => setGuess1000Input("")
            )
          }
          className="mt-3 w-full rounded-lg bg-pink-600 px-4 py-3 font-bold text-white"
        >
          Guess
        </button>

        {guess1000Result && <p className="mt-3 font-bold text-pink-900">{guess1000Result}</p>}
      </div>

      <div className="mt-6 rounded-xl bg-red-100 p-4">
        <h3 className="text-xl font-bold text-red-900">Reaction Test</h3>
        <p className="mt-2 font-bold">Reward: +100 to +1000</p>

        {!reactionStarted && !reactionReady && (
          <button onClick={startReactionGame} className="mt-3 w-full rounded-lg bg-red-700 px-4 py-3 font-bold text-white">
            Start
          </button>
        )}

        {reactionStarted && !reactionReady && (
          <div className="mt-3 rounded-lg bg-yellow-200 p-3 text-center font-bold">
            Wait for green...
          </div>
        )}

        {reactionReady && (
          <button onClick={clickReaction} className="mt-3 w-full rounded-lg bg-green-600 px-4 py-6 text-2xl font-black text-white">
            CLICK!
          </button>
        )}

        {reactionTime !== null && (
          <p className="mt-3 text-center text-xl font-black text-red-900">
            {reactionTime} ms
          </p>
        )}
      </div>

      <div className="mt-6 rounded-xl bg-purple-100 p-4">
        <h3 className="text-xl font-bold text-purple-900">Coin Flip</h3>
        <p className="mt-2 font-bold">Reward: +100</p>

        <button onClick={flipCoin} className="mt-3 w-full rounded-lg bg-purple-700 px-4 py-3 font-bold text-white">
          Flip Coin
        </button>

        {coinResult && (
          <p className="mt-3 text-center text-2xl font-black text-purple-900">
            {coinResult}
          </p>
        )}
      </div>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, HelpCircle } from "lucide-react"
import { Button } from "../component/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../component/ui/tooltip"
import DragAndDrop from "./drag-and-drop"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
  hint?: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "What do plants need for photosynthesis?",
    options: ["Oxygen & Sugar", "Sunlight, Water & Carbon Dioxide", "Protein & Salt"],
    correctAnswer: 1,
    explanation:
      "Plants require sunlight as an energy source, water from the soil, and carbon dioxide from the air to perform photosynthesis and produce glucose.",
    hint: "Think about what plants absorb from their environment.",
  },
  {
    id: 2,
    text: "What is the role of sunlight in photosynthesis?",
    options: ["It provides energy to make food", "It helps plants absorb water", "It turns leaves green"],
    correctAnswer: 0,
    explanation:
      "Sunlight provides the energy needed to drive the process of photosynthesis, converting light energy into chemical energy in the form of glucose.",
    hint: "Consider the energy transformation in photosynthesis.",
  },
  {
    id: 3,
    text: "Which part of the plant is responsible for photosynthesis?",
    options: ["Roots", "Leaves", "Stem"],
    correctAnswer: 1,
    explanation:
      "Leaves contain chloroplasts, the organelles where photosynthesis takes place.  Chlorophyll within the chloroplasts captures light energy.",
    hint: "Think about the plant's structure and where chlorophyll is located.",
  },
  {
    id: 4,
    text: "What gas do plants release during photosynthesis?",
    options: ["Carbon Dioxide", "Oxygen", "Nitrogen"],
    correctAnswer: 1,
    explanation: "Oxygen is a byproduct of photosynthesis. It's released into the atmosphere.",
    hint: "What gas is a product of the light-dependent reactions?",
  },
  {
    id: 5,
    text: "What is the main product of photosynthesis?",
    options: ["Water", "Glucose", "Carbon Dioxide"],
    correctAnswer: 1,
    explanation:
      "Glucose is a sugar molecule that serves as the primary energy source for plants and is produced during photosynthesis.",
    hint: "What is the plant's food source?",
  },
  {
    id: 6,
    text: "Which pigment is essential for photosynthesis?",
    options: ["Chlorophyll", "Melanin", "Carotene"],
    correctAnswer: 0,
    explanation:
      "Chlorophyll is the green pigment that absorbs light energy, initiating the process of photosynthesis.",
    hint: "What gives plants their green color?",
  },
  {
    id: 7,
    text: "In which part of the chloroplast does the light-dependent reaction occur?",
    options: ["Stroma", "Thylakoid", "Outer membrane"],
    correctAnswer: 1,
    explanation:
      "The thylakoid membranes within the chloroplast are the site of the light-dependent reactions, where light energy is converted into chemical energy.",
    hint: "Where are the photosystems located?",
  },
  {
    id: 8,
    text: "What is the first step of the Calvin cycle?",
    options: ["Carbon fixation", "Reduction", "Regeneration"],
    correctAnswer: 0,
    explanation:
      "Carbon fixation is the initial step of the Calvin cycle, where carbon dioxide is incorporated into an organic molecule.",
    hint: "What molecule is CO2 incorporated into?",
  },
  {
    id: 9,
    text: "Which of these is NOT a factor affecting the rate of photosynthesis?",
    options: ["Light intensity", "Temperature", "Soil pH"],
    correctAnswer: 2,
    explanation:
      "While soil pH can indirectly affect plant health, it's not a direct factor in the photosynthetic process itself.",
    hint: "Think about the environmental factors directly involved in photosynthesis.",
  },
  {
    id: 10,
    text: "What is the end product of the light-dependent reactions?",
    options: ["Glucose", "ATP and NADPH", "Carbon dioxide"],
    correctAnswer: 1,
    explanation:
      "ATP and NADPH are energy-carrying molecules produced during the light-dependent reactions and used in the Calvin cycle.",
    hint: "What molecules provide energy for the Calvin cycle?",
  },
]

interface Answer {
  questionId: number
  selectedAnswer: number
  isCorrect: boolean
  timeSpent: number
}

interface Props {
  onComplete: (score: number) => void
}

export default function MultipleChoice({ onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [showDragAndDrop, setShowDragAndDrop] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    setQuestionStartTime(Date.now())
  }, [])

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
  }

  const handleContinue = () => {
    if (selectedAnswer === null) return

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000)
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer

    if (isCorrect) {
      setScore(score + 5)
    }

    const answer: Answer = {
      questionId: questions[currentQuestion].id,
      selectedAnswer,
      isCorrect,
      timeSpent,
    }

    setAnswers([...answers, answer])

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowHint(false)
    } else {
      setShowResults(true)
    }
  }

  const handleFinishQuiz = () => {
    setShowDragAndDrop(true)
  }

  if (showDragAndDrop) {
    return <DragAndDrop initialScore={score} onComplete={onComplete} />
  }

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-8">
        <h1 className="text-2xl font-bold mb-6">Quiz Results</h1>

        <div className="space-y-8">
          {questions.map((question, index) => {
            const answer = answers.find((a) => a.questionId === question.id)
            if (!answer) return null

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={question.id}
                className="space-y-3"
              >
                <h3 className="font-medium">Question {index + 1}</h3>
                <p className="text-lg mb-4">{question.text}</p>

                <div className="grid gap-2">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = answer.selectedAnswer === optionIndex
                    const isCorrect = question.correctAnswer === optionIndex

                    return (
                      <div
                        key={optionIndex}
                        className={`p-4 rounded-lg border ${
                          isCorrect ? "bg-green-50 border-green-200" : isSelected ? "bg-red-50 border-red-200" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                            {option}
                          </div>
                          {isCorrect && (
                            <div className="flex items-center text-green-500">
                              <CheckCircle2 className="h-5 w-5 mr-1" />
                              Right ✅
                            </div>
                          )}
                          {isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div
                  className={`p-4 rounded-lg ${
                    answer.isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {answer.isCorrect ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">Correct! +5 points</p>
                            <p className="text-sm">Time spent: {answer.timeSpent} seconds</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-500" />
                          <div>
                            <p className="font-medium">Incorrect. 0 points</p>
                            <p className="text-sm">Time spent: {answer.timeSpent} seconds</p>
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-sm mt-2">
                      <strong>Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-medium mb-2">Performance Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Score</p>
                <p className="text-2xl font-bold">{score} / 50</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold">
                  {Math.round((answers.filter((a) => a.isCorrect).length / answers.length) * 100)}%
                </p>
              </div>
            </div>
          </div>

          <Button className="w-full bg-primary text-primary-foreground" onClick={handleFinishQuiz}>
            Continue to Drag and Drop
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Button variant="ghost" size="icon" className="mb-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="bg-[#6B21A8] text-white rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>Goal: 50 points</div>
              <div>Current Points: {score}</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm text-muted-foreground mb-1">Question {currentQuestion + 1}</h2>
              {questions[currentQuestion].hint && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setShowHint(!showHint)}>
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{questions[currentQuestion].hint}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <p className="text-lg font-medium">{questions[currentQuestion].text}</p>

            <AnimatePresence mode="wait">
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      selectedAnswer === index ? "border-primary" : "hover:bg-muted"
                    }`}
                    disabled={selectedAnswer !== null}
                  >
                    <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </motion.button>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-auto p-4">
          <Button
            className="w-full bg-primary text-primary-foreground"
            onClick={handleContinue}
            disabled={selectedAnswer === null}
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


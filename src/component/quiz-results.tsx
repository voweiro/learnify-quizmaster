"use client"

import { CheckCircle2, XCircle } from "lucide-react"

interface Answer {
  questionId: number
  selectedAnswer: number
  isCorrect: boolean
}

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

interface Props {
  questions: Question[]
  answers: Answer[]
}

export default function QuizResults({ questions, answers }: Props) {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Quiz Results</h1>

      <div className="space-y-8">
        {questions.map((question, index) => {
          const answer = answers.find((a) => a.questionId === question.id)
          if (!answer) return null

          return (
            <div key={question.id} className="space-y-3">
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
                        isSelected ? (isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200") : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                          {option}
                        </div>
                        {isSelected &&
                          (isCorrect ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          ))}
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
                {answer.isCorrect ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Right!</p>
                      <p className="text-sm">Great understanding of the concept!</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">Think again!</p>
                      <p className="text-sm">Review this concept for better understanding.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


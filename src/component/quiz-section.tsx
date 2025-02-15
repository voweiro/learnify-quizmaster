"use client"

import { useState } from "react"
import { Button } from "../component/ui/button"
import { Progress } from "../component/ui/progress"
import { ArrowLeft, HelpCircle, Timer } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../component/ui/dialog"
import MultipleChoice from "./multiple-choice"

interface Props {
  subject: string
  difficulty: string
  onExit: () => void
}

export default function QuizSection({ subject, difficulty, onExit }: Props) {
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(3600) // 1 hour in seconds

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleQuizComplete = (score: number) => {
    setTotalScore(score)
    setQuizCompleted(true)
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Quiz Completed!</h1>
            <p className="text-xl text-muted-foreground">
              {totalScore >= 60 ? "Great job! 🎉" : "Keep practicing! 💪"}
            </p>
            <div className="py-8">
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{Math.round((totalScore / 80) * 100)}%</span>
                </div>
                <Progress value={(totalScore / 80) * 100} className="h-4" />
              </div>
            </div>
            <p className="text-2xl font-semibold">Score: {totalScore} / 80</p>
          </div>
          <div className="space-y-4 pt-8">
            <Button onClick={onExit} className="w-full">
              Return to Dashboard
            </Button>
            <Button variant="outline" className="w-full">
              Review Answers
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onExit}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Exit Quiz
          </Button>
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Quiz Instructions</DialogTitle>
                  <DialogDescription>
                    This quiz consists of two sections:
                    <ul className="list-disc list-inside mt-2 space-y-2">
                      <li>Multiple Choice Questions (50 points)</li>
                      <li>Drag and Drop Matching (30 points)</li>
                    </ul>
                    <p className="mt-4">You have 1 hour to complete both sections. Good luck!</p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
              <Timer className="h-4 w-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold capitalize">{subject} Quiz</h1>
          <p className="text-muted-foreground capitalize">{difficulty} Level</p>
        </div>

        <MultipleChoice onComplete={handleQuizComplete} />
      </div>
    </div>
  )
}


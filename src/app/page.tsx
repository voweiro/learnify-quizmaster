"use client"

import { useState } from "react"
import { Button } from "../component/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import Dashboard from "../component/dashboard"
import QuizSection from "../component/quiz-section"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("")

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  if (showQuiz) {
    return (
      <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
        <QuizSection subject={selectedSubject} difficulty={selectedDifficulty} onExit={() => setShowQuiz(false)} />
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <div className="fixed top-4 right-4">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
      </div>
      <Dashboard
        onStartQuiz={(subject, difficulty) => {
          setSelectedSubject(subject)
          setSelectedDifficulty(difficulty)
          setShowQuiz(true)
        }}
      />
    </div>
  )
}


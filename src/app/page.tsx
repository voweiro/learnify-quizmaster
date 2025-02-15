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
    <div>
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


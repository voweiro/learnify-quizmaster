"use client"

import { useState, useEffect } from "react"
import { Button } from "../component/ui/button"
import { ArrowLeft, RotateCcw, ArrowRight, CheckCircle2, XCircle } from "lucide-react"

interface Term {
  id: string
  content: string
  correctZone: string
}

interface DropZone {
  id: string
  title: string
  term: Term | null
}

interface Match {
  termId: string
  zoneId: string
  isCorrect: boolean
}

interface Question {
  id: number
  terms: Term[]
  dropZones: DropZone[]
}

const questions: Question[] = [
  {
    id: 1,
    terms: [
      { id: "constant-1", content: "Constant", correctZone: "zone-1" },
      { id: "coefficient-1", content: "Coefficient", correctZone: "zone-2" },
      { id: "expression-1", content: "Expression", correctZone: "zone-3" },
      { id: "equation-1", content: "Equation", correctZone: "zone-4" },
      { id: "variable-1", content: "Variable", correctZone: "zone-5" },
      { id: "exponent-1", content: "Exponent", correctZone: "zone-6" },
    ],
    dropZones: [
      { id: "zone-1", title: "A number that doesn't change", term: null },
      { id: "zone-2", title: "A number that multiplies a variable", term: null },
      { id: "zone-3", title: "A combination of numbers and variables", term: null },
      { id: "zone-4", title: "A statement showing two expressions are equal", term: null },
      { id: "zone-5", title: "A symbol representing an unknown value", term: null },
      { id: "zone-6", title: "A number showing how many times to multiply", term: null },
    ],
  },
  {
    id: 2,
    terms: [
      { id: "nucleus-2", content: "Nucleus", correctZone: "zone-1" },
      { id: "cytoplasm-2", content: "Cytoplasm", correctZone: "zone-2" },
      { id: "membrane-2", content: "Cell Membrane", correctZone: "zone-3" },
      { id: "mitochondria-2", content: "Mitochondria", correctZone: "zone-4" },
      { id: "golgi-2", content: "Golgi Body", correctZone: "zone-5" },
      { id: "er-2", content: "Endoplasmic Reticulum", correctZone: "zone-6" },
    ],
    dropZones: [
      { id: "zone-1", title: "Controls cell activities", term: null },
      { id: "zone-2", title: "Gel-like substance inside cell", term: null },
      { id: "zone-3", title: "Controls what enters and exits", term: null },
      { id: "zone-4", title: "Powerhouse of the cell", term: null },
      { id: "zone-5", title: "Packages and processes proteins", term: null },
      { id: "zone-6", title: "Transport system within cell", term: null },
    ],
  },
  {
    id: 3,
    terms: [
      { id: "photosynthesis-3", content: "Photosynthesis", correctZone: "zone-1" },
      { id: "respiration-3", content: "Respiration", correctZone: "zone-2" },
      { id: "transpiration-3", content: "Transpiration", correctZone: "zone-3" },
      { id: "germination-3", content: "Germination", correctZone: "zone-4" },
      { id: "pollination-3", content: "Pollination", correctZone: "zone-5" },
      { id: "fertilization-3", content: "Fertilization", correctZone: "zone-6" },
    ],
    dropZones: [
      { id: "zone-1", title: "Process of making food using sunlight", term: null },
      { id: "zone-2", title: "Breaking down glucose for energy", term: null },
      { id: "zone-3", title: "Loss of water vapor from leaves", term: null },
      { id: "zone-4", title: "Beginning of seed growth", term: null },
      { id: "zone-5", title: "Transfer of pollen between flowers", term: null },
      { id: "zone-6", title: "Union of male and female gametes", term: null },
    ],
  },
  {
    id: 4,
    terms: [
      { id: "solid-4", content: "Solid", correctZone: "zone-1" },
      { id: "liquid-4", content: "Liquid", correctZone: "zone-2" },
      { id: "gas-4", content: "Gas", correctZone: "zone-3" },
      { id: "melting-4", content: "Melting", correctZone: "zone-4" },
      { id: "freezing-4", content: "Freezing", correctZone: "zone-5" },
      { id: "evaporation-4", content: "Evaporation", correctZone: "zone-6" },
    ],
    dropZones: [
      { id: "zone-1", title: "Fixed shape and volume", term: null },
      { id: "zone-2", title: "Fixed volume but takes container shape", term: null },
      { id: "zone-3", title: "No fixed shape or volume", term: null },
      { id: "zone-4", title: "Change from solid to liquid", term: null },
      { id: "zone-5", title: "Change from liquid to solid", term: null },
      { id: "zone-6", title: "Change from liquid to gas", term: null },
    ],
  },
  {
    id: 5,
    terms: [
      { id: "proton-5", content: "Proton", correctZone: "zone-1" },
      { id: "neutron-5", content: "Neutron", correctZone: "zone-2" },
      { id: "electron-5", content: "Electron", correctZone: "zone-3" },
      { id: "nucleus-5", content: "Nucleus", correctZone: "zone-4" },
      { id: "atom-5", content: "Atom", correctZone: "zone-5" },
      { id: "molecule-5", content: "Molecule", correctZone: "zone-6" },
    ],
    dropZones: [
      { id: "zone-1", title: "Positive particle in nucleus", term: null },
      { id: "zone-2", title: "Neutral particle in nucleus", term: null },
      { id: "zone-3", title: "Negative particle orbiting nucleus", term: null },
      { id: "zone-4", title: "Center of atom with protons and neutrons", term: null },
      { id: "zone-5", title: "Smallest unit of an element", term: null },
      { id: "zone-6", title: "Two or more atoms bonded together", term: null },
    ],
  },
  {
    id: 6,
    terms: [
      { id: "planet-6", content: "Planet", correctZone: "zone-1" },
      { id: "star-6", content: "Star", correctZone: "zone-2" },
      { id: "moon-6", content: "Moon", correctZone: "zone-3" },
      { id: "asteroid-6", content: "Asteroid", correctZone: "zone-4" },
      { id: "comet-6", content: "Comet", correctZone: "zone-5" },
      { id: "galaxy-6", content: "Galaxy", correctZone: "zone-6" },
    ],
    dropZones: [
      { id: "zone-1", title: "Orbits a star and clears its path", term: null },
      { id: "zone-2", title: "Massive ball of burning gas", term: null },
      { id: "zone-3", title: "Natural satellite of a planet", term: null },
      { id: "zone-4", title: "Rocky object orbiting the Sun", term: null },
      { id: "zone-5", title: "Icy body with a tail when near Sun", term: null },
      { id: "zone-6", title: "Collection of stars, gas, and dust", term: null },
    ],
  },
]

interface Props {
  initialScore: number
  onComplete: (score: number) => void
}

export default function DragAndDrop({ initialScore, onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [availableTerms, setAvailableTerms] = useState<Term[]>(questions[0].terms)
  const [dropZones, setDropZones] = useState<DropZone[]>(questions[0].dropZones)
  const [draggedTerm, setDraggedTerm] = useState<Term | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [matches, setMatches] = useState<Match[]>([])
  const [score, setScore] = useState(initialScore)
  const [seconds, setSeconds] = useState(150) // 2:30 in seconds
  const [questionResults, setQuestionResults] = useState<{ [key: number]: Match[] }>({})

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleDragStart = (term: Term) => {
    setDraggedTerm(term)
  }

  const handleDragOver = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault()
    if (!draggedTerm) return

    setAvailableTerms((prev) => prev.filter((t) => t.id !== draggedTerm.id))

    setDropZones((prev) =>
      prev.map((zone) => {
        if (zone.id === zoneId) {
          const isCorrect = draggedTerm.correctZone === zone.id
          setMatches((prev) => [
            ...prev,
            {
              termId: draggedTerm.id,
              zoneId: zone.id,
              isCorrect,
            },
          ])
          if (isCorrect) {
            setScore((prevScore) => prevScore + 5)
          }
          return {
            ...zone,
            term: draggedTerm,
          }
        }
        return zone
      }),
    )

    setDraggedTerm(null)
  }

  const handleNextQuestion = () => {
    setQuestionResults({
      ...questionResults,
      [currentQuestion]: matches,
    })

    if (currentQuestion < questions.length - 1) {
      const nextQuestion = questions[currentQuestion + 1]
      setCurrentQuestion(currentQuestion + 1)
      setAvailableTerms(nextQuestion.terms)
      setDropZones(nextQuestion.dropZones)
      setMatches([])
    } else {
      setShowResults(true)
    }
  }

  const handleReset = () => {
    const currentQuestionData = questions[currentQuestion]
    setAvailableTerms(currentQuestionData.terms)
    setDropZones(currentQuestionData.dropZones)
    setMatches([])
  }

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-8">
        <h1 className="text-2xl font-bold mb-6">Drag and Drop Results</h1>

        {Object.entries(questionResults).map(([questionIndex, questionMatches]) => {
          const question = questions[Number.parseInt(questionIndex)]
          return (
            <div key={questionIndex} className="space-y-4 border-b pb-8">
              <h2 className="text-xl font-semibold">Question {Number.parseInt(questionIndex) + 1}</h2>
              <div className="space-y-4">
                {questionMatches.map((match, index) => {
                  const term = question.terms.find((t) => t.id === match.termId)
                  const zone = question.dropZones.find((z) => z.id === match.zoneId)

                  if (!term || !zone) return null

                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        match.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{term.content}</p>
                          <p className="text-sm text-muted-foreground">{zone.title}</p>
                        </div>
                        {match.isCorrect ? (
                          <div className="flex items-center text-green-500">
                            <CheckCircle2 className="h-5 w-5 mr-1" />
                            Right ✅
                          </div>
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        <div className="text-2xl font-bold mt-8 mb-4">Your total score: {score} / 80</div>

        <Button className="w-full bg-primary text-primary-foreground" onClick={() => onComplete(score)}>
          Finish Quiz
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen bg-background">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-medium">Course Preview</h1>
          <div className="w-8" />
        </div>

        <div className="space-y-6">
          <div className="flex justify-center gap-4 items-center mb-6">
            <div className="flex gap-1">
              {Array.from({ length: currentQuestion + 1 }).map((_, i) => (
                <div key={i} className="w-8 h-1 rounded-full bg-primary" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{formatTime(seconds)}</span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>Score: {score}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
          {dropZones.map((zone) => (
  <div
    key={zone.id}
    onDragOver={(e) => handleDragOver(e, zone.id)}
    onDrop={(e) => handleDrop(e, zone.id)}
    className="p-4 rounded-lg bg-secondary min-h-[100px] flex flex-col justify-between"
  >
    <p className="text-sm mb-2">{zone.title}</p>
    {zone.term && (
      <div className="bg-purple-400 shadow-sm rounded p-2 text-sm mt-auto text-white">
        {zone.term.content}
      </div>
    )}
  </div>
))}
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {availableTerms.map((term) => (
              <Button
                key={term.id}
                draggable
                onDragStart={() => handleDragStart(term)}
                className="bg-gray-900 text-white hover:bg-green-500"
              >
                {term.content}
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="icon" onClick={handleReset} className="rounded-full">
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-green-400"
              onClick={handleNextQuestion}
              disabled={availableTerms.length > 0}
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


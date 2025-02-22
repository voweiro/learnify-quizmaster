"use client";

import { useState } from "react";
import { Button } from "../component/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../component/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../component/ui/select";
import { Brain, Trophy, Clock, BarChart3, BookOpen, Award, Star } from "lucide-react";

interface Props {
  onStartQuiz: (subject: string, difficulty: string) => void;
}

const subjects = [
  { id: "science", name: "Science", icon: Brain },
  { id: "math", name: "Mathematics", icon: BarChart3 },
  { id: "english", name: "English", icon: BookOpen },
];

const difficulties = [
  { id: "beginner", name: "Beginner", icon: Star },
  { id: "intermediate", name: "Intermediate", icon: Award },
  { id: "advanced", name: "Advanced", icon: Trophy },
];

export default function Dashboard({ onStartQuiz }: Props) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [recentScores] = useState([
    { subject: "Science", score: 85, date: "2024-02-14" },
    { subject: "Mathematics", score: 92, date: "2024-02-13" },
    { subject: "English", score: 78, date: "2024-02-12" },
  ]);

  const handleStartQuiz = () => {
    setShowInstructions(true);
  };

  const confirmStartQuiz = () => {
    setShowInstructions(false);
    onStartQuiz(selectedSubject, selectedDifficulty);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col items-center justify-center pt-8 pb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome to QuizMaster</h1>
        <p className="text-muted-foreground">Test your knowledge and track your progress</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Start Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Choose a subject and difficulty to begin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Subject Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="min-w-[200px] hover:bg-red-500">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent className="absolute z-50 bg-white shadow-lg">
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      <div className="flex items-center gap-2">
                        <subject.icon className="h-4 w-4" />
                        {subject.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="min-w-[200px] hover:bg-red-500">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="absolute z-50 bg-white shadow-lg">
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty.id} value={difficulty.id}>
                      <div className="flex items-center gap-2">
                        <difficulty.icon className="h-4 w-4" />
                        {difficulty.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full hover:bg-green-500"
              disabled={!selectedSubject || !selectedDifficulty}
              onClick={handleStartQuiz}
            >
              Start Quiz
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Scores Card */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Scores</CardTitle>
            <CardDescription>Your latest quiz attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScores.map((score, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <div>
                    <p className="font-medium">{score.subject}</p>
                    <p className="text-sm text-muted-foreground">{score.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className={`h-4 w-4 ${score.score >= 90 ? "text-yellow-500" : "text-gray-400"}`} />
                    <span className="font-bold">{score.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>Your learning progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Best Score</span>
                </div>
                <span className="font-bold">92%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>Total Time</span>
                </div>
                <span className="font-bold">2.5 hrs</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-green-500" />
                  <span>Quizzes Completed</span>
                </div>
                <span className="font-bold">15</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Quiz Instructions</h2>
            <p className="mb-4">1. Read each question carefully before answering.</p>
            <p className="mb-4">2. You have 10 minutes to complete the quiz.</p>
            <p className="mb-4">3. No external help is allowed during the quiz.</p>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowInstructions(false)}>Cancel</Button>
              <Button onClick={confirmStartQuiz}>Start Quiz</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

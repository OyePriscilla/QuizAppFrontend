import { useState } from "react";
import mosesQuizData from "../data/MosesQuiz.json";
import ResultDetails from "../components/ResultDetails";
import axios from "axios";
import { baseUrl } from "../api/BaseUrls";
import { v4 as uuidv4 } from 'uuid';

type QuizItem = {
  question: string;
  options: string[];
  answer: string;
  userAnswer?: string;
};

const Quiz = () => {
  const username = localStorage.getItem("username");

  const getRandomQuestions = (count: number): QuizItem[] => {
    const shuffled = [...mosesQuizData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((q) => ({ ...q, userAnswer: "" }));
  };

  const [quizState, setQuizState] = useState<QuizItem[]>(() => getRandomQuestions(20));
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizDate, setQuizDate] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(900); // 15 minutes in seconds (900 seconds)

  //@ts-ignore
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // To store the interval ID

  const [resultData, setResultData] = useState<any>(null); // To store the result data

  const handleSelectAnswer = (questionIndex: number, selected: string) => {
    const updatedQuiz = [...quizState];
    updatedQuiz[questionIndex].userAnswer = selected;
    setQuizState(updatedQuiz);
  };

  const handleSubmit = async () => {
    let totalScore = 0;

    quizState.forEach((q) => {
      if (q.userAnswer === q.answer) {
        totalScore += 5;
      }
    });

    const result = {
      id: uuidv4(),
      username,
      score: totalScore,
      date: new Date().toISOString(),
      quizState,
    };

    setResultData(result); // Store the result data

    try {
      const response = await fetch(`${baseUrl}/api/quiz/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });

      const data = await response.json();

      if (response.ok) {
        setCompleted(true);
        setQuizScore(totalScore);
        setQuizDate(result.date);
        setMessage(`🎉 Quiz submitted! You scored ${totalScore} points!`);

        try {
          const response = await axios.post(
            `${baseUrl}/api/dashboard/save`,
            result
          );
          console.log("Quiz results saved successfully:", response.data);
        } catch (error) {
          console.error("Error submitting quiz results:", error);
        }
      } else {
        setMessage(data.message || "Something went wrong submitting your quiz.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setMessage("Failed to submit. Please try again.");
    }
  };

  const handleReadyToStart = (ready: boolean) => {
    setIsReady(ready);
    if (ready) {
      // Start the timer when the user is ready
      const id = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(id); // Stop the timer when it reaches 0
            handleSubmit(); // Auto-submit the quiz when time is up
            return 0;
          }
          return prev - 1; // Decrease the timer by 1 second
        });
      }, 1000); // Update every second
      setIntervalId(id);
    }
  };

  // Format time as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      {completed ? (
        <ResultDetails
          id={resultData.id}
          username={username || "Guest"}
          score={quizScore}
          date={quizDate}
          quizState={quizState}
        />
      ) : (
        <div>
         <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4 drop-shadow-md text-center">
  🧠 Bible Quiz Time!
</h1>
<p className="text-lg md:text-2xl mx-6 md:mx-24 text-gray-700 text-center mb-8">
  🎉 Hi{" "}
  <span className="text-purple-700 text-4xl font-bold">{username?.toUpperCase()}</span>,<br />
  Let’s have some fun while learning about the Bible! Answer each question and see how many you get right! 🌟
</p>
<p className="text-lg md:text-2xl mx-6 md:mx-24 text-gray-700 text-center mb-8">
  Here you can track your quiz results.
</p>


          {/* Prompt to ask if the student is ready to take the quiz */}
          {!isReady && (
            <div className="flex flex-col justify-center items-center space-y-6 mb-8">
              <p className="text-lg font-semibold text-gray-700 text-center">
                Are you ready to take the quiz?
              </p>

              <div className="flex space-x-6">
                <button
                  onClick={() => handleReadyToStart(true)}
                  className="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition duration-300"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleReadyToStart(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition duration-300"
                >
                  No
                </button>
              </div>

              <p className="text-lg font-semibold text-gray-700 text-center mt-6">
                You have 15 minutes to answer the 20 questions assigned to you.
                <br />
                All the Best!!! 🌟
              </p>
            </div>
          )}



          {/* Show the quiz container only if the student is ready */}
          {isReady && (
            <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 flex flex-col items-center px-4 py-10">

               {/* Timer display */}
          <div className="sticky top-21 z-50 text-end mr-16 items-end font-bold text-2xl text-blue-900
          ">
                Time Remaining: {formatTime(timer)}
              </div>
              {quizState.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-2xl mb-6 border-4 border-yellow-300"
                >
                  <h2 className="text-xl font-bold text-pink-600 mb-4">
                    🙋 Question {index + 1}:
                  </h2>
                  <p className="text-lg text-gray-800 mb-6">{item.question}</p>

                  <div className="grid gap-4 mb-6">
                    {item.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectAnswer(index, option)}
                        className={`${
                          quizState[index].userAnswer === option
                            ? "bg-purple-300"
                            : "bg-purple-100 hover:bg-purple-200"
                        } text-purple-700 font-semibold py-3 px-4 rounded-2xl transition-all border border-purple-300`}
                      >
                        {String.fromCharCode(65 + i)}. {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="w-full flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 shadow-lg mb-4"
                >
                  ✅ Submit Answers
                </button>
              </div>

              {message && (
                <p className="text-center text-xl font-semibold text-green-700">
                  {username}
                  {message}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;

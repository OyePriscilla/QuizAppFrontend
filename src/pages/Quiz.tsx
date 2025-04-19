import { useState } from "react";
import mosesQuizData from "../data/MosesQuiz.json";
import ResultDetails from "../components/ResultDetails";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

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

  const [quizState, setQuizState] = useState<QuizItem[]>(() =>
    getRandomQuestions(20)
  );
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizDate, setQuizDate] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(900);
  const navigate = useNavigate();
  //@ts-ignore
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [resultData, setResultData] = useState<any>(null);

  const handleSelectAnswer = (questionIndex: number, selected: string) => {
    const updatedQuiz = [...quizState];
    updatedQuiz[questionIndex].userAnswer = selected;
    setQuizState(updatedQuiz);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleSubmit = async () => {
    if (completed) return;

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

    setResultData(result);
    setCompleted(true);
    setQuizScore(totalScore);
    setQuizDate(result.date);
    setMessage(`🎉 Quiz submitted! You scored ${totalScore} points!`);

    try {
      await addDoc(collection(db, "quizResults"), result);
      console.log("Quiz result saved to Firestore");
    } catch (error) {
      console.error("Error saving result to Firestore:", error);
      setMessage("Failed to save your result. Try again.");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReadyToStart = (ready: boolean) => {
    setIsReady(ready);
    if (ready) {
      const id = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
    }
  };

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
          <div className="sticky top-0 z-50 bg-white mt-10 py-4 shadow-md">
            <h1 className="text-4xl md:text-4xl font-extrabold text-purple-700 mb-4 drop-shadow-md text-center">
              🧠 Bible Quiz Time!
            </h1>
            <p className="text-lg md:text-2xl mx-6 md:mx-24 text-gray-700 text-center mb-8">
              🎉 Hi{" "}
              <span className="text-purple-700 text-2xl font-bold">
                {username?.toUpperCase()}
              </span>
              ,<br />
              Let’s have some fun while learning about the Bible! 🌟
            </p>
          </div>

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
                  onClick={handleLogout}
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

          {isReady && (
            <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 flex flex-col items-center px-4 py-10">
              <div
                className={`sticky text-2xl top-64 z-50 mr-16 items-end font-bold ${
                  timer <= 120 ? "text-red-700 animate-pulse" : "text-red-600"
                }`}
              >
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

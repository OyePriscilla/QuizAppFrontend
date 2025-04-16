import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type QuizItem = {
  question: string;
  options: string[];
  answer: string;
  userAnswer?: string;
};

type QuizResult = {
  username: string;
  score: number;
  date: string;
  quizState: QuizItem[];
};

const Dashboard = () => {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [error, setError] = useState<string>("");
  const [showResult, setShowResult] = useState<number | null>(null); // Track the clicked quiz index
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      navigate("/signin");
    } else {
      const fetchQuizResults = async () => {
        try {
          const response = await axios.get(
            `https://bible-quiz-backend-wgy3.onrender.com/api/dashboard/${username}`
          );
          setQuizResults(response.data);
        } catch (error) {
          setError("Error fetching quiz results");
        }
      };

      fetchQuizResults();
    }
  }, [navigate]);

  const handleShowDetails = (index: number) => {
    setShowResult(showResult === index ? null : index); // Toggle quiz details visibility
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">User Dashboard</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {quizResults && quizResults.length > 0 ? (
        <div className="space-y-6">
          {quizResults.map((result, index) => (
            <div key={index}>
              <div
                onClick={() => handleShowDetails(index)}
                className="sticky top-0 bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800 hover:text-amber-500 transition-colors duration-300">
                    Quiz #{index + 1} - {result.username}
                  </h3>
                  <p className="text-lg font-semibold text-gray-500">
                    {new Date(result.date).toLocaleString()}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-xl font-bold text-gray-700">
                    Score:{" "}
                    <span className="text-green-500">{result.score}</span> /{" "}
                    {result.quizState.length * 5}
                  </p>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Click on this card for full details of your result
                </p>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleShowDetails(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
                  >
                    {showResult === index ? "Hide Details" : "Show Details"}
                  </button>
                </div>
              </div>

              {showResult === index && (
                <div className="space-y-4 mt-4">
                  {result.quizState.map((item, qIndex) => {
                    const isCorrect = item.userAnswer === item.answer;
                    return (
                      <div
                        key={qIndex}
                        className={`p-4 rounded-lg shadow-md border-2 ${
                          isCorrect
                            ? "border-green-400 bg-green-50"
                            : "border-red-400 bg-red-50"
                        }`}
                      >
                        <h3 className="text-lg font-semibold">{item.question}</h3>
                        <div className="mt-2 space-y-1">
                          {item.options.map((option, i) => {
                            const selected = item.userAnswer === option;
                            const correct = item.answer === option;
                            return (
                              <p
                                key={i}
                                className={`px-3 py-1 rounded-lg ${
                                  correct
                                    ? "bg-green-200 font-bold"
                                    : selected
                                    ? "bg-yellow-200"
                                    : "bg-gray-100"
                                }`}
                              >
                                {String.fromCharCode(65 + i)}. {option}
                              </p>
                            );
                          })}
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          <p>
                            <strong>Your Answer:</strong>{" "}
                            <span
                              className={
                                isCorrect ? "text-green-700" : "text-red-700"
                              }
                            >
                              {item.userAnswer || "No answer"}{" "}
                              {isCorrect ? "✅" : "❌"}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p>
                              <strong>Correct Answer:</strong>{" "}
                              <span className="text-green-700">
                                {item.answer}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No quiz results available</p>
      )}
    </div>
  );
};

export default Dashboard;

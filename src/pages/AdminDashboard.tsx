import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../api/BaseUrls";
import axios from "axios";

// Define types
type QuizItem = {
  question: string;
  options: string[];
  answer: string;
  userAnswer?: string;
};

type QuizResult = {
  id: string;
  username: string;
  score: number;
  date: string;
  quizState: QuizItem[];
};

const AdminDashboard = () => {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [showResult, setShowResult] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchQuizResults = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/results`);
      const sorted = response.data.sort(
        (a: QuizResult, b: QuizResult) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setQuizResults(sorted);
    } catch (error) {
      setError("Error fetching quiz results");
    }
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/signin");
    } else {
      fetchQuizResults();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/signin");
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      setError("Invalid ID. Cannot delete.");
      return;
    }
    try {
      await axios.delete(`${baseUrl}/api/results/${id}`);
      fetchQuizResults();
    } catch (err) {
      setError("Error deleting quiz result");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredResults = quizResults.filter((result) =>
    result.username.toLowerCase().includes(search.toLowerCase()) ||
    new Date(result.date).toLocaleDateString().includes(search)
  );

  const handleShowDetails = (index: number) => {
    setShowResult(showResult === index ? null : index);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by name or date"
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md w-full max-w-sm"
        />
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg"
        >
          Log Out
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {filteredResults.length > 0 ? (
        <div className="space-y-6">
          {filteredResults.map((result, index) => (
            <div key={result.id}>
              <div
                onClick={() => handleShowDetails(index)}
                className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
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
                    Score: <span className="text-green-500">{result.score}</span> /{" "}
                    {result.quizState.length * 5}
                  </p>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Click on this card for full details of the result
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleShowDetails(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
                  >
                    {showResult === index ? "Hide Details" : "Show Details"}
                  </button>

                  <button
                    onClick={() => handleDelete(result.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {showResult === index && (
                <div className="space-y-4 mt-4">
                  {result.quizState.map((item, qIndex) => {
                    const isCorrect = item.userAnswer === item.answer;
                    return (
                      <div
                        key={`${result.id}-${qIndex}`}
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
                            const optionKey = `${item.question}-${i}`;
                            return (
                              <p
                                key={optionKey}
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
                              className={isCorrect ? "text-green-700" : "text-red-700"}
                            >
                              {item.userAnswer || "No answer"}{" "}
                              {isCorrect ? "✅" : "❌"}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p>
                              <strong>Correct Answer:</strong>{" "}
                              <span className="text-green-700">{item.answer}</span>
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

export default AdminDashboard;

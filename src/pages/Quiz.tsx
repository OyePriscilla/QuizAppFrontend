import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResultDetails from "../components/ResultDetails";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

// Quiz JSON imports
import mosesQuizData from "../data/MosesQuiz.json";
import josephQuizData from "../data/JosephQuiz.json";
import adamQuizData from "../data/AdamQuiz.json";
import tacnHistoryData from "../data/TACNHistory.json";
import tacnHistory2Data from "../data/TACNHistory2.json";
import tenets from "../data/Tenets.json";

// John chapter groups
import John1_3 from "../data/John1_3.json";
import John4_6 from "../data/John4_6.json";
import John7_9 from "../data/John7_9.json";
import John10_12 from "../data/John10_12.json";
import John13_15 from "../data/John13_15.json";
import John16_18 from "../data/John16_18.json";
import John19_21 from "../data/John19_21.json";

type QuizItem = {
  chapter?: number;
  question: string;
  options: string[];
  answer: string;
  userAnswer?: string;
};

type ChapterGroup = {
  label: string;
  data?: QuizItem[];
};

const quizMap: Record<string, QuizItem[]> = {
  moses: mosesQuizData,
  joseph: josephQuizData,
  adam: adamQuizData,
  tacnhistory: tacnHistoryData,
  tacnhistory2: tacnHistory2Data,
  tenets: tenets,
  john: [], // handled separately
};

const johnGroupsMap: Record<string, QuizItem[]> = {
  "John 1-3": John1_3,
  "John 4-6": John4_6,
  "John 7-9": John7_9,
  "John 10-12": John10_12,
  "John 13-15": John13_15,
  "John 16-18": John16_18,
  "John 19-21": John19_21,
};

const Quiz = () => {
  const { character } = useParams();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const lowerChar = character?.toLowerCase() || "";
  const isJohnQuiz = lowerChar === "john";

  const [quizState, setQuizState] = useState<QuizItem[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<ChapterGroup | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDate, setQuizDate] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(1800);
  const [resultData, setResultData] = useState<any>(null);

  // Create John chapter groups array
  const chapterGroups: ChapterGroup[] = useMemo(() => {
    return Object.keys(johnGroupsMap).map((label) => ({
      label,
      data: johnGroupsMap[label],
    }));
  }, []);

  // Helper: get random questions
  const getRandomQuestions = (data: QuizItem[], count: number) => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((q) => ({ ...q, userAnswer: "" }));
  };

  // Load quiz questions based on selection
  useEffect(() => {
    if (!lowerChar || (!quizMap[lowerChar] && !isJohnQuiz)) {
      navigate("/select-quiz");
      return;
    }

    // Non-John quizzes load immediately
    if (!isJohnQuiz) {
      const questions = quizMap[lowerChar] || [];
      setQuizState(getRandomQuestions(questions, Math.min(100, questions.length)));
      setIsReady(true);
      return;
    }

    // John quizzes
    if (isJohnQuiz) {
      if (!selectedGroup) {
        setQuizState([]);
        setIsReady(false);
        return;
      }
      const groupQuestions = selectedGroup.data || [];
      setQuizState(getRandomQuestions(groupQuestions, Math.min(50, groupQuestions.length)));
      setIsReady(false); // force ready screen first
    }
  }, [lowerChar, selectedGroup, isJohnQuiz, navigate]);

  // Timer
  useEffect(() => {
    if (!isReady || completed) return;
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
    return () => clearInterval(id);
  }, [isReady, completed]);

  const handleSelectAnswer = (index: number, selected: string) => {
    setQuizState((prev) =>
      prev.map((q, i) => (i === index ? { ...q, userAnswer: selected } : q))
    );
  };

  const handleSelectGroup = (group: ChapterGroup) => {
    setSelectedGroup(group);
    setIsReady(false);
    setCompleted(false);
    setQuizState([]);
    setMessage("");
    setQuizScore(0);
    setQuizDate("");
    setTimer(1800);
  };

  const handleChangeGroup = () => {
    setSelectedGroup(null);
    setIsReady(false);
    setCompleted(false);
    setQuizState([]);
    setMessage("");
    setQuizScore(0);
    setQuizDate("");
    setTimer(900);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleSubmit = async () => {
    if (completed || quizState.length === 0) return;

    const totalScore = quizState.reduce(
      (acc, q) => (q.userAnswer === q.answer ? acc + 5 : acc),
      0
    );

    const result = {
      id: uuidv4(),
      username: username || "Guest",
      quizType: lowerChar,
      chapterGroup: isJohnQuiz ? selectedGroup?.label : null,
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
    } catch (error) {
      console.error("Error saving result:", error);
      setMessage("Failed to save your result. Try again.");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReadyToStart = () => setIsReady(true);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Render completed quiz
  if (completed && resultData) {
    return (
      <ResultDetails
        id={resultData.id}
        username={username || "Guest"}
        score={quizScore}
        date={quizDate}
        quizState={quizState}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100">
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md py-4 px-4 shadow-md">
        <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 text-center">
          🧠 Bible Quiz Time!
        </h1>
        <p className="text-base md:text-xl text-gray-700 text-center mt-3">
          🎉 Hi <span className="text-purple-700 font-bold">{username?.toUpperCase() || "GUEST"}</span>, let’s have fun learning 🌟
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* John chapter selection */}
        {isJohnQuiz && !selectedGroup && (
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border-4 border-purple-200">
            <h2 className="text-2xl md:text-3xl font-bold text-purple-700 text-center mb-4">
              Gospel of John
            </h2>
            <p className="text-center text-gray-700 mb-8">
              Choose a chapter group to start your quiz.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {chapterGroups.map((group) => (
                <button
                  key={group.label}
                  onClick={() => handleSelectGroup(group)}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold py-4 px-4 rounded-2xl border border-purple-300 shadow-sm transition"
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ready screen */}
        {isJohnQuiz && selectedGroup && !isReady && (
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border-4 border-yellow-300 text-center">
            <p className="text-lg font-semibold text-gray-700 mb-6">
              You selected {selectedGroup.label}. Are you ready to begin?
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <button
                onClick={handleReadyToStart}
                className="bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition duration-300 font-semibold"
              >
                Yes, Start Quiz
              </button>
              <button
                onClick={handleChangeGroup}
                className="bg-purple-500 text-white py-3 px-6 rounded-xl hover:bg-purple-600 transition duration-300 font-semibold"
              >
                Choose Another Group
              </button>
            </div>
            <p className="text-lg font-semibold text-gray-700">
              You have 30 minutes to answer 40 questions. All the best! 🌟
            </p>
          </div>
        )}

        {/* Quiz questions */}
        {quizState.length > 0 && isReady && (
          <div className="flex flex-col items-center">
            <div
              className={`sticky top-24 z-40 self-end mb-6 text-xl md:text-2xl font-bold ${
                timer <= 120 ? "text-red-700 animate-pulse" : "text-red-600"
              }`}
            >
              ⏰ Time Remaining: {formatTime(timer)}
            </div>

            {selectedGroup && (
              <div className="mb-6 bg-white px-6 py-3 rounded-2xl shadow text-purple-700 font-bold text-lg">
                📖 {selectedGroup.label}
              </div>
            )}

            {quizState.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-2xl mb-6 border-4 border-yellow-300"
              >
                <h2 className="text-xl font-bold text-pink-600 mb-4">
                  🙋 Question {index + 1}
                </h2>
                <p className="text-lg text-gray-800 mb-6">{item.question}</p>

                <div className="grid gap-4">
                  {item.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectAnswer(index, option)}
                      className={`${
                        quizState[index].userAnswer === option
                          ? "bg-purple-300"
                          : "bg-purple-100 hover:bg-purple-200"
                      } text-purple-700 font-semibold py-3 px-4 rounded-2xl transition-all border border-purple-300 text-left`}
                    >
                      {String.fromCharCode(65 + i)}. {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg mb-4"
            >
              ✅ Submit Answers
            </button>

            {message && (
              <p className="text-center text-lg font-semibold text-green-700">{message}</p>
            )}
          </div>
        )}

        {/* Fallback for empty state */}
        {isReady && quizState.length === 0 && (
          <p className="text-center text-gray-700 font-semibold">
            No questions available for this group.
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
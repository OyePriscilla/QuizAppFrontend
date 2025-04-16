import React from "react";

type QuizItem = {
  question: string;
  options: string[];
  answer: string;
  userAnswer?: string;
};

type ResultDetailsProps = {
  username: string;
  score: number;
  date: string;
  quizState: QuizItem[];
};

const ResultDetails: React.FC<ResultDetailsProps> = ({ username, score, date, quizState }) => {
    localStorage.setItem('username', username)
  return (
    <div className="bg-white min-h-screen p-6 print:p-4 print:bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 border-b-2 pb-4 print:border-none">
          <h1 className="text-4xl font-extrabold text-purple-600">🎉 Great Job, {username}!</h1>
          <p className="text-xl mt-2 text-gray-700">
            Score: <span className="font-bold text-green-600">{score}</span> / {quizState.length * 5}
          </p>
          <p className="text-sm text-gray-500">Date: {new Date(date).toLocaleString()}</p>
          <button
            onClick={() => window.print()}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 print:hidden mr-8"
          >
            🖨️ Print Result
          </button>
          <a href="/dashboard"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 print:hidden"
          >
            Click HERE or the Dashboard to check your result at a later time.
          </a>
        </div>

        {/* Question Cards */}
        <div className="space-y-6">
          {quizState.map((item, index) => {
            const isCorrect = item.userAnswer === item.answer;
            return (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-lg border-2 ${
                  isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
                }`}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  Q{index + 1}. {item.question}
                </h2>

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
                    <span className={isCorrect ? "text-green-700" : "text-red-700"}>
                      {item.userAnswer || "No answer"} {isCorrect ? "✅" : "❌"}
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

        {/* Footer */}
        <div className="text-center mt-12 print:hidden">
          <a
            href="/signin"
            className="text-lg text-blue-600 underline hover:text-blue-800"
          >
            🔁 Try Again
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultDetails;

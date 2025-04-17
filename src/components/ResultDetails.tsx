import React from "react";

type QuizItem = {
  question: string;
  options: string[];
  answer: string;
  userAnswer?: string;
};

type ResultDetailsProps = {
  id: string;
  username: string;
  score: number;
  date: string;
  quizState: QuizItem[];
};

const ResultDetails: React.FC<ResultDetailsProps> = ({
  //@ts-ignore
  id,
  username,
  score,
  date,
  quizState,
}) => {
  localStorage.setItem("username", username);

  const totalScore = quizState.length * 5; // Total score possible (5 points per question)

  // Determine the message based on the score
  const getScoreMessage = (score: number) => {
    if (score === totalScore) {
      return "🎉 Amazing! Perfect Score! Keep it up!";
    } else if (score >= 70) {
      return "Great job! You can do even better next time!";
    } else if (score >= 50) {
      return "Nice effort! Put more energy into the next quiz!";
    } else if (score >= 30) {
      return "You can get it right next time! Keep trying!";
    } else {
      return "Don't be discouraged, you're on the right track!";
    }
  };

  return (
    <div className="bg-white min-h-screen p-6 print:p-4 print:bg-white">
      <div className="max-w-3xl mx-auto mt-40">
        {/* Header */}
        <div className="text-center mb-10 border-b-2 pb-4 print:border-none">
          <h1 className="text-4xl font-extrabold text-purple-600">
            🎉 Great Job, {username}!
          </h1>
          <p className="text-xl mt-2 text-gray-700">
            Your Score is:{" "}
            <span className="font-bold text-green-600">
              {score} / {totalScore}
            </span>
          </p>
          <p className="text-sm text-gray-500">Date: {new Date(date).toLocaleString()}</p>

          {/* Conditional Score Message */}
          <p className="text-lg font-semibold text-purple-600 mt-4">
            {getScoreMessage(score)}
          </p>

          <button
            onClick={() => window.print()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 print:hidden mr-8"
          >
            🖨️ Print Result
          </button>

          <a
            href="/dashboard"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 print:hidden"
          >
            ✅ Check Result
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultDetails;

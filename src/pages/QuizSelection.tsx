import { useState } from "react";
import { useNavigate } from "react-router-dom";

// List of all characters with emojis
const characters = [
  { name: "Moses", emoji: "🧔‍♂️" },
  { name: "Joseph", emoji: "🧥" },
  { name: "Adam", emoji: "🍎" },
  { name: "Abraham", emoji: "🌟" },
  { name: "David", emoji: "🛡️" },
  { name: "Noah", emoji: "🛶" },
  { name: "Peter", emoji: "🎣" },
  { name: "Paul", emoji: "✝️" },
];

// Only characters with available quizzes
const availableQuizzes = ["Moses", "Joseph", "Adam"];

const SelectQuiz = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<boolean>(false);

  const handleCharacterClick = (character: string) => {
    if (availableQuizzes.includes(character)) {
      navigate(`/quiz/${character.toLowerCase()}`);
    } else {
      // Friendly alert if quiz isn't ready
      setMessage(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200">
      <div className="w-full max-w-md p-8 bg-white rounded-[30px] shadow-2xl border-4 border-yellow-300">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-4 font-[Comic Sans MS, cursive]">
          🎉 Bible Quiz Time!
        </h1>
        <p className="text-lg text-center text-purple-700 mb-6 font-semibold">
          Pick your hero and start the adventure!
        </p>
        <h2 className="text-lg text-center bg-purple-800 text-white mb-6 font-semibold p-2 rounded"> Note: Quiz is only available for Moses' and Joseph's Characters.</h2>
        {message && (
          <p className="mb-3 text-center text-red-600 font-bold">
            🚧 No quiz available for this Character yet. Kindly be patient while
            we prepare it! 😊
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          {characters.map((character) => (
            <button
              key={character.name}
              onClick={() => handleCharacterClick(character.name)}
              className="bg-yellow-200 text-indigo-800 font-bold rounded-xl py-4 px-2 text-lg shadow-md hover:scale-105 hover:bg-pink-200 transition-transform ease-in-out duration-200 border-2 border-indigo-300"
            >
              <span role="img" aria-label={character.name}>
                {character.emoji}
              </span>{" "}
              {character.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectQuiz;

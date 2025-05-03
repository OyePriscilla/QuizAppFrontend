import { Link } from "react-router-dom";
import video from "../video/Moses story.mp4";


const Home = () => {
  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-pink-600 mb-4 drop-shadow-md">
        ✨ Welcome to Bible Quiz!!! ✨
      </h1>

      <p className="text-lg md:text-xl text-gray-800 max-w-2xl mb-10 leading-relaxed font-medium">
        🎉 Test your knowledge of Bible stories, heroes, and fun facts! <br />
        Learn and grow with every question. Perfect for Sunday School, home
        study, or joyful playtime!
      </p>

      <div className="flex flex-col sm:flex-row gap-5 mb-12">
      <Link
          to="/Bible-story"
          className="bg-pink-400 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-pink-500 transition duration-300 shadow-lg"
        >
          📚 Read Bible Stories
        </Link>
        <Link
          to="/signin"
          className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-purple-700 transition duration-300 shadow-lg"
        >
          🚀 Start Quiz
        </Link>
      </div>

      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-700 mb-6">
        Meet our{" "}
        <span className="text-pink-600 font-bold">Bible Heros</span>{" "}
         Hooray!!! 🎊
      </h2>
      <video controls className="w-100 h-80 rounded-xl shadow-lg">
        <source src={video} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Home;

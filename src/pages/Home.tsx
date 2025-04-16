import { Link } from "react-router-dom";
// import moses from "../image/moses.png";

// const characters = [
//   {
//     name: "Moses",
//     img: {moses},
//   },
//   {
//     name: "Joseph",
//     img: {}
//   },
//   {
//     name: "Adam",
//     img: "https://cdn.pixabay.com/photo/2012/04/12/13/25/man-30357_1280.png",
//   },
//   {
//     name: "Abraham",
//     img: "https://cdn.pixabay.com/photo/2017/01/31/18/43/old-man-2024665_1280.png",
//   },
//   {
//     name: "David",
//     img: "https://cdn.pixabay.com/photo/2017/01/31/17/58/king-david-2024553_1280.png",
//   },
//   {
//     name: "Noah",
//     img: "https://cdn.pixabay.com/photo/2021/07/07/18/31/noah-6397412_1280.png",
//   },
//   {
//     name: "Peter",
//     img: "https://cdn.pixabay.com/photo/2017/12/22/16/11/st-peter-3037042_1280.png",
//   },
//   {
//     name: "Paul",
//     img: "https://cdn.pixabay.com/photo/2021/04/16/15/29/saint-paul-6172305_1280.png",
//   },
// ];

const Home = () => {
  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center px-4 py-12 text-center mt-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-pink-600 mb-4 drop-shadow-md">
        ✨ Welcome to Bible Quiz for Kids! ✨
      </h1>

      <p className="text-lg md:text-xl text-gray-800 max-w-2xl mb-10 leading-relaxed font-medium">
        🎉 Test your knowledge of Bible stories, heroes, and fun facts! <br />
        Learn and grow with every question. Perfect for Sunday School, home
        study, or joyful playtime!
      </p>

      <div className="flex flex-col sm:flex-row gap-5 mb-12">
        <Link
          to="/signin"
          className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-purple-700 transition duration-300 shadow-lg"
        >
          🚀 Start Quiz
        </Link>
        <Link
          to="/Bible-story"
          className="bg-pink-400 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-pink-500 transition duration-300 shadow-lg"
        >
          📚 Learn About the Bible
        </Link>
      </div>

      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-700 mb-6">
        Meet our <span className="text-pink-600 font-bold">Bible Heroes</span>{" "}
        selected for this week. Hooray!!! 🎊
      </h2>
    </div>
  );
};

export default Home;

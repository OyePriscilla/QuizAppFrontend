const Help = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-yellow-100 py-10 px-6 md:px-24 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-yellow-300">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-6 text-center">
          📘 Help & Navigation Guide
        </h1>

        <p className="text-lg text-gray-800 mb-6 text-center">
          Welcome to the Bible Quiz App! Follow this guide to navigate and enjoy
          your experience.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-3">
              1️⃣ Registering Your Account
            </h2>
            <p className="text-gray-700 text-lg">
              Before accessing the quiz, you need to{" "}
              <span className="font-semibold">register</span>. Choose a
              memorable username and password — it doesn't have to be your real
              name. This helps save and track your progress.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-3">
              2️⃣ Signing In
            </h2>
            <p className="text-gray-700 text-lg">
              After registration, use your chosen{" "}
              <span className="font-semibold">username</span> and{" "}
              <span className="font-semibold">password</span> to sign in. This
              unlocks your access to the quiz and dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-3">
              3️⃣ Reading the Bible Story
            </h2>
            <p className="text-gray-700 text-lg">
              We encourage you to read the Bible Story before taking the quiz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-3">
              4️⃣ Starting the Quiz
            </h2>
            <p className="text-gray-700 text-lg">
              After reading the story, you can start the quiz. Here's what you
              need to know:
              <ul className="list-disc pl-6 mt-2">
                <li>
                  🕒 You’ll have <span className="font-bold">15 minutes</span>{" "}
                  to complete the quiz.
                </li>
                <li>
                  🧠 Once you begin,{" "}
                  <span className="font-bold">
                    do not switch tabs or close the window
                  </span>
                  . The quiz will be auto-submitted if you do.
                </li>
                <li>
                  ✅ You can take the quiz{" "}
                  <span className="font-bold">as many times as you want but make sure to log out and log in again</span>.
                </li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-3">
              5️⃣ Viewing Results
            </h2>
            <p className="text-gray-700 text-lg">
              Your quiz scores are saved and viewable on the{" "}
              <span className="font-semibold">Dashboard</span> after each
              attempt.
            </p>
            <p className="text-gray-700 text-lg">
              You can only access the Dashboard when you logged in.{" "}
              <span className="font-semibold">Dashboard</span>
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-3">
              📞 Need Help?
            </h2>
            <p className="text-gray-700 text-lg">
              For further assistance, please contact:
              <ul className="list-disc pl-6 mt-2">
                <li>
                  📱 Phone: <span className="font-semibold">08036605211</span>
                </li>
                <li>
                  📧 Email:{" "}
                  <a
                    href="mailto:oyebadepriscilla22@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    oyebadepriscilla22@gmail.com
                  </a>
                </li>
              </ul>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Help;

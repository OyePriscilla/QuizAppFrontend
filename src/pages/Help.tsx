const Help = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-yellow-100 py-10 px-6 md:px-24 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-yellow-300">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-6 text-center">
          📘 Help & Navigation Guide
        </h1>

        <p className="text-lg text-gray-800 mb-6 text-center">
          Welcome to the Bible Quiz App! Follow this guide to navigate and enjoy your experience.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-3">
              1️⃣ Registering Your Account
            </h2>
            <p className="text-gray-700 text-lg">
              Before accessing the quiz, you need to <span className="font-semibold">register</span>.
              Use a username that looks like an email (e.g., <span className="font-semibold text-blue-600">marvin@gmail.com</span>).
              <br />
              <span className="text-red-600 font-semibold">
                It does NOT have to be a real or working email address.
              </span>
              <br />
              This format helps the app save and track your progress.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-3">
              2️⃣ Signing In
            </h2>
            <p className="text-gray-700 text-lg">
              After registration, use your chosen <span className="font-semibold">username</span> and{" "}
              <span className="font-semibold">password</span> to sign in.
              This unlocks access to the quiz and your dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-3">
              3️⃣ Reading the Bible Story
            </h2>
            <p className="text-gray-700 text-lg">
              We encourage you to read the Bible Story before taking the quiz to help you prepare better.
            </p>
          </section>
          <section>
  <h2 className="text-2xl font-bold text-pink-600 mb-3">
    📱 Accessing the Menu on Mobile
  </h2>
  <p className="text-gray-700 text-lg">
    On mobile devices, the main navigation menu is hidden to save space.
    <br />
    To access it:
    <ul className="list-disc pl-6 mt-2">
      <li>
        Look for the <span className="font-bold text-purple-700 text-lg">☰</span> button near the top-left corner of your screen.
      </li>
      <li>
        Tap this <span className="font-semibold"> ☰ menu icon</span> to open the sidebar.
      </li>
      <li>
        From the sidebar, you can navigate to stories like <span className="font-semibold">Moses, Joseph, Adam ...</span> and more.
      </li>
      <li>
        Tap the menu icon again or click outside the sidebar to close it.
      </li>
    </ul>
    This helps keep the interface clean and easy to use on smaller screens.
  </p>
</section>


          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-3">
              4️⃣ Starting the Quiz
            </h2>
            <p className="text-gray-700 text-lg">
              After reading the story, you can begin the quiz. Here’s what to expect:
              <ul className="list-disc pl-6 mt-2">
                <li>
                  🕒 You’ll have <span className="font-bold">15 minutes</span> to complete the quiz.
                </li>
                <li>
                  🧠 <span className="font-bold">Do not switch tabs or close the browser</span> during the quiz.
                  It will be auto-submitted if you do.
                </li>
                <li>
                  ✅ You can take the quiz <span className="font-bold">as many times as you want</span>,
                  but make sure to log out and log in again before each attempt.
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
              <span className="font-semibold">Dashboard</span> after each attempt.
              <br />
              You must be <span className="font-semibold">logged in</span> to view the dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-3">
              🔐 Forgot Password?
            </h2>
            <p className="text-gray-700 text-lg">
              If you forget your password, please <span className="font-bold text-red-600">call the phone number below</span> for help.
              We will assist you in recovering access.
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
                  📱 Phone: <span className="font-semibold text-blue-600">08036605211</span>
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

import React, { useState } from "react";

const BibleStory: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState("Moses");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentStory = stories.find(
    (story) => story.name === selectedCharacter
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Sidebar for larger screens */}
      <aside
        className={`w-64 bg-white shadow-md p-6 hidden md:block ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Bible Characters
        </h2>
        <ul className="space-y-4">
          {characters.map((character) => (
            <li key={character.name}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-purple-200 transition ${
                  selectedCharacter === character.name
                    ? "bg-purple-300 font-bold"
                    : ""
                }`}
                onClick={() => setSelectedCharacter(character.name)}
              >
                {character.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Sidebar Button */}
      <button
        className="md:hidden p-4 bg-purple-700 text-white fixed top-4 left-4 z-10 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
            📖 {selectedCharacter}'s Story
          </h1>

          {/* Show Story if Available */}
          {currentStory ? (
            <div className="space-y-8">
              {currentStory.sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-pink-300 hover:scale-[1.01] transition-all duration-300"
                >
                  <h2 className="text-2xl font-bold text-purple-800 mb-2">
                    {section.title}
                  </h2>
                  {section.scripture && (
                    <p className="text-sm text-gray-500 mb-2">
                      {section.scripture}
                    </p>
                  )}
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 mt-20">
              <p>Story for {selectedCharacter} is coming soon! 🚀</p>
            </div>
          )}
        </div>
      </main>

      {/* Sidebar for mobile screens */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md p-6 w-64 z-20 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Bible Characters
        </h2>
        <ul className="space-y-4">
          {characters.map((character) => (
            <li key={character.name}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-purple-200 transition ${
                  selectedCharacter === character.name
                    ? "bg-purple-300 font-bold"
                    : ""
                }`}
                onClick={() => setSelectedCharacter(character.name)}
              >
                {character.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BibleStory;

// Sidebar character list
const characters = [
  { name: "Moses" },
  { name: "Joseph" },
  { name: "Adam" },
  { name: "Abraham" },
  { name: "David" },
  { name: "Noah" },
  { name: "Peter" },
  { name: "Paul" },
];

// Stories data
const stories = [
  {
    name: "Moses",
    sections: [
      {
        title: "🧺👶 The Baby in the Basket",
        scripture: "📖 Exodus 1–2",
        content: `A long time ago, in Egypt, the king (called Pharaoh) saw that the Israelites were growing...`,
      },
      {
        title: "🏰👦 Moses Grows Up in the Palace",
        scripture: "📖 Exodus 2:10–15",
        content: `Moses grew up in Pharaoh’s palace like a prince 👑! ...`,
      },
      {
        title: "🏞️🌸 A New Life in Midian",
        scripture: "📖 Exodus 2:16–25",
        content: `In Midian, Moses sat by a well 💧...`,
      },
      {
        title: "🔥🌳 The Burning Bush",
        scripture: "📖 Exodus 3–4",
        content: `One day, while watching sheep on Mount Horeb ⛰️, Moses saw a bush on fire...`,
      },
      {
        title: "🛤️🏙️ Back to Egypt",
        scripture: "📖 Exodus 4:18–31",
        content: `Moses took his wife and sons and began the journey back to Egypt...`,
      },
      {
        title: "💬 Moses' Special Encounters with God",
        scripture: "",
        content: `Throughout his life, Moses had many amazing moments with God...`,
      },
      {
        title: "❤️ A Message for Children",
        scripture: "",
        content: `Moses didn’t feel brave or special—but God chose him anyway...`,
      },
    ],
  },
  {
    name: "Joseph",
    sections: [
      {
        title: "👶🎨 The Favorite Son with the Colorful Coat",
        scripture: "📖 Genesis 37:1–4",
        content: `Joseph was the son of Jacob and Rachel ❤️. He was Jacob’s favorite child, and to show his love, Jacob gave Joseph a beautiful coat of many colors 🌈. This made his brothers very jealous 😠.`,
      },
      {
        title: "🌾💤 Dreams and Jealousy",
        scripture: "📖 Genesis 37:5–11",
        content: `Joseph had special dreams 🛌 where his brothers’ bundles of grain bowed to his, and stars bowed to him too ⭐. His brothers didn’t like that and thought he was bragging 😤.`,
      },
      {
        title: "😠🕳️ Trouble in the Field",
        scripture: "📖 Genesis 37:12–28",
        content: `One day, Jacob sent Joseph to check on his brothers. They planned to hurt him 😟. Reuben said, “Let’s not kill him—let’s throw him in a pit!” 🕳️ Later, they sold him for 20 pieces of silver 💰 to travelers going to Egypt.`,
      },
      {
        title: "👕🐐 The Bloody Coat Trick",
        scripture: "📖 Genesis 37:29–35",
        content: `The brothers dipped Joseph’s colorful coat in goat’s blood 🐐 and told their father that Joseph had been killed 😢. Jacob was heartbroken 💔.`,
      },
      {
        title: "🏠💼 Joseph in Potiphar’s House",
        scripture: "📖 Genesis 39:1–6",
        content: `In Egypt, Joseph was sold to a man named Potiphar 🏛️. Joseph worked hard and became the overseer of Potiphar’s house 🧹. God was with him and helped him succeed 🙏.`,
      },
      {
        title: "🚪😳 Trouble with Potiphar’s Wife",
        scripture: "📖 Genesis 39:7–20",
        content: `Potiphar’s wife lied about Joseph 😢. Even though he ran away from trouble 🚪💨, she said he did something wrong. Potiphar believed her and threw Joseph in prison 🚔.`,
      },
      {
        title: "⛓️🍞 Dreams in Jail",
        scripture: "📖 Genesis 40",
        content: `In prison, Joseph met Pharaoh’s baker and cupbearer 🥖🍷. They had dreams, and Joseph told them what their dreams meant 😮. His words came true—but the cupbearer forgot about Joseph! 🙁`,
      },
      {
        title: "🐄🌾 Pharaoh’s Strange Dreams",
        scripture: "📖 Genesis 41:1–36",
        content: `Two years later, Pharaoh had strange dreams about skinny cows and fat cows 🐄, and thin grain swallowing fat grain 🌾. Joseph was called to explain them. He said the dreams meant seven years of plenty would come, followed by seven years of famine 🍽️.`,
      },
      {
        title: "👑💍 From Prisoner to Prince",
        scripture: "📖 Genesis 41:37–57",
        content: `Pharaoh was amazed 😲 and made Joseph the second most powerful man in Egypt! He gave Joseph a royal ring 💍, a new name—Zaphenath-Paneah 📛—and a wife named Asenath 💕. Joseph stored up grain to prepare for the famine.`,
      },
      {
        title: "🌍🌽 Visitors from Canaan",
        scripture: "📖 Genesis 42–43",
        content: `When the famine came, Joseph’s brothers came to Egypt to buy food 🍞. They didn’t recognize Joseph, but he knew who they were 😮. He tested them and kept Simeon as a hostage 🔐, asking them to bring Benjamin.`,
      },
      {
        title: "💔🍽️ The Silver Cup Trick",
        scripture: "📖 Genesis 44",
        content: `The brothers returned with Benjamin. But Joseph placed his silver cup 🏆 in Benjamin’s sack! Then he accused them of stealing 😲. Judah offered to take Benjamin’s place 💖.`,
      },
      {
        title: "😭🤗 The Big Reveal",
        scripture: "📖 Genesis 45",
        content: `Joseph couldn’t hide it anymore—he told them who he really was 😭. “I am Joseph!” he cried. His brothers were shocked 😯, but Joseph forgave them and said, “God used it all for good” 🙏.`,
      },
      {
        title: "🏡👨‍👩‍👦 Family Reunited in Goshen",
        scripture: "📖 Genesis 46–47",
        content: `Joseph brought his whole family to Egypt. They lived in a land called Goshen 🌾. Jacob was so happy to see his son again. Joseph kept them safe and fed during the famine ❤️.`,
      },
      {
        title: "👴🦴 A Final Wish",
        scripture: "📖 Genesis 50",
        content: `Joseph lived a long life—he died at 110 years old 👴. Before he died, he asked for his bones to be taken to Canaan someday 🦴. Many years later, Moses fulfilled that promise ✨.`,
      },
      {
        title: "💖 A Message for Children",
        scripture: "",
        content: `Even when people do wrong, God can use it for good 💡. Joseph trusted God and forgave his brothers. You can too! God has a big plan for your life—just like He did for Joseph ✨.`,
      },
    ],
  },
  {
    name: "Adam",
    sections: [
      {
        title: "👶🎨 WATCHOUT",
        scripture: "📖 Coming Soon",
        content: `........................`,
      },
    ],
  },
  {
    name: "Abraham",
    sections: [
      {
        title: "👶🎨 WATCHOUT",
        scripture: "📖 Coming Soon",
        content: `........................`,
      },
    ],
  },
  {
    name: "David",
    sections: [
      {
        title: "👶🎨 WATCHOUT",
        scripture: "📖 Coming Soon",
        content: `........................`,
      },
    ],
  },
  {
    name: "Noah",
    sections: [
      {
        title: "👶🎨 WATCHOUT",
        scripture: "📖 Coming Soon",
        content: `........................`,
      },
    ],
  },
  {
    name: "Peter",
    sections: [
      {
        title: "👶🎨 WATCHOUT",
        scripture: "📖 Coming Soon",
        content: `........................`,
      },
    ],
  },
  {
    name: "Paul",
    sections: [
      {
        title: "👶🎨 WATCHOUT",
        scripture: "📖 Coming Soon",
        content: `........................`,
      },
    ],
  },
];

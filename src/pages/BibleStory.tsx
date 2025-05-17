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
        className={` w-64 bg-white shadow-md p-6 hidden md:block ${
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

      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden p-2 bg-purple-700 text-white fixed top-50 left-4 z-110 rounded shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Main Story Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
            📖 {selectedCharacter}'s Story
          </h1>

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
        className={`fixed top-44 left-0 h-full bg-white shadow-md p-6 w-64 z-20 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center ml-8">
           Characters
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
                onClick={() => {
                  setSelectedCharacter(character.name);
                  setSidebarOpen(false);
                }}
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

// Character List
const characters = [
  { name: "Moses" },
  { name: "Joseph" },
  { name: "Adam" },
  { name: "Abraham" },
  { name: "David" },
  { name: "Noah" },
  { name: "Peter" },
];

// Stories Data
const stories = [
  {
    name: "Moses",
    sections: [
      {
        title: "🧺👶 The Baby in the Basket",
        scripture: "📖 Exodus 1–2",
        content: `A long time ago, in Egypt, the king (called Pharaoh) saw that the Israelites were growing in number and strength. He became afraid. He ordered all baby boys to be thrown into the Nile River 😢.

But one brave mother hid her baby for three months. When she couldn’t hide him anymore, she placed him in a basket and set it afloat on the river. Pharaoh’s daughter found him and named him Moses, which means “drawn out of the water.”`,
      },
      {
        title: "🏰👦 Moses Grows Up in the Palace",
        scripture: "📖 Exodus 2:10–15",
        content: `Moses grew up in Pharaoh’s palace like a prince 👑! But he knew he was really an Israelite. One day, he saw an Egyptian beating an Israelite and became very angry. Moses struck the Egyptian and ran away to the land of Midian.`,
      },
      {
        title: "🏞️🌸 A New Life in Midian",
        scripture: "📖 Exodus 2:16–25",
        content: `In Midian, Moses sat by a well 💧. He helped some women there, and their father Jethro invited him to stay. Moses married one of the daughters, Zipporah, and became a shepherd.`,
      },
      {
        title: "🔥🌳 The Burning Bush",
        scripture: "📖 Exodus 3–4",
        content: `One day, while watching sheep on Mount Horeb ⛰️, Moses saw a bush on fire—but it didn’t burn up! 🔥 God spoke from the bush and told Moses to go back to Egypt and lead His people out of slavery.`,
      },
      {
        title: "🛤️🏙️ Back to Egypt",
        scripture: "📖 Exodus 4:18–31",
        content: `Moses took his wife and sons and began the journey back to Egypt. God sent his brother Aaron to help him speak. They told the Israelites that God had heard their cries.`,
      },
      {
        title: "💬 Moses' Special Encounters with God",
        scripture: "",
        content: `Throughout his life, Moses had many amazing moments with God—parting the Red Sea 🌊, receiving the Ten Commandments 🪨, and talking to God face-to-face.`,
      },
      {
        title: "❤️ A Message for Children",
        scripture: "",
        content: `Moses didn’t feel brave or special—but God chose him anyway. God can use you, too, even if you feel small! 💫`,
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
        content: `In Egypt, Joseph was sold to Potiphar 🏛️. Joseph worked hard and became the overseer of Potiphar’s house 🧹. God was with him and helped him succeed 🙏.`,
      },
      {
        title: "🚪😳 Trouble with Potiphar’s Wife",
        scripture: "📖 Genesis 39:7–20",
        content: `Potiphar’s wife lied about Joseph 😢. Even though he ran away from trouble 🚪💨, she said he did something wrong. Potiphar believed her and threw Joseph in prison 🚔.`,
      },
      {
        title: "⛓️🍞 Dreams in Jail",
        scripture: "📖 Genesis 40",
        content: `In prison, Joseph met Pharaoh’s baker and cupbearer 🥖🍷. They had dreams, and Joseph told them what they meant 😮. His words came true—but the cupbearer forgot about Joseph! 🙁`,
      },
      {
        title: "🐄🌾 Pharaoh’s Strange Dreams",
        scripture: "📖 Genesis 41:1–36",
        content: `Two years later, Pharaoh had strange dreams about skinny cows and fat cows 🐄, and thin grain swallowing fat grain 🌾. Joseph explained the dreams meant seven years of plenty, then seven years of famine 🍽️.`,
      },
      {
        title: "👑💍 From Prisoner to Prince",
        scripture: "📖 Genesis 41:37–57",
        content: `Pharaoh was amazed 😲 and made Joseph the second most powerful man in Egypt! He gave him a royal ring 💍 and a wife named Asenath 💕. Joseph prepared Egypt for the famine.`,
      },
      {
        title: "🌍🌽 Visitors from Canaan",
        scripture: "📖 Genesis 42–43",
        content: `When the famine came, Joseph’s brothers came to buy food 🍞. They didn’t recognize Joseph 😮. He tested them and asked for Benjamin to be brought.`,
      },
      {
        title: "💔🍽️ The Silver Cup Trick",
        scripture: "📖 Genesis 44",
        content: `Joseph hid a silver cup 🏆 in Benjamin’s sack and accused them of stealing 😲. Judah offered to take Benjamin’s place 💖.`,
      },
      {
        title: "😭🤗 The Big Reveal",
        scripture: "📖 Genesis 45",
        content: `Joseph couldn’t hold it in anymore. “I am Joseph!” he said, crying 😭. His brothers were shocked, but Joseph forgave them 🙏.`,
      },
      {
        title: "🏡👨‍👩‍👦 Family Reunited in Goshen",
        scripture: "📖 Genesis 46–50",
        content: `Joseph invited his whole family to live in Egypt. Jacob saw his son again 💕. Joseph stayed faithful and said, “You meant it for harm, but God used it for good.” 🌟`,
      },
    ],
  },
  {
    name: "Adam",
    sections: [
      {
        title: "🐍🍎 The Sneaky Snake",
        scripture: "📖 Genesis 3:1–5",
        content: "A crafty serpent 🐍 came to Eve and asked, “Did God really say you can’t eat from any tree?” He twisted God’s words and made her question the truth 😕. He promised she would be like God if she ate the fruit 🍎, knowing good and evil 😯. The serpent sowed doubt and temptation."
      },
      {
        title: "👫🍏 The First Bite",
        scripture: "📖 Genesis 3:6–7",
        content: "Eve looked at the fruit—it was beautiful, tasty, and promised wisdom 🌟. She ate it and shared it with Adam 👫. Suddenly, they felt shame. They realized they were naked and tried to cover themselves with fig leaves 🍃. Their innocence was gone, and guilt entered the world 😔."
      },
      {
        title: "🌳👣 Hiding from God",
        scripture: "📖 Genesis 3:8–13",
        content: "God came walking in the garden 🌳 in the cool of the day. Adam and Eve hid from Him 😨. God called, “Where are you?” Adam said he was afraid because he was naked. God asked, “Who told you that?” Then came blame—Adam blamed Eve, and Eve blamed the serpent 🗣️. Sin had broken trust."
      },
      {
        title: "⚖️🐍 God’s Judgment",
        scripture: "📖 Genesis 3:14–19",
        content: "God spoke justice. He cursed the serpent to crawl forever 🐍. He said there would be hostility between the serpent and the woman’s offspring 🧬—a hint of future hope. Eve would face pain in childbirth 😣, and Adam would have to work hard for his food 🌾. The ground itself would be cursed. Sin brought sorrow into creation 😢."
      },
      {
        title: "👕🌍 Out of the Garden",
        scripture: "📖 Genesis 3:20–24",
        content: "God named the woman Eve, meaning ‘life,’ because she would become the mother of all living 🌱. He made clothes from animal skins for them 👕—a sign of His care, even in judgment. Then He sent them out of Eden 🌍 and placed a mighty angel with a flaming sword 🔥⚔️ to guard the tree of life. They were separated from paradise, but not from God's love 💔➡️❤️."
      },
      {
        title: "🔮🌟 A Promise of Hope",
        scripture: "📖 Genesis 3:15",
        content: "Even in the middle of the punishment, God made a promise—a child would one day crush the serpent’s head 🐍👣. This was the first hint of Jesus, the Savior who would defeat sin and death 🙏✝️. From the very beginning, God had a rescue plan 💡❤️."
      },
      {
        title: "🧭💭 Life After Eden",
        scripture: "📖 Reflection from Genesis 3",
        content: "Adam and Eve had to begin a new life outside Eden, full of hard work, sorrow, and change 🛤️. But God didn’t abandon them. He still watched over them. This story reminds us that even when we fall, God’s mercy and hope remain 🌈. The journey of redemption had begun."
      },
      {
        "title": "💌 Message for the Children",
        "scripture": "📖 From Genesis 3",
        "content": "Sometimes we make wrong choices, just like Adam and Eve did 😔. But God still loves us very much ❤️. He wants us to be honest, say sorry, and try again. Even when we mess up, God has a plan to help us and bring us back to Him 🌈. Jesus is part of that beautiful plan! So remember: God’s love never gives up on you 💫."
      }
    ]
  },
];

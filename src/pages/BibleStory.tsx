import React, { useState } from "react";

const BibleStory: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState("Moses");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentStory = stories.find(
    (story) => story.name === selectedCharacter
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Sidebar for desktop */}
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

      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden p-2 bg-purple-700 text-white fixed top-20 left-4 z-110 rounded shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Main content */}
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

      {/* Mobile sidebar */}
      <div
        className={`fixed top-44 left-0 h-full bg-white shadow-md p-6 w-64 z-20 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
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
  { name: "TACN-History" },
  { name: "John" },
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
        "content": "Sometimes we make wrong choices, just like Adam and Eve did 😔. But God still loves us very much ❤️. He wants us to be honest, say sorry, and try again. Even when we mess up, God has a plan to help us and bring us back to Him 🌈. Jesus is part of that beautiful plan! So remember: God’s love never gives up on you while still living 💫."
      }
    ]
  },
  {
    "name": "TACN-History",
    "sections": [
      {
        "title": "🌱⛪ The Beginning: The Precious Stone Society",
        "years": "1918",
        "scripture": "",
        "content": "In 1918, during the global influenza pandemic, a small prayer group emerged within the Anglican Church in Lagos. Led by Joseph Shadare and Sophia Odunlami, the group emphasized holiness, fervent prayer, divine healing, and reliance on the Holy Spirit. Their practices conflicted with Anglican traditions, leading to separation. This group became known as the Precious Stone Society, later called the Diamond Society."
      },
      {
        "title": "🤝📜 Affiliation with Faith Tabernacle (USA)",
        "years": "1922",
        "scripture": "",
        "content": "Seeking doctrinal guidance and external support, the Precious Stone Society affiliated with the Faith Tabernacle Congregation of Philadelphia, USA. The affiliation strengthened teachings on repentance, sanctification, baptism by immersion, and divine healing."
      },
      {
        "title": "🔥🌍 The Great Revival at Oke-Oye, Ilesa",
        "years": "1930",
        "scripture": "",
        "content": "In 1930, a powerful revival broke out at Oke-Oye, Ilesa, led by Evangelist Joseph Ayo Babalola. Miracles, mass repentance, and deliverance followed. Shrines were destroyed, and many turned fully to Christianity. The revival spread rapidly across Nigeria and drew attention from British colonial authorities."
      },
      {
        "title": "🇬🇧✈️ British Missionaries Arrive",
        "years": "1931",
        "scripture": "",
        "content": "On September 23, 1931, missionaries from The Apostolic Church, Bradford, UK—D.P. Williams, Andrew Turnbull, and W.J. Williams—arrived in Nigeria. Their presence brought legal protection, doctrinal clarity, and church structure under colonial law."
      },
      {
        "title": "📛📖 Adoption of the Name The Apostolic Church",
        "years": "1931",
        "scripture": "",
        "content": "In November 1931, the Nigerian movement adopted the name The Apostolic Church. Indigenous leaders including D.O. Odubanjo and I.B. Akinyele were ordained as pastors, formally establishing the church in Nigeria."
      },
      {
        "title": "⚠️✂️ How Christ Apostolic Church (CAC) Emerged",
        "years": "1939–1940",
        "scripture": "",
        "content": "As the church grew, tension arose over the doctrine of healing. British missionaries believed medicine could be used alongside prayer, calling it a gift from God. Indigenous revival leaders such as Joseph Ayo Babalola and I.B. Akinyele insisted on absolute divine healing without medicine. This disagreement led to a split in 1940. Those who followed Babalola formed the Christ Apostolic Church (CAC), while those who remained loyal to Apostolic governance continued as The Apostolic Church Nigeria (TACN)."
      },
      {
        "title": "🕊️🧱 Those Who Stayed: Strengthening TACN",
        "years": "1940–1945",
        "scripture": "",
        "content": "After the split, TACN faced reduced numbers but gained stronger unity and structure. Pastor S.G. Adegboyega emerged as a key stabilizing leader. Emphasis was placed on discipline, order, doctrinal consistency, and organized administration."
      },
      {
        "title": "🏗️🌍 Birth and Growth of LAWNA Territory",
        "years": "1945–1970",
        "scripture": "",
        "content": "The Lagos and Western/Northern Areas (LAWNA) Territory was formed to manage the rapidly growing work in Lagos, the West, and Northern Nigeria. Under the leadership of Pastor S.G. Adegboyega, LAWNA became known for strong leadership training, sound doctrine, evangelism, and church planting. Assemblies spread into urban centers, rural towns, and northern regions."
      },
      {
        "title": "📖👥 Early LAWNA Stories of Growth",
        "years": "1950–1980",
        "scripture": "",
        "content": "Early LAWNA pastors often traveled long distances by foot or bicycle to plant churches. Assemblies met under trees, in schools, and in family compounds. Strong emphasis was placed on prayer meetings, Bible teaching, discipline, and unity. LAWNA became the backbone of TACN’s numerical and administrative strength."
      },
      {
        "title": "🗺️🏛️ Territorial Expansion Nationwide",
        "years": "1970–2000",
        "scripture": "",
        "content": "Following LAWNA’s success, other territories were strengthened, including Igboland, Akwa Ibom, Cross River, and Maritime. Each territory adopted the Apostolic administrative model while adapting to local cultures."
      },
      {
        "title": "🏛️✨ The National Temple",
        "years": "2011",
        "scripture": "",
        "content": "In 2011, TACN dedicated the National Temple at Olorunda, Ketu, Lagos. Seating about 100,000 worshippers, it became a symbol of unity, sacrifice, and national presence."
      },
      {
        "title": "🔄👥 Generational Leadership Transition",
        "years": "2025",
        "scripture": "",
        "content": "In August 2025, a historic leadership transition occurred. Pastor (Dr.) Lawrence Oladele became National President, leading a new generation of leaders focused on reform, digital transformation, youth inclusion, and transparency."
      },
      {
        "title": "🌍🚀 TACN Today",
        "years": "2026",
        "scripture": "",
        "content": "Today, TACN stands firm as a Classical Pentecostal church rooted in Apostolic doctrine. Through the RAISE initiative—Reviving Apostolic Identity and Standards through Empowerment—the church continues to impact Nigeria spiritually, socially, and nationally."
      },
    ]
  },
   {
    name: "John",
    sections: [
      {
        title: "John 1–3",
        scripture: "📖 John 1–3",
        content: `In the beginning was the Word, and the Word was with God, and the Word was God. John the Baptist came to prepare the way for Jesus. Jesus calls His first disciples.`,
      },
      {
        title: "John 4–6",
        scripture: "📖 John 4–6",
        content: `Jesus meets the Samaritan woman at the well and teaches about living water. He heals the official's son and feeds 5000 people.`,
      },
      {
        title: "John 7–9",
        scripture: "📖 John 7–9",
        content: `Jesus teaches at the Feast of Tabernacles. He heals a man born blind and explains spiritual sight.`,
      },
      {
        title: "John 10–12",
        scripture: "📖 John 10–12",
        content: `Jesus proclaims He is the Good Shepherd. He raises Lazarus and enters Jerusalem triumphantly.`,
      },
      {
        title: "John 13–15",
        scripture: "📖 John 13–15",
        content: `Jesus washes His disciples' feet. He gives the new commandment of love and speaks about the vine and branches.`,
      },
      {
        title: "John 16–18",
        scripture: "📖 John 16–18",
        content: `Jesus comforts His disciples, warns about persecution, prays in Gethsemane, and is betrayed and arrested.`,
      },
      {
        title: "John 19–21",
        scripture: "📖 John 19–21",
        content: `The crucifixion and resurrection of Jesus. He appears to His disciples and commissions them to continue His work.`,
      },
    ],
  },
];

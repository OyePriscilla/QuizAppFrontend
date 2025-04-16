import React from 'react';

const BibleStory: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 mt-16">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">📘 The Story of Moses</h1>

      <div className="space-y-8 max-w-4xl mx-auto">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-pink-300 hover:scale-[1.01] transition-all duration-300"
          >
            <h2 className="text-3xl font-chewy text-purple-800 mb-4">{section.title}</h2>
            <p className="text-base font-nunito text-gray-800 leading-relaxed">{section.scripture}</p>
            <p className="text-purple-900 font-nunito whitespace-pre-line leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BibleStory;

const sections = [
  {
    title: '🧺👶 The Baby in the Basket',
    scripture: '📖 Exodus 1–2',
    content: `A long time ago, in Egypt, the king (called Pharaoh) saw that the Israelites were growing in number. He got scared and made them slaves 😢. He ordered that all baby boys born to Israelites should be killed 😱.

But a brave woman named Jochebed had a baby boy and knew he was special. She hid him for 3 months 👶. When she couldn’t hide him anymore, she put him in a waterproof basket and gently placed it on the river Nile 🌊.

📍The baby’s big sister, Miriam, watched nearby as the basket floated. Pharaoh’s daughter came to the river, saw the basket, and took pity on the crying baby 💗. She decided to raise him as her own—and named him Moses, which means “drawn out of water.”`,
  },
  {
    title: '🏰👦 Moses Grows Up in the Palace',
    scripture: '📖 Exodus 2:10–15',
    content: `Moses grew up in Pharaoh’s palace like a prince 👑! But he never forgot that he was an Israelite. One day, he saw an Egyptian hurting an Israelite slave 😠. Moses got angry and defended the man, but he ended up killing the Egyptian.

When Pharaoh found out, Moses got scared 😨 and ran away to the land of Midian.`,
  },
  {
    title: '🏞️🌸 A New Life in Midian',
    scripture: '📖 Exodus 2:16–25',
    content: `In Midian, Moses sat by a well 💧. He saw some shepherd girls being bullied, and he stood up for them. Their father, Jethro (also called Reuel), was so thankful that he invited Moses to stay.

Moses married one of Jethro’s daughters, Zipporah, and had two sons; Gershom and Eliezer 👨‍👩‍👦. He became a shepherd and lived a quiet life in the mountains.`,
  },
  {
    title: '🔥🌳 The Burning Bush',
    scripture: '📖 Exodus 3–4',
    content: `One day, while watching sheep on Mount Horeb ⛰️, Moses saw a bush on fire—but it didn’t burn up! 🔥🌿

He went closer and heard a voice:

“Moses! Moses!”

It was God speaking from the bush 😮!

God told Moses He had heard the cries of the Israelites and wanted to set them free. God chose Moses to lead His people out of Egypt! 🕊️

Moses was scared and didn’t think he was the right person. He said things like:

“What if they don’t believe me?”\n“I can’t speak well!”\n“Please send someone else!”

But God promised,

“I will be with you.” 🙏

He even gave Moses signs:\n✅ His staff turned into a snake 🐍\n✅ His hand became leprous and healed again ✋\n✅ Water turned into blood 🩸

So, Moses finally said “Yes.”`,
  },
  {
    title: '🛤️🏙️ Back to Egypt',
    scripture: '📖 Exodus 4:18–31',
    content: `Moses took his wife and sons and began the journey back to Egypt. Along the way, his brother Aaron met him and joined him 👬.

Together, they would face Pharaoh and say these powerful words:

“Let my people go!” ✊`,
  },
  {
    title: '💬 Moses\' Special Encounters with God',
    scripture: '',
    content: `Throughout his life, Moses had many amazing moments with God:

🌿 Burning bush – God calls him (Exodus 3)\n⛓️ In Egypt – God speaks to him and Aaron (Exodus 6–12)\n🌊 Parting the Red Sea – God shows power (Exodus 14)\n⛰️ Mount Sinai – God gives him the Ten Commandments (Exodus 20)\n🏕️ Tent of Meeting – God speaks with Moses as a friend speaks to a friend (Exodus 33:11)`,
  },
  {
    title: '❤️ A Message for Children',
    scripture: '',
    content: `Moses didn’t feel brave or special—but God chose him anyway. He listened, obeyed (even when it was hard), and God used him in amazing ways 💪✨.

Just like Moses, God can use YOU to do great things! \n The story of Moses teaches children about God's faithfulness, leadership, and the importance of listening to and trusting God, even when faced with challenges. It highlights God's protection, power, and plan for his people, and shows how God can use even broken individuals to achieve his purposes.
The story also emphasizes the importance of obeying God's commands and seeking his will in our lives. `,
  },
];

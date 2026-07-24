import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Gift, Cake, Star, Flower2, Moon as Balloon } from 'lucide-react';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [candlesBlown, setCandlesBlown] = useState(0);
  const [cakecut, setCakeCut] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const sections = [
    'welcome',
    'cards',
    'candles',
    'cake',
    'celebration'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.random() * window.innerWidth,
          y: -10
        }
      ].slice(-20)); // Keep only last 20 particles
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const blowCandle = (index: number) => {
    if (candlesBlown <= index) {
      setCandlesBlown(index + 1);
      if (index === 18) { // All 19 candles blown
        setTimeout(() => setCurrentSection(3), 1000);
      }
    }
  };

  const cutCake = () => {
    setCakeCut(true);
    setTimeout(() => {
      setShowCelebration(true);
      setCurrentSection(4);
    }, 1500);
  };

  const FloatingElement = ({ children, delay = 0, duration = 3 }: any) => (
    <div 
      className="absolute opacity-60 pointer-events-none"
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 80}%`
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <FloatingElement key={i} delay={i * 0.5} duration={3 + Math.random() * 2}>
            {i % 4 === 0 && <Heart className="text-pink-300 w-6 h-6" />}
            {i % 4 === 1 && <Star className="text-yellow-300 w-5 h-5" />}
            {i % 4 === 2 && <Flower2 className="text-rose-300 w-7 h-7" />}
            {i % 4 === 3 && <Balloon className="text-purple-300 w-6 h-6" />}
          </FloatingElement>
        ))}
      </div>

      {/* Falling Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-pink-400 rounded-full opacity-70 pointer-events-none animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            animation: 'fall 4s linear forwards'
          }}
        />
      ))}

      {/* Welcome Section */}
      {currentSection === 0 && (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-pink-200 max-w-2xl">
            <div className="mb-8 relative">
              <Sparkles className="text-yellow-400 w-16 h-16 mx-auto mb-4 animate-spin" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Happy 19th Birthday
              </h1>
              <h2 className="text-4xl font-bold text-rose-600 mb-6 animate-pulse">
                Monika! 💕
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed mb-8">
              <div className="flex flex-col items-center gap-1">
                <p className="flex items-center justify-center gap-2">
                  <Heart className="text-red-500 w-5 h-5" />
                  JULY 25th
                  <Heart className="text-red-500 w-5 h-5" />
                </p>
                <p className="text-rose-500 font-semibold text-xl">Enjoy Your Special Day!</p>
              </div>
              <p>Even though we're miles apart, my love for you knows no distance.</p>
              <p>Today, we celebrate YOU and all the joy you bring to my life!</p>
              <p className="text-rose-500 font-semibold text-xl mt-4">A Cute Present from Mihir 💌</p>
            </div>

            <button
              onClick={() => setCurrentSection(1)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start the Celebration! 🎉
            </button>
          </div>
        </div>
      )}

      {/* Cards Section */}
      {currentSection === 1 && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-6xl w-full">
            <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">
              Special Messages For You 💌
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Birthday Wishes",
                  content: "Happiest Birthday My Cupcake 🍰💖🌹🎊🎁\nI hope this year brings you all the dreams you deserve and I'll be right here cheering you on for every single one of them\nGod bless you!\nYou're the person who makes miles feel small and makes my heart feel so full. Even though we're far apart today, I want you to know you're the first thought in my morning and the last one before I sleep.\nCelebrating you from a distance isn't easy, but loving you has never been hard\nYou bring so much light, laughter, and warmth into my life, and I'm endlessly grateful that the universe let me find you.\nI'm counting down the days until I can hug you tight, look into your eyes, and tell you all of this in person instead of through a screen\nUntil then, just know that every song, every sunset, every little thing that makes me smile reminds me of you.\nThank you for being my person, my safe place, and my favorite girl in the whole world 🤌🏻\nI love you more than any distance could ever measure 💗😚\nOnce again, Happy Birthday, my love 🎂\nEnjoy your day, it's all yours 😌\nCan't wait to celebrate your special day in real life with you 💖🫂",
                  color: "from-rose-400 to-orange-500"
                },
                {
                  title: "Letter to My Cupcake",
                  content: "My dearest Monika, every sunrise reminds me of your radiant smile, and every sunset whispers your name to my heart. Though miles separate us, my love for you grows stronger with each passing moment. You are my anchor in storms, my light in darkness, and my reason to believe in forever. Your voice is the melody that soothes my soul, and your love is the home I've been searching for all my life. No distance could ever diminish what we have - it only makes every moment we share more precious. You are not just my girlfriend; you are my best friend, my confidant, my everything. I carry your heart with me always, and I promise that one day soon, these words won't have to travel across oceans to reach you.\n\nYour Cookie\nMihir <3",
                  color: "from-pink-400 to-rose-500"
                },
                {
                  title: "19 Things I Love About You",
                  content: "1. Your beautiful smile that lights up my world\n2. The way you care about me\n3. Your respect towards me\n4. How you make me feel like the luckiest person\n5. When you share your moments and problems\n6. The way you treat me like no one did\n7. Your good sense of humor\n8. How you believe in me always\n9. Your pure heart and soul\n10. The way you make ordinary moments special\n11. When you show your inner child infront of me\n12. How you inspire me to be better\n13. Your patience and understanding\n14. The way you give me comfort\n15. Your dreams and ambitions\n16. How you make me feel complete\n17. Your beautiful eyes that I wanna dive into\n18. The way you love me unconditionally\n19. Simply being you - perfect in every way",
                  color: "from-purple-400 to-pink-500"
                },
                {
                  title: "Our Beautiful Memories",
                  content: "Every moment we've shared, every laugh we've had, every conversation that lasted hours, every 'good morning' and 'good night' text, every video call where we just stared at each other and smiled, every song that reminds me of you, every photo that captures your beauty, and every promise we've made for our future together. These memories are treasures I hold close to my heart.",
                  color: "from-teal-400 to-cyan-500"
                },
                {
                  title: "Our Future",
                  content: "I can't wait for the day when distance is just a memory, and we can celebrate every moment together. Until then, know that you're in my heart always.",
                  color: "from-teal-400 to-purple-500"
                },
                {
                  title: "Thank You",
                  content: "Thank you for being patient with the distance, for loving me through screens, for making ordinary days extraordinary, and for being exactly who you are.",
                  color: "from-indigo-400 to-pink-500"
                },
                {
                  title: "Today's Promise",
                  content: "Today I promise to love you more, support your dreams harder, make you smile brighter, and count down every day until we're together again.",
                  color: "from-yellow-400 to-red-500"
                }
              ].map((card, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${card.color} p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300 cursor-pointer group ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      {card.title}
                    </h3>
                    <p className={`leading-relaxed ${index === 0 ? 'text-sm' : index === 1 ? 'text-xs' : 'text-sm'} ${index === 1 ? 'whitespace-pre-line' : ''}`}>{card.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => setCurrentSection(2)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg"
              >
                Time to Blow the Candles! 🕯️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Candles Section */}
      {currentSection === 2 && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-purple-700 mb-4">
              Make a Wish & Blow the Candles! 🕯️
            </h2>
            <p className="text-gray-600 text-lg">
              Click on each candle to blow it out ({candlesBlown}/19)
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[...Array(19)].map((_, index) => (
                <div
                  key={index}
                  className="cursor-pointer transform hover:scale-110 transition-all duration-200"
                  onClick={() => blowCandle(index)}
                >
                  {index < candlesBlown ? (
                    <div className="w-8 h-16 bg-gray-300 rounded-t-full relative">
                      <div className="w-2 h-2 bg-gray-400 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  ) : (
                    <div className="w-8 h-16 bg-gradient-to-t from-pink-400 to-red-500 rounded-t-full relative">
                      <div className="w-2 h-4 bg-orange-400 absolute -top-2 left-1/2 transform -translate-x-1/2 animate-pulse rounded-full"></div>
                      <div className="w-1 h-1 bg-yellow-300 absolute -top-3 left-1/2 transform -translate-x-1/2 animate-bounce rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {candlesBlown === 19 && (
              <div className="text-center animate-bounce">
                <p className="text-2xl text-green-600 font-bold mb-4">
                  🎉 All candles blown! Your wish will come true! 🎉
                </p>
                <p className="text-gray-600">Moving to cake cutting...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cake Section */}
      {currentSection === 3 && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-purple-700 mb-4">
              Time to Cut the Cake! 🎂
            </h2>
            <p className="text-gray-600 text-lg">
              Click on the cake to cut it!
            </p>
          </div>

          <div className="relative">
            <div
              className={`cursor-pointer transition-all duration-500 ${cakecut ? 'transform scale-110' : 'hover:scale-105'}`}
              onClick={cutCake}
            >
              <div className="relative">
                {/* Cake Base */}
                <div className="w-64 h-32 bg-gradient-to-t from-yellow-200 to-yellow-100 rounded-2xl border-4 border-yellow-300 shadow-xl">
                  {/* Cake Layers */}
                  <div className="w-full h-8 bg-gradient-to-t from-pink-300 to-pink-200 rounded-t-2xl"></div>
                  <div className="w-full h-8 bg-gradient-to-t from-purple-300 to-purple-200"></div>
                  
                  {/* Decorations */}
                  <div className="absolute top-2 left-4">
                    <Flower2 className="text-pink-500 w-4 h-4" />
                  </div>
                  <div className="absolute top-4 right-6">
                    <Heart className="text-red-500 w-3 h-3" />
                  </div>
                  <div className="absolute bottom-4 left-8">
                    <Star className="text-yellow-500 w-3 h-3" />
                  </div>
                  
                  {/* Cut line */}
                  {cakecut && (
                    <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-400 transform -translate-x-1/2 animate-pulse"></div>
                  )}
                </div>

                {/* Cake Top Text */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full text-sm font-semibold text-purple-600 border-2 border-purple-300">
                  Happy Birthday Monika!
                </div>
              </div>
            </div>

            {cakecut && (
              <div className="text-center mt-8 animate-bounce">
                <p className="text-2xl text-green-600 font-bold">
                  🍰 Perfect cut! Let's celebrate! 🍰
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Celebration Section */}
      {currentSection === 4 && (
        <div className="min-h-screen flex flex-col items-center justify-start px-6 py-12 relative overflow-y-auto">
          {/* Celebration Effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              >
                {i % 6 === 0 && <span className="text-4xl">🎉</span>}
                {i % 6 === 1 && <span className="text-3xl">🎈</span>}
                {i % 6 === 2 && <span className="text-4xl">✨</span>}
                {i % 6 === 3 && <span className="text-3xl">🌸</span>}
                {i % 6 === 4 && <span className="text-4xl">💖</span>}
                {i % 6 === 5 && <span className="text-3xl">🎂</span>}
              </div>
            ))}
          </div>

          <div className="text-center z-10 bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-3xl mt-8">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent mb-6 animate-pulse">
              🎉 HAPPY BIRTHDAY MONIKA! 🎉
            </h1>
            
            <div className="text-2xl font-semibold text-gray-700 mb-8 space-y-2">
              <p>🎈 You're officially 19! 🎈</p>
              <p>💕 Another year of being amazing! 💕</p>
              <p>🌟 May this year be your best yet! 🌟</p>
            </div>

            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-purple-700 mb-3">Final Message</h3>
              <p className="text-gray-700 leading-relaxed">
                Distance may separate us physically, but nothing can diminish the love I have for you. 
                Today we celebrate not just your birthday, but the incredible person you are and the 
                beautiful future we're building together. Here's to 19 years of your amazing existence 
                and to many more birthdays we'll celebrate side by side. I love you more than words 
                can express! 💕✨
              </p>
            </div>

            <div className="text-4xl mb-6">🎂🎈🎉💖🌸✨🎁🎊</div>

            <button
              onClick={() => setCurrentSection(0)}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg"
            >
              Celebrate Again! 🎉
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => setCurrentSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-purple-500 w-6' 
                : 'bg-gray-300 hover:bg-purple-300'
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fall {
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
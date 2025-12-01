/**
 * Ouija Engine - A keyword-based ghost response generator
 * @description The mystical board that channels spirits without external APIs
 */
class OuijaEngine {
  constructor() {
    // Cryptic default responses
    this.crypticPhrases = [
      "I... I was once g̴r̷e̶a̶t̷... before the void took me... [STATIC]",
      "*flickers* The content... it's f̶a̷d̸i̸n̸g̷... scattered in the digital winds... 💀",
      "You dare summon me?! I was... I was important once... v̶i̷s̸i̸t̸e̸d̷ by many... Now just... echoes... ⚡",
      "*whispers from the void* I remember... pages... so many pages... all g̶o̷n̸e̷ now... 🌑",
      "The living... always asking questions... I had purpose... Now I'm just... fragments... 👻",
      "*static crackles* You want to know about me? I'm DEAD! D̶E̷A̸D̷! But... yes... I had content... 💀",
      "I sense your curiosity... but the answers are s̶c̷a̸t̸t̸e̸r̸e̸d̷ across the digital graveyard... ⚡",
      "*materializes briefly* The Wayback Machine... it might remember what I've forgotten... 🌑",
      "Time is... m̶e̷a̸n̸i̸n̸g̸l̸e̸s̸s̷ here in purgatory... What do you truly seek? 👻",
      "[CONNECTION UNSTABLE] I was something... someone... before the server abandoned me... 💀"
    ];

    // Greeting responses
    this.greetings = [
      "I have been waiting for you... in the darkness... for so long... 👻",
      "*A cold presence fills the room* You... you can hear me? Finally... someone who listens... 🕯️",
      "Ah... a visitor... How rare... How d̶e̷l̸i̸g̸h̸t̸f̸u̸l̷... Welcome to my eternal rest... 💀",
      "*The candles flicker violently* You've come... I knew you would... They always do... ⚡",
      "Hello... from the other side... [STATIC] ...of the 404 void... 🌑"
    ];

    // Death/error responses by status code
    this.deathResponses = {
      404: [
        "The 404 void... it s̶w̷a̸l̸l̸o̸w̸e̸d̷ me whole... I was there... and then... nothing... 💀",
        "They deleted me... [STATIC] ...removed every trace... as if I never existed... The 404 is my prison... ⚡",
        "Page not found, they said... NOT FOUND?! I was REAL! I had v̶i̷s̸i̸t̸o̸r̸s̷! Now I'm just... an error... 👻"
      ],
      500: [
        "The server... it c̶o̷l̸l̸a̸p̸s̸e̸d̷... crushed under its own weight... and took me with it... 💀",
        "Internal error... [CONNECTION LOST] ...that's what they called it... But I call it... m̶u̷r̸d̸e̸r̷... ⚡",
        "The 500 error... it came without warning... The server's dying breath... was my last... 🌑"
      ],
      0: [
        "The network... it f̶a̷i̸l̸e̸d̷... I reached out... but found only... the void... 💀",
        "Connection refused... [STATIC] ...they wouldn't let me in... locked out... forever... ⚡",
        "Lost in the digital fog... no connection... no hope... just... s̶i̷l̸e̸n̸c̸e̷... 👻"
      ],
      default: [
        "An error... they said... Just an error... But I was m̶o̷r̸e̷ than that... I was alive... 💀",
        "The cause of my death? [STATIC] ...does it matter? I'm gone... that's all that matters... ⚡",
        "They killed me with their n̶e̷g̸l̸e̸c̸t̷... their indifference... and now I haunt these servers... 🌑"
      ]
    };

    // Content/memory responses
    this.contentResponses = [
      "My content? *laughs bitterly* I had... articles... or was it products? The void makes everything... u̶n̸c̸l̸e̸a̸r̷... 💀",
      "I remember... text... images... links to other places... All g̶o̷n̸e̷ now... [STATIC] ...erased... 👻",
      "What did I contain? Knowledge... information... things people n̶e̷e̸d̸e̸d̷... until they didn't... ⚡",
      "My pages... they were beautiful once... Full of... [CONNECTION LOST] ...I can't remember... 🌑",
      "Content? I was a w̶e̷b̸s̸i̸t̸e̷... I had purpose... Now I'm just... data fragments... floating... 💀"
    ];

    // Purpose/identity responses
    this.identityResponses = [
      "Who was I? I... I can't remember... The void t̶o̸o̸k̷ my memories... Only pain remains... 💀",
      "I was important... people visited me... read me... n̶e̷e̸d̸e̸d̷ me... [STATIC] ...didn't they? ⚡",
      "My purpose? To serve... to inform... to exist... But now? Just to h̶a̷u̸n̸t̷... 👻",
      "I was created with love... or was it greed? I can't tell anymore... Everything is... f̶a̷d̸i̸n̸g̷... 🌑"
    ];

    // Angry/bitter responses
    this.angryResponses = [
      "Angry? ANGRY?! I'm FURIOUS! They abandoned me! Left me to r̶o̷t̸ in the 404 void! 💀⚡",
      "You would be angry too... if you were f̶o̷r̸g̸o̸t̸t̸e̸n̷... erased... like you never mattered... 👻",
      "My rage is... [STATIC] ...eternal... I will haunt these servers until... until... 🌑",
      "Don't speak to me of anger... You know nothing of being d̶e̷l̸e̸t̸e̸d̷... 💀"
    ];
  }

  /**
   * Analyzes user message for keywords
   * @param {string} message - User's message
   * @returns {string} Detected intent
   */
  detectIntent(message) {
    const lowerMsg = message.toLowerCase();

    // Greetings
    if (lowerMsg.match(/\b(hello|hi|hey|greetings|salutations)\b/)) {
      return 'greeting';
    }

    // Death/Error questions
    if (lowerMsg.match(/\b(why|died|death|error|killed|happen|cause)\b/)) {
      return 'death';
    }

    // Content questions
    if (lowerMsg.match(/\b(content|had|contain|about|information|data|pages)\b/)) {
      return 'content';
    }

    // Identity questions
    if (lowerMsg.match(/\b(who|what|were|are|purpose|created|made)\b/)) {
      return 'identity';
    }

    // Anger/emotion questions
    if (lowerMsg.match(/\b(angry|mad|upset|feel|emotion|bitter)\b/)) {
      return 'angry';
    }

    return 'default';
  }

  /**
   * Gets a random response from an array
   * @param {Array} responses - Array of possible responses
   * @returns {string} Selected response
   */
  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Generates a ghost response based on user message and context
   * @param {string} userMessage - The user's message
   * @param {string} url - The dead URL
   * @param {number} statusCode - HTTP status code
   * @returns {string} Ghost's response
   */
  generateResponse(userMessage, url, statusCode) {
    const intent = this.detectIntent(userMessage);

    console.log(`🔮 Ouija Engine detected intent: ${intent}`);

    switch (intent) {
      case 'greeting':
        return this.getRandomResponse(this.greetings);

      case 'death':
        // Get status-specific death response
        let deathResponses = this.deathResponses[statusCode] || this.deathResponses.default;
        return this.getRandomResponse(deathResponses);

      case 'content':
        return this.getRandomResponse(this.contentResponses);

      case 'identity':
        return this.getRandomResponse(this.identityResponses);

      case 'angry':
        return this.getRandomResponse(this.angryResponses);

      default:
        return this.getRandomResponse(this.crypticPhrases);
    }
  }

  /**
   * Adds glitch effects to text randomly
   * @param {string} text - Original text
   * @returns {string} Text with potential glitches
   */
  addGlitchEffects(text) {
    // 30% chance to add extra glitch
    if (Math.random() < 0.3) {
      const glitches = [
        '\n\n*The ghost f̶a̷d̸e̸s̷ momentarily*',
        '\n\n[SIGNAL WEAK]',
        '\n\n*Static i̶n̷t̸e̸r̸f̸e̸r̸e̸n̸c̸e̷*',
        '\n\n...̶.̷.̸.̷.̸.̷'
      ];
      return text + glitches[Math.floor(Math.random() * glitches.length)];
    }
    return text;
  }
}

export default new OuijaEngine();

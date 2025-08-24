// Configuration for Twitter Enhancer Extension
const CONFIG = {
  // Supported languages for translation
  languages: {
    JP: 'Japanese',
    CN: 'Chinese', 
    KR: 'Korean',
    AR: 'Arabic',
    RU: 'Russian',
    TH: 'Thai'
  },
  
  // Theme definitions
  themes: {
    original: 'Original',
    midnight: 'Midnight Dream',
    forest: 'Forest Zen',
    hackernews: 'Hacker News'
  },
  
  // Font size settings
  fontSize: {
    min: 10,
    max: 18,
    default: 13
  },
  
  // Update intervals
  intervals: {
    adDetection: 5000,
    contentCheck: 3000,
    translationDelay: 300,
    translationBatch: 500
  },
  
  // DOM selectors (centralized for easier maintenance)
  selectors: {
    tweet: 'article[data-testid="tweet"]',
    tweetText: 'div[data-testid="tweetText"]',
    timeline: 'main',
    adSpan: 'span',
    mediaImage: 'img[src*="/media/"]',
    videoPlayer: 'div[data-testid="videoPlayer"]',
    videoComponent: 'div[data-testid="videoComponent"]',
    cardWrapper: 'div[data-testid="card.wrapper"]',
    userAvatar: 'div[data-testid="Tweet-User-Avatar"]',
    userDescription: '[data-testid="UserDescription"]',
    userCell: '[data-testid="UserCell"]',
    trend: '[data-testid="trend"]'
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
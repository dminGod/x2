// Quotes are now loaded from quotes.js

let quoteIndex = 0;
let blockAds = true;
let showQuotes = true;

// Font map for custom fonts - all 50 fonts
const FONT_MAP = {
  // Display
  "02sotpja0fvji3h": "Single Day",
  "5z9eu1qjogoyl1j": "Yeseva One",
  "92dkysofm4cwxrp": "Spirax",
  "egwdmddv9m4bjs2": "Tektur",
  "n30a6u2wbgpc0dj": "Protest Strike",
  "nhrj36ye92tgmy9": "Trade Winds",
  "dkeeecb9hfe8yfd": "Turret Road",
  "j38tgh3oi7zdhqw": "Skranji",
  "o77aa38j0ox3sce": "Trochut",
  "pdokxl7l209wt52": "Silkscreen",
  
  // Handwriting
  "05gutt76t92slb8": "Nerko One",
  "218ocr3yynfl11w": "Nanum Pen Script",
  "48hlm5r44q1m0te": "Square Peg",
  "859u2gdhfojm8zz": "The Girl Next Door",
  "lua6o9nf1n88fkd": "WindSong",
  "nrc1mkxaicl0y2s": "Nanum Gothic Coding",
  
  // Sans Serif
  "3qx8nya7o059lco": "Mozilla Headline",
  "4crqhj3h8jfbkd6": "Special Gothic",
  "4p3eiqeydywt3jj": "Prompt",
  "4ryjfn6c164yri7": "Teachers",
  "9wbwdn1er3git2t": "Yantramanav",
  "hdlk04j2bgyhb6r": "Syne",
  "mujbxoegvoygr7f": "Titillium Web",
  "n1mfpmy8gry7k8n": "Mukta",
  "1x3oqg7wk82xo5v": "Rokkitt VF Beta",
  "5157ulqhmza0jhf": "Winky Sans",
  "c1ih7kvb0q68zk2": "Tirra",
  "gtz819eep3p8yuv": "Yaldevi Colombo",
  "irhho0fmj0jhq97": "Smooch Sans",
  "lx1xx622v8ph967": "Trispace",
  "o1l3l9l5wuky9ke": "Tajawal",
  "1ifhh8z6dkgny62": "Tenali Ramakrishna",
  "1lfgw4o20sjw1e0": "Mooli",
  
  // Monospace
  "6v1tfy3we9lflvn": "Victor Mono",
  "h1ufafypkqekk8o": "Ubuntu Mono",
  "apnpuw2fwpgec12": "Spline Sans Mono",
  "i6te39fwzskq7l8": "Ubuntu Sans Mono",
  "ksz2q4gupv2rkwz": "Xanh Mono",
  "tkrz0rftdixurg0": "Sometype Mono",
  "yqhpixmyh4h57qg": "M PLUS 1 Code",
  
  // Serif
  "7y6pux4v88g770v": "Trirong",
  "egd26toxu3n9zkv": "Taviraj",
  "ujiqg6ua3fptekv": "Vollkorn",
  "36pjk1nb688rjn1": "Noticia Text",
  "5ctwxbiyttpqz1p": "KoPub Batang",
  "dp0omid3wqs39gl": "Solway",
  "iqix8l5cwdox342": "Noto Nastaliq Urdu",
  "jawcqt117q1egge": "Zen Old Mincho",
  "jpge3gzb0iladgz": "Yrsa",
  "opsqamthtgsnlcu": "Unna"
};

function getNextQuote() {
  const quote = QUOTES[quoteIndex % QUOTES.length];
  quoteIndex++;
  return quote;
}

// Helper function to clean up translation responses
function cleanTranslationResponse(text) {
  if (!text) return text;
  
  // Remove <think> tags and their content
  text = text.replace(/<think[^>]*>.*?<\/think>/gis, '');
  
  // Also remove any standalone opening or closing think tags that might be malformed
  text = text.replace(/<\/?think[^>]*>/gi, '');
  
  // Remove quotes if the API added them
  text = text.replace(/^["']|["']$/g, '');
  
  // Trim whitespace
  return text.trim();
}

function replaceAdWithQuote(parentDiv) {
  if (parentDiv.dataset.replaced === 'true') return;
  
  if (showQuotes) {
    const quote = getNextQuote();
    const [text, author] = quote.split(' - ');
    
    // Clear existing content safely
    while (parentDiv.firstChild) {
      parentDiv.removeChild(parentDiv.firstChild);
    }
    
    // Create elements using DOM methods to prevent XSS
    const container = document.createElement('div');
    container.className = 'quotation-replacement';
    
    const icon = document.createElement('div');
    icon.className = 'quote-icon';
    icon.textContent = '✨';
    container.appendChild(icon);
    
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'quote-text';
    blockquote.textContent = `"${text}"`;
    container.appendChild(blockquote);
    
    const cite = document.createElement('cite');
    cite.className = 'quote-author';
    cite.textContent = `— ${author || 'Unknown'}`;
    container.appendChild(cite);
    
    const footer = document.createElement('div');
    footer.className = 'quote-footer';
    footer.textContent = 'Instead of an ad, here\'s some inspiration';
    container.appendChild(footer);
    
    parentDiv.appendChild(container);
    parentDiv.classList.add('quote-container');
  } else {
    parentDiv.style.display = 'none';
  }
  
  parentDiv.dataset.replaced = 'true';
}

// Apply custom font to timeline tweets only
function applyCustomFont(enabled, fontId) {
  const fontFamily = fontId !== 'default' && FONT_MAP[fontId] ? `'${FONT_MAP[fontId]}', sans-serif` : '';
  
  if (enabled && fontFamily) {
    // Apply to timeline tweets only - targeting the tweet text content
    document.documentElement.style.setProperty('--custom-tweet-font', fontFamily);
    document.body.classList.add('custom-font-enabled');
  } else {
    // Remove custom font
    document.documentElement.style.removeProperty('--custom-tweet-font');
    document.body.classList.remove('custom-font-enabled');
  }
}

function detectAndReplaceAds() {
  if (!blockAds) return;
  
  const articles = document.querySelectorAll('article[data-testid="tweet"]');
  
  articles.forEach(article => {
    const parentDiv = article.closest('[data-testid="cellInnerDiv"]');
    if (!parentDiv || parentDiv.dataset.replaced === 'true') return;
    
    const spans = article.querySelectorAll('span');
    let isAd = false;
    
    spans.forEach(span => {
      if (span.textContent === 'Ad' || span.textContent === 'Promoted') {
        isAd = true;
      }
    });
    
    const svgPaths = article.querySelectorAll('svg path');
    svgPaths.forEach(path => {
      if (path.getAttribute('d') && path.getAttribute('d').includes('M19.498 3h-15c-1.381 0-2.5 1.12-2.5 2.5v13c0 1.38 1.119 2.5 2.5 2.5h15c1.381 0 2.5-1.12 2.5-2.5v-13c0-1.38-1.119-2.5-2.5-2.5zm-3.502 12.5h-8v-8h8v8z')) {
        isAd = true;
      }
    });
    
    if (isAd && parentDiv) {
      replaceAdWithQuote(parentDiv);
    }
  });
}

function observeTimeline() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        detectAndReplaceAds();
      }
    });
  });

  const timeline = document.querySelector('main');
  if (timeline) {
    observer.observe(timeline, {
      childList: true,
      subtree: true
    });
  }
}

detectAndReplaceAds();

setTimeout(() => {
  observeTimeline();
  detectAndReplaceAds();
}, 2000);

setInterval(() => {
  detectAndReplaceAds();
}, 5000);

// Global translation settings
let groqApiKey = '';
let selectedModel = 'llama3-8b-8192';
let writingModel = 'llama3-8b-8192';
let targetLanguage = 'english';
let enabledLanguages = {};
let languageStates = {};
let enableAutoTranslation = true;

// Helper function to get short display name for models
function getModelDisplayName(model) {
  const modelNames = {
    'llama3-8b-8192': 'Llama3 8B',
    'qwen/qwen3-32b': 'Qwen3 32B',
    'deepseek-r1-distill-llama-70b': 'DeepSeek 70B',
    'llama-3.1-8b-instant': 'Llama 3.1 8B',
    'llama-3.3-70b-versatile': 'Llama 3.3 70B',
    'meta-llama/llama-4-maverick-17b-128e-instruct': 'Llama 4 17B',
    'openai/gpt-oss-120b': 'GPT OSS 120B',
    'openai/gpt-oss-20b': 'GPT OSS 20B'
  };
  return modelNames[model] || model.split('/').pop();
}

// Local transformation functions
function toHack3r(text) {
  const replacements = {
    'a': '4', 'A': '4',
    'e': '3', 'E': '3',
    'i': '1', 'I': '1',
    'o': '0', 'O': '0',
    's': '5', 'S': '5',
    't': '7', 'T': '7',
    'l': '1', 'L': '1',
    'z': '2', 'Z': '2',
    'g': '9', 'G': '9',
    'b': '8', 'B': '8'
  };
  
  let result = text;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(key, 'g'), value);
  }
  
  // Add some random capitalization for extra l33t effect
  return result.split('').map((char, i) => {
    if (char.match(/[a-z]/i) && Math.random() > 0.7) {
      return char.toUpperCase();
    }
    return char;
  }).join('');
}

function toBinary(text) {
  return text.split('').map(char => {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
  }).join(' ');
}

function toBase64(text) {
  // Use btoa for base64 encoding
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (e) {
    return btoa(text);
  }
}

function toMorseCode(text) {
  const morseMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
    '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
    ' ': '/'
  };
  
  return text.toUpperCase().split('').map(char => {
    return morseMap[char] || char;
  }).join(' ');
}

// Function to show model selection modal
function showModelSelectionModal(indicatorElement) {
  // Remove any existing modal
  const existingModal = document.querySelector('.x2-model-modal-overlay');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'x2-model-modal-overlay';
  modalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;
  
  // Create modal container
  const modal = document.createElement('div');
  modal.className = 'x2-model-modal';
  modal.style.cssText = `
    background: rgb(21, 24, 28);
    border: 1px solid rgb(47, 51, 54);
    border-radius: 16px;
    padding: 20px;
    width: 400px;
    max-width: 90vw;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  `;
  
  // Modal header
  const header = document.createElement('h3');
  header.textContent = 'Select Writing Model';
  header.style.cssText = `
    margin: 0 0 16px 0;
    color: rgb(231, 233, 234);
    font-size: 18px;
    font-weight: 600;
  `;
  modal.appendChild(header);
  
  // Model options
  const models = [
    { value: 'llama3-8b-8192', name: 'Llama3 8B', price: 'Default' },
    { value: 'qwen/qwen3-32b', name: 'Qwen3 32B', price: '$0.59/M' },
    { value: 'deepseek-r1-distill-llama-70b', name: 'DeepSeek 70B', price: '$0.99/M' },
    { value: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', price: '$0.08/M' },
    { value: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', price: '$0.79/M' },
    { value: 'meta-llama/llama-4-maverick-17b-128e-instruct', name: 'Llama 4 17B', price: '$0.34/M' },
    { value: 'openai/gpt-oss-120b', name: 'GPT OSS 120B', price: '$0.75/M' },
    { value: 'openai/gpt-oss-20b', name: 'GPT OSS 20B', price: '$0.5/M' }
  ];
  
  const optionsContainer = document.createElement('div');
  optionsContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  `;
  
  models.forEach(model => {
    const option = document.createElement('button');
    option.className = 'x2-model-option';
    option.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: ${writingModel === model.value ? 'rgba(29, 155, 240, 0.1)' : 'transparent'};
      border: 1px solid ${writingModel === model.value ? 'rgb(29, 155, 240)' : 'rgb(47, 51, 54)'};
      border-radius: 8px;
      color: rgb(231, 233, 234);
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
    `;
    
    const modelName = document.createElement('span');
    modelName.textContent = model.name;
    
    const modelPrice = document.createElement('span');
    modelPrice.textContent = model.price;
    modelPrice.style.cssText = `
      color: rgb(113, 118, 123);
      font-size: 12px;
    `;
    
    option.appendChild(modelName);
    option.appendChild(modelPrice);
    
    option.onmouseover = () => {
      if (writingModel !== model.value) {
        option.style.background = 'rgba(29, 155, 240, 0.05)';
        option.style.borderColor = 'rgba(29, 155, 240, 0.5)';
      }
    };
    option.onmouseout = () => {
      if (writingModel !== model.value) {
        option.style.background = 'transparent';
        option.style.borderColor = 'rgb(47, 51, 54)';
      }
    };
    
    option.addEventListener('click', () => {
      writingModel = model.value;
      // Save to storage
      chrome.storage.local.set({ writingModel: writingModel });
      // Update indicator
      indicatorElement.textContent = getModelDisplayName(writingModel);
      // Update all other indicators
      document.querySelectorAll('.x2-model-indicator').forEach(indicator => {
        indicator.textContent = getModelDisplayName(writingModel);
      });
      // Close modal
      modalOverlay.remove();
    });
    
    optionsContainer.appendChild(option);
  });
  
  modal.appendChild(optionsContainer);
  
  // Cancel button
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.style.cssText = `
    width: 100%;
    padding: 10px;
    background: transparent;
    border: 1px solid rgb(47, 51, 54);
    border-radius: 8px;
    color: rgb(231, 233, 234);
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
  `;
  cancelBtn.onmouseover = () => {
    cancelBtn.style.background = 'rgba(239, 243, 244, 0.05)';
  };
  cancelBtn.onmouseout = () => {
    cancelBtn.style.background = 'transparent';
  };
  cancelBtn.addEventListener('click', () => {
    modalOverlay.remove();
  });
  
  modal.appendChild(cancelBtn);
  modalOverlay.appendChild(modal);
  
  // Close on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.remove();
    }
  });
  
  // Add to body
  document.body.appendChild(modalOverlay);
}

// Initialize settings from storage
chrome.storage.local.get(['theme', 'blockAds', 'showQuotes', 'fontSize', 'hideMedia', 'hideStats', 'hideGrok', 'groqApiKey', 'selectedModel', 'writingModel', 'targetLanguage', 'enabledLanguages', 'languageStates', 'enableAutoTranslation', 'useCustomFont', 'selectedFont'], function(result) {
  const theme = result.theme || 'original';
  blockAds = result.blockAds !== false;
  showQuotes = result.showQuotes !== false;
  const fontSize = result.fontSize || 13;
  const hideMedia = result.hideMedia !== false;
  const hideStats = result.hideStats === true;  // Only true if explicitly enabled
  const hideGrok = result.hideGrok !== false;
  const useCustomFont = result.useCustomFont === true;
  const selectedFont = result.selectedFont || 'default';
  groqApiKey = result.groqApiKey || '';
  selectedModel = result.selectedModel || 'llama3-8b-8192';
  writingModel = result.writingModel || 'llama3-8b-8192';
  targetLanguage = result.targetLanguage || 'english';
  enableAutoTranslation = result.enableAutoTranslation !== false;
  
  // Load dynamic language settings
  enabledLanguages = result.enabledLanguages || {
    ja: "Japanese",
    zh: "Chinese", 
    ko: "Korean",
    ar: "Arabic",
    ru: "Russian",
    th: "Thai"
  };
  languageStates = result.languageStates || {};
  
  console.log('[Extension Init] Loaded language settings:', {
    enabledLanguages,
    languageStates,
    groqApiKey: groqApiKey ? 'Set' : 'Not set'
  });
  
  // Apply saved theme
  document.body.setAttribute('data-theme', theme);
  
  // Apply font size
  document.documentElement.style.setProperty('--tweet-font-size', fontSize + 'px');
  
  // Apply custom font
  applyCustomFont(useCustomFont, selectedFont);
  
  // Apply hide media
  if (hideMedia) {
    setupMediaContentObserver();
  }
  
  // Apply hide stats
  if (hideStats) {
    document.body.classList.add('hide-stats');
  }
  
  // Apply hide Grok
  if (hideGrok) {
    document.body.classList.add('hide-grok');
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.action) {
    case 'changeTheme':
      document.body.setAttribute('data-theme', request.theme);
      break;
    case 'toggleAdBlock':
      blockAds = request.enabled;
      if (!blockAds) {
        // Re-show hidden ads
        document.querySelectorAll('[data-replaced="true"]').forEach(div => {
          div.style.display = '';
          div.dataset.replaced = 'false';
          div.classList.remove('quote-container');
        });
      } else {
        detectAndReplaceAds();
      }
      break;
    case 'toggleQuotes':
      showQuotes = request.enabled;
      // Re-process ads with new setting
      document.querySelectorAll('[data-replaced="true"]').forEach(div => {
        div.dataset.replaced = 'false';
      });
      detectAndReplaceAds();
      break;
    case 'changeFontSize':
      document.documentElement.style.setProperty('--tweet-font-size', request.size + 'px');
      break;
    case 'toggleCustomFont':
      // Get current font selection and apply
      chrome.storage.local.get(['selectedFont'], function(result) {
        const selectedFont = result.selectedFont || 'default';
        applyCustomFont(request.enabled, selectedFont);
      });
      break;
    case 'changeFont':
      // Get current toggle state and apply font
      chrome.storage.local.get(['useCustomFont'], function(result) {
        const useCustomFont = result.useCustomFont === true;
        applyCustomFont(useCustomFont, request.fontId);
      });
      break;
    case 'updateApiKey':
      groqApiKey = request.apiKey;
      // Re-process tweets if any translation is enabled
      if (Object.values(languageStates).some(v => v)) {
        translateAllCJKText();
      }
      break;
    case 'updateModel':
      selectedModel = request.model;
      break;
    case 'updateWritingModel':
      writingModel = request.model;
      // Update any visible model indicators
      document.querySelectorAll('.x2-model-indicator').forEach(indicator => {
        indicator.textContent = getModelDisplayName(writingModel);
      });
      break;
    case 'updateTargetLanguage':
      targetLanguage = request.language;
      // Clear existing translations to retranslate with new target language
      document.querySelectorAll('[data-translated="true"]').forEach(element => {
        element.dataset.translated = 'false';
        delete element.dataset.translatedText;
      });
      // Retranslate if translations are enabled
      if (enableAutoTranslation && Object.values(languageStates).some(v => v)) {
        translateAllCJKText();
      }
      break;
    case 'toggleAutoTranslation':
      enableAutoTranslation = request.enabled;
      console.log('[Auto Translation] Toggled to:', enableAutoTranslation);
      if (!enableAutoTranslation) {
        // Stop any ongoing translations
        console.log('[Auto Translation] Disabled - stopping translations');
      } else if (Object.values(languageStates).some(v => v)) {
        // Re-enable translations if any languages are enabled
        console.log('[Auto Translation] Enabled - resuming translations');
        translateAllCJKText();
      }
      break;
    default:
      // Handle dynamic language toggles
      if (request.action && request.action.startsWith('toggleTranslate')) {
        const langCode = request.action.replace('toggleTranslate', '').toLowerCase();
        languageStates[langCode] = request.enabled;
        
        if (request.enabled) {
          translateAllCJKText();
        } else {
          // When disabled, revert translations for this language
          const mappedLang = getInternalLanguageCode(langCode);
          document.querySelectorAll(`[data-language="${mappedLang}"]`).forEach(span => {
            if (span.dataset.originalText) {
              span.childNodes[0].textContent = span.dataset.originalText;
              span.dataset.currentView = 'original';
              // Remove toggle button
              const toggleBtn = span.querySelector('.translation-toggle-btn');
              if (toggleBtn) toggleBtn.remove();
            }
          });
          // Also revert tweet-level translations
          document.querySelectorAll('article[data-testid="tweet"][data-translated="true"]').forEach(tweet => {
            const tweetTextElement = tweet.querySelector('div[data-testid="tweetText"]');
            if (tweetTextElement && tweet.dataset.originalText) {
              const detectedLang = detectLanguage(tweet.dataset.originalText);
              if (detectedLang === mappedLang) {
                tweetTextElement.textContent = tweet.dataset.originalText;
                tweet.dataset.translated = 'false';
                delete tweet.dataset.originalText;
                // Remove translation indicator
                const indicator = tweet.querySelector('.translation-indicator');
                if (indicator) indicator.remove();
              }
            }
          });
        }
      }
      break;
    case 'toggleHideMedia':
      hideMediaEnabled = request.enabled;
      if (request.enabled) {
        // Apply hiding to all tweets with media
        document.querySelectorAll('article[data-testid="tweet"].media-processed').forEach(tweet => {
          tweet.classList.add('media-content-hidden');
        });
        // Process any unprocessed tweets
        initMediaContentToggle();
        setupMediaContentObserver();
      } else {
        // Remove media hiding classes immediately
        document.querySelectorAll('.media-content-hidden').forEach(tweet => {
          tweet.classList.remove('media-content-hidden');
        });
      }
      break;
    case 'toggleHideStats':
      if (request.enabled) {
        document.body.classList.add('hide-stats');
      } else {
        document.body.classList.remove('hide-stats');
      }
      break;
    case 'toggleHideGrok':
      if (request.enabled) {
        document.body.classList.add('hide-grok');
      } else {
        document.body.classList.remove('hide-grok');
      }
      break;
  }
});

// Menu collapse functionality removed

// Use Unicode-based language detection (CLD3 not available in content scripts)
function detectLanguage(text) {
  if (!text || text.length < 10) {
    console.log('[Language Detection] Text too short:', text?.length || 0);
    return 'unknown';
  }
  
  let detectedLang = 'unknown';
  
  // Direct Unicode-based detection
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) {
    detectedLang = 'ja';
    console.log('[Language Detection] Japanese detected:', text.substring(0, 50));
  } else if (/[\u4E00-\u9FFF]/.test(text)) {
    detectedLang = 'zh';
    console.log('[Language Detection] Chinese detected:', text.substring(0, 50));
  } else if (/[\uAC00-\uD7AF]/.test(text)) {
    detectedLang = 'ko';
    console.log('[Language Detection] Korean detected:', text.substring(0, 50));
  } else if (/[\u0600-\u06FF]/.test(text)) {
    detectedLang = 'ar';
    console.log('[Language Detection] Arabic detected:', text.substring(0, 50));
  } else if (/[\u0400-\u04FF]/.test(text)) {
    detectedLang = 'ru';
    console.log('[Language Detection] Russian detected:', text.substring(0, 50));
  } else if (/[\u0E00-\u0E7F]/.test(text)) {
    detectedLang = 'th';
    console.log('[Language Detection] Thai detected:', text.substring(0, 50));
  } else {
    // Check for common European language patterns
    if (/[àâäæãåā]/i.test(text) || /[èéêëē]/i.test(text) || /[îïí]/i.test(text)) {
      detectedLang = 'fr';
      console.log('[Language Detection] French detected (accents):', text.substring(0, 50));
    } else if (/[äöüß]/i.test(text)) {
      detectedLang = 'de';
      console.log('[Language Detection] German detected (umlauts):', text.substring(0, 50));
    } else if (/[áéíóúñ¿¡]/i.test(text)) {
      detectedLang = 'es';
      console.log('[Language Detection] Spanish detected (accents):', text.substring(0, 50));
    } else if (/[àèéìòù]/i.test(text)) {
      detectedLang = 'it';
      console.log('[Language Detection] Italian detected (accents):', text.substring(0, 50));
    } else if (/[a-zA-Z]/.test(text)) {
      // Default to English for Latin alphabet text without specific accents
      detectedLang = 'en';
      console.log('[Language Detection] English detected (default Latin):', text.substring(0, 50));
    } else {
      console.log('[Language Detection] No specific language detected for:', text.substring(0, 50));
    }
  }
  
  // Map language codes to our internal codes (extended for all languages)
  const languageMap = {
    'en': 'EN', 'english': 'EN',
    'ja': 'JP', 'jp': 'JP', 'japanese': 'JP',
    'zh': 'CN', 'cn': 'CN', 'chinese': 'CN', 'zh-CN': 'CN', 'zh-TW': 'CN',
    'ko': 'KR', 'kr': 'KR', 'korean': 'KR',
    'ar': 'AR', 'arabic': 'AR',
    'ru': 'RU', 'russian': 'RU',
    'th': 'TH', 'thai': 'TH',
    'es': 'ES', 'spanish': 'ES',
    'it': 'IT', 'italian': 'IT',
    'de': 'DE', 'german': 'DE',
    'fr': 'FR', 'french': 'FR',
    'hi': 'HI', 'hindi': 'HI',
    'bn': 'BN', 'bengali': 'BN', 'bangla': 'BN',
    'ur': 'UR', 'urdu': 'UR',
    'fa': 'FA', 'persian': 'FA', 'farsi': 'FA',
    'tr': 'TR', 'turkish': 'TR',
    'pt': 'PT', 'portuguese': 'PT',
    'nl': 'NL', 'dutch': 'NL',
    'pl': 'PL', 'polish': 'PL',
    'vi': 'VI', 'vietnamese': 'VI',
    'id': 'ID', 'indonesian': 'ID',
    'ms': 'MS', 'malay': 'MS',
    'fil': 'FIL', 'filipino': 'FIL', 'tagalog': 'FIL',
    'sv': 'SV', 'swedish': 'SV',
    'no': 'NO', 'norwegian': 'NO',
    'da': 'DA', 'danish': 'DA',
    'fi': 'FI', 'finnish': 'FI',
    'he': 'HE', 'hebrew': 'HE', 'iw': 'HE',
    'el': 'EL', 'greek': 'EL',
    'uk': 'UK', 'ukrainian': 'UK',
    'cs': 'CS', 'czech': 'CS',
    'hu': 'HU', 'hungarian': 'HU',
    'ro': 'RO', 'romanian': 'RO',
    'bg': 'BG', 'bulgarian': 'BG',
    'hr': 'HR', 'croatian': 'HR',
    'sr': 'SR', 'serbian': 'SR',
    'sk': 'SK', 'slovak': 'SK',
    'sl': 'SL', 'slovenian': 'SL',
    'lt': 'LT', 'lithuanian': 'LT',
    'lv': 'LV', 'latvian': 'LV',
    'et': 'ET', 'estonian': 'ET',
    'unknown': 'unknown'
  };
  
  const mappedLang = languageMap[detectedLang] || detectedLang.toUpperCase();
  console.log('[Language Detection] Final result:', detectedLang, '->', mappedLang);
  return mappedLang;
}

// Get human-readable language name
function getLanguageName(code) {
  // First check if it's in our enabled languages
  for (const [langCode, langName] of Object.entries(enabledLanguages)) {
    if (getInternalLanguageCode(langCode) === code) {
      return langName;
    }
  }
  
  // Fallback to a comprehensive name list
  const names = {
    'EN': 'English', 'JP': 'Japanese', 'CN': 'Chinese', 'KR': 'Korean',
    'AR': 'Arabic', 'RU': 'Russian', 'TH': 'Thai',
    'ES': 'Spanish', 'IT': 'Italian', 'DE': 'German',
    'FR': 'French', 'HI': 'Hindi', 'BN': 'Bengali',
    'UR': 'Urdu', 'FA': 'Persian', 'TR': 'Turkish',
    'PT': 'Portuguese', 'NL': 'Dutch', 'PL': 'Polish',
    'VI': 'Vietnamese', 'ID': 'Indonesian', 'MS': 'Malay',
    'FIL': 'Filipino', 'SV': 'Swedish', 'NO': 'Norwegian',
    'DA': 'Danish', 'FI': 'Finnish', 'HE': 'Hebrew',
    'EL': 'Greek', 'UK': 'Ukrainian', 'CS': 'Czech',
    'HU': 'Hungarian', 'RO': 'Romanian', 'BG': 'Bulgarian',
    'HR': 'Croatian', 'SR': 'Serbian', 'SK': 'Slovak',
    'SL': 'Slovenian', 'LT': 'Lithuanian', 'LV': 'Latvian',
    'ET': 'Estonian', 'GU': 'Gujarati', 'KN': 'Kannada',
    'ML': 'Malayalam', 'MR': 'Marathi', 'OR': 'Odia',
    'PA': 'Punjabi', 'TA': 'Tamil', 'TE': 'Telugu',
    'unknown': 'Unknown'
  };
  return names[code] || code;
}

// Get internal language code from target language name
function getTargetLanguageCode(targetLangName) {
  // Map target language names from dropdown to internal codes
  const targetMap = {
    'english': 'EN',
    'arabic': 'AR',
    'bengali': 'BN',
    'chinese': 'CN',
    'chinese-traditional': 'CN',
    'czech': 'CS',
    'dutch': 'NL',
    'french': 'FR',
    'german': 'DE',
    'greek': 'EL',
    'gujarati': 'GU',
    'hebrew': 'HE',
    'hindi': 'HI',
    'indonesian': 'ID',
    'italian': 'IT',
    'japanese': 'JP',
    'kannada': 'KN',
    'korean': 'KR',
    'malayalam': 'ML',
    'marathi': 'MR',
    'odia': 'OR',
    'polish': 'PL',
    'portuguese': 'PT',
    'punjabi': 'PA',
    'russian': 'RU',
    'spanish': 'ES',
    'swedish': 'SV',
    'tamil': 'TA',
    'telugu': 'TE',
    'thai': 'TH',
    'turkish': 'TR',
    'urdu': 'UR',
    'vietnamese': 'VI'
  };
  return targetMap[targetLangName.toLowerCase()] || targetLangName.toUpperCase();
}

// Map internal language codes to storage codes
function getInternalLanguageCode(storageCode) {
  // Map storage codes (like 'ja', 'zh') to internal codes ('JP', 'CN')
  const codeMap = {
    'en': 'EN', 'english': 'EN',
    'ja': 'JP', 'jp': 'JP',
    'zh': 'CN', 'cn': 'CN',
    'ko': 'KR', 'kr': 'KR',
    'ar': 'AR',
    'ru': 'RU',
    'th': 'TH',
    'es': 'ES',
    'it': 'IT',
    'de': 'DE',
    'fr': 'FR',
    // Add more mappings for new languages
    'hi': 'HI', 'bn': 'BN', 'ur': 'UR', 'fa': 'FA',
    'tr': 'TR', 'pt': 'PT', 'nl': 'NL', 'pl': 'PL',
    'vi': 'VI', 'id': 'ID', 'ms': 'MS', 'fil': 'FIL',
    'sv': 'SV', 'no': 'NO', 'da': 'DA', 'fi': 'FI',
    'he': 'HE', 'el': 'EL', 'uk': 'UK', 'cs': 'CS',
    // Indian languages
    'gu': 'GU', 'gujarati': 'GU',
    'kn': 'KN', 'kannada': 'KN',
    'ml': 'ML', 'malayalam': 'ML',
    'mr': 'MR', 'marathi': 'MR',
    'or': 'OR', 'odia': 'OR', 'oriya': 'OR',
    'pa': 'PA', 'punjabi': 'PA',
    'ta': 'TA', 'tamil': 'TA',
    'te': 'TE', 'telugu': 'TE'
  };
  return codeMap[storageCode.toLowerCase()] || storageCode.toUpperCase();
}

// Check if translation is enabled for a specific language
function shouldTranslateLanguage(language) {
  console.log('[Translation Check] Checking if should translate:', language);
  console.log('[Translation Check] Auto-translation enabled:', enableAutoTranslation);
  console.log('[Translation Check] Target language:', targetLanguage);
  console.log('[Translation Check] Enabled languages:', enabledLanguages);
  console.log('[Translation Check] Language states:', languageStates);
  
  // Check if auto-translation is enabled globally
  if (!enableAutoTranslation) {
    console.log('[Translation Check] NO - Auto-translation is disabled');
    return false;
  }
  
  // Check if source and target are the same language
  const targetLangCode = getTargetLanguageCode(targetLanguage);
  if (language === targetLangCode) {
    console.log('[Translation Check] NO - Same language detected (source:', language, '= target:', targetLangCode, ')');
    return false;
  }
  
  // Special case: If the detected language is English and target language is not English,
  // check if English translation is enabled
  if (language === 'EN' && targetLanguage !== 'english') {
    // Check if English is in enabled languages and is toggled on
    if (languageStates['en']) {
      console.log('[Translation Check] YES - English translation enabled for non-English target');
      return true;
    }
  }
  
  // Check all enabled languages
  for (const [code, name] of Object.entries(enabledLanguages)) {
    const internalCode = getInternalLanguageCode(code);
    console.log(`[Translation Check] Comparing ${internalCode} === ${language} && ${languageStates[code]}`);
    if (internalCode === language && languageStates[code]) {
      console.log('[Translation Check] YES - Translation enabled for:', language);
      return true;
    }
  }
  console.log('[Translation Check] NO - Translation not enabled for:', language);
  return false;
}

// Groq API translation function
async function translateWithGroq(text, sourceLanguage) {
  if (!groqApiKey) {
    console.log('No Groq API key configured');
    return null;
  }
  
  // Modify prompt based on target language
  let prompt;
  if (targetLanguage === 'english') {
    prompt = `translate this for me - in the response just give me a straight translation dont give me any additional context or explanation or notes also dont add the text "Here's the translation" - content: "${text}"`;
  } else {
    const targetLangName = targetLanguage.charAt(0).toUpperCase() + targetLanguage.slice(1);
    prompt = `translate this for me into ${targetLangName} - in the response just give me a straight translation dont give me any additional context or explanation or notes also dont add the text "Here's the translation" - content: "${text}"`;
  }
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        model: selectedModel,
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      })
    });
    
    if (!response.ok) {
      // Don't log sensitive error details, just status
      if (response.status === 401) {
        console.warn('Translation API: Invalid API key');
      } else if (response.status === 429) {
        console.warn('Translation API: Rate limit exceeded');
      } else {
        console.warn(`Translation API: Request failed with status ${response.status}`);
      }
      return null;
    }
    
    const data = await response.json();
    const translation = data.choices[0]?.message?.content;
    
    if (translation) {
      // Clean up the translation - remove think tags and quotes
      return cleanTranslationResponse(translation);
    }
    
    return null;
  } catch (error) {
    // Log generic error without exposing sensitive details
    if (error.name === 'NetworkError' || error.message?.includes('fetch')) {
      console.warn('Translation API: Network error');
    } else {
      console.warn('Translation API: Request failed');
    }
    return null;
  }
}

// Process translations for all visible tweets
async function processTranslations() {
  if (!groqApiKey || !Object.values(languageStates).some(v => v)) {
    return;
  }
  
  const tweets = document.querySelectorAll('article[data-testid="tweet"]');
  
  for (const tweet of tweets) {
    // Skip if already translated
    if (tweet.dataset.translated === 'true') continue;
    
    const tweetTextElement = tweet.querySelector('div[data-testid="tweetText"]');
    if (!tweetTextElement) continue;
    
    const originalText = tweetTextElement.textContent || '';
    const language = detectLanguage(originalText);
    
    // Check if we should translate this language
    if (shouldTranslateLanguage(language)) {
      // Mark as being processed
      tweet.dataset.translating = 'true';
      
      // Store original text
      if (!tweet.dataset.originalText) {
        tweet.dataset.originalText = originalText;
      }
      
      // Translate the text
      const translation = await translateWithGroq(originalText, language);
      
      if (translation) {
        // Replace the text content while preserving the HTML structure
        const spans = tweetTextElement.querySelectorAll('span[style]');
        if (spans.length > 0) {
          // If there are styled spans, replace the text in the last span
          const lastSpan = spans[spans.length - 1];
          lastSpan.textContent = translation;
        } else {
          // Otherwise replace the entire text content
          tweetTextElement.textContent = translation;
        }
        
        // Add a small indicator that this was translated
        if (!tweet.querySelector('.translation-indicator')) {
          const indicator = document.createElement('span');
          indicator.className = 'translation-indicator';
          indicator.textContent = `(Translated from ${language})`;
          indicator.style.cssText = 'font-size: 11px; color: rgb(139, 152, 165); margin-left: 8px;';
          tweetTextElement.appendChild(indicator);
        }
        
        // Mark as translated
        tweet.dataset.translated = 'true';
      }
      
      // Remove translating flag
      delete tweet.dataset.translating;
    }
  }
}

// Process translations for user profiles, sidebars, and quoted tweets
async function processAdditionalTranslations() {
  if (!groqApiKey || !Object.values(languageStates).some(v => v)) {
    return;
  }
  
  // 1. User profile descriptions
  const userDescriptions = document.querySelectorAll('[data-testid="UserDescription"]:not([data-translated="true"])');
  userDescriptions.forEach(async (desc) => {
    const text = desc.textContent || '';
    const language = detectLanguage(text);
    
    if (shouldTranslateLanguage(language)) {
      desc.dataset.translating = 'true';
      const translation = await translateWithGroq(text, language);
      
      if (translation) {
        desc.textContent = translation;
        const indicator = document.createElement('span');
        indicator.className = 'translation-indicator';
        indicator.textContent = ` (Translated from ${language})`;
        indicator.style.cssText = 'font-size: 11px; color: rgb(139, 152, 165); margin-left: 8px;';
        desc.appendChild(indicator);
        desc.dataset.translated = 'true';
      }
      delete desc.dataset.translating;
    }
  });
  
  // 2. Sidebar suggestions - "Who to follow" section
  const sidebarUsers = document.querySelectorAll('[data-testid="UserCell"]:not([data-translated="true"])');
  sidebarUsers.forEach(async (userCell) => {
    // Find all text spans in the user cell - Twitter uses various styles
    const allSpans = userCell.querySelectorAll('span');
    
    for (const span of allSpans) {
      // Skip if already translated or is a username (starts with @)
      if (span.dataset.translated === 'true' || span.textContent?.startsWith('@')) continue;
      
      const text = span.textContent || '';
      // Skip very short text (likely buttons or labels)
      if (text.length < 5) continue;
      
      const language = detectLanguage(text);
      
      if (shouldTranslateLanguage(language)) {
        // Check if this is the bio/description (usually longer text)
        const isBio = text.length > 20;
        
        span.dataset.translating = 'true';
        const translation = await translateWithGroq(text, language);
        
        if (translation) {
          span.textContent = translation;
          span.dataset.translated = 'true';
          
          // Add a small indicator for bio translations
          if (isBio && !userCell.querySelector('.who-to-follow-translated')) {
            const indicator = document.createElement('span');
            indicator.className = 'who-to-follow-translated';
            indicator.textContent = ` (${language})`;
            indicator.style.cssText = 'font-size: 10px; color: rgb(139, 152, 165); margin-left: 4px;';
            span.appendChild(indicator);
          }
        }
        delete span.dataset.translating;
      }
    }
    
    userCell.dataset.translated = 'true';
  });
  
  // 3. Quoted tweets are now handled by processQuotedTweets() function
  
  // 4. Trending topics descriptions
  const trendDescriptions = document.querySelectorAll('[data-testid="trend"]:not([data-translated="true"])');
  trendDescriptions.forEach(async (trend) => {
    const spans = trend.querySelectorAll('span');
    spans.forEach(async (span) => {
      if (span.dataset.translated === 'true') return;
      
      const text = span.textContent || '';
      const language = detectLanguage(text);
      
      if (shouldTranslateLanguage(language)) {
        span.dataset.translating = 'true';
        const translation = await translateWithGroq(text, language);
        
        if (translation) {
          span.textContent = translation;
          span.dataset.translated = 'true';
        }
        delete span.dataset.translating;
      }
    });
    trend.dataset.translated = 'true';
  });
}

// Track translation queue to prevent API overload
let translationQueue = [];
let isProcessingQueue = false;

// Process translation queue with rate limiting
async function processTranslationQueue() {
  if (isProcessingQueue || translationQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  while (translationQueue.length > 0) {
    const batch = translationQueue.splice(0, 5); // Process 5 at a time
    
    await Promise.all(batch.map(async ({ span, text, language }) => {
      try {
        const translation = await translateWithGroq(text, language);
        if (translation && span.isConnected) { // Check if element is still in DOM
          applyTranslation(span, text, translation, language);
        }
      } catch (error) {
        console.error('Translation error:', error);
      }
    }));
    
    // Small delay between batches
    if (translationQueue.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  isProcessingQueue = false;
}

// Apply translation to a span element
function applyTranslation(span, originalText, translation, language) {
  // Store translated text
  span.dataset.translatedText = translation;
  span.dataset.originalText = originalText;
  span.dataset.currentView = 'translated';
  span.dataset.language = language;
  
  // Replace the text content with translation
  span.textContent = translation;
  
  // Add a small toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'translation-toggle-btn';
  toggleBtn.textContent = language;
  toggleBtn.title = 'Click to toggle original/translation';
  toggleBtn.style.cssText = `
    display: inline-block !important;
    padding: 1px 4px !important;
    margin-left: 4px !important;
    background: rgba(29, 155, 240, 0.08) !important;
    color: rgb(29, 155, 240) !important;
    border: 1px solid rgba(29, 155, 240, 0.2) !important;
    border-radius: 3px !important;
    font-size: 9px !important;
    font-weight: 500 !important;
    cursor: pointer !important;
    vertical-align: baseline !important;
    transition: all 0.2s !important;
  `;
  
  // Add hover effect
  toggleBtn.onmouseover = () => {
    toggleBtn.style.background = 'rgba(29, 155, 240, 0.15) !important';
    toggleBtn.style.borderColor = 'rgba(29, 155, 240, 0.3) !important';
  };
  toggleBtn.onmouseout = () => {
    toggleBtn.style.background = 'rgba(29, 155, 240, 0.08) !important';
    toggleBtn.style.borderColor = 'rgba(29, 155, 240, 0.2) !important';
  };
  
  // Toggle between original and translated text
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (span.dataset.currentView === 'translated') {
      // Show original
      span.childNodes[0].textContent = span.dataset.originalText;
      span.dataset.currentView = 'original';
      toggleBtn.style.background = 'rgba(239, 243, 244, 0.1) !important';
      toggleBtn.style.color = 'rgb(239, 243, 244) !important';
      toggleBtn.style.borderColor = 'rgba(239, 243, 244, 0.3) !important';
    } else {
      // Show translation
      span.childNodes[0].textContent = span.dataset.translatedText;
      span.dataset.currentView = 'translated';
      toggleBtn.style.background = 'rgba(29, 155, 240, 0.08) !important';
      toggleBtn.style.color = 'rgb(29, 155, 240) !important';
      toggleBtn.style.borderColor = 'rgba(29, 155, 240, 0.2) !important';
    }
  });
  
  span.appendChild(toggleBtn);
}

// Universal translation - translate ANY foreign text found anywhere
function translateAllCJKText() {
  if (!groqApiKey || !Object.values(languageStates).some(v => v)) return;
  
  // Get ALL text containers - much more aggressive selector
  // This includes quoted tweets, retweets, and nested content
  const textContainers = document.querySelectorAll(`
    span:not([data-universal-translated="true"]):not([data-translating="true"]),
    div[data-testid="tweetText"] span:not([data-universal-translated="true"]):not([data-translating="true"]),
    div[dir="auto"] span:not([data-universal-translated="true"]):not([data-translating="true"]),
    div[lang] span:not([data-universal-translated="true"]):not([data-translating="true"]),
    article[role="article"] span:not([data-universal-translated="true"]):not([data-translating="true"]),
    div[style*="border"] span:not([data-universal-translated="true"]):not([data-translating="true"]),
    a[href*="/status/"] span:not([data-universal-translated="true"]):not([data-translating="true"])
  `);
  
  textContainers.forEach(span => {
    // Skip if already processed or being processed
    if (span.dataset.universalTranslated === 'true' || span.dataset.translating === 'true') return;
    
    // Skip if this is a button or interactive element
    if (span.closest('button') || span.closest('[role="button"]')) {
      // Unless it's in a tweet
      if (!span.closest('article[data-testid="tweet"]')) {
        span.dataset.universalTranslated = 'true';
        return;
      }
    }
    
    // Get all text content, handling complex structures
    let text = '';
    const extractText = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Skip certain elements
        if (node.tagName === 'TIME' || node.tagName === 'BUTTON') return;
        
        // Recursively get text from child nodes
        node.childNodes.forEach(child => extractText(child));
      }
    };
    
    span.childNodes.forEach(node => extractText(node));
    text = text.trim();
    
    // Skip very short text, usernames, timestamps
    if (text.length < 10 || 
        text.startsWith('@') || 
        text.includes('·') ||
        text.match(/^\d+$/) || // Skip pure numbers
        text.match(/^https?:\/\//)) return; // Skip URLs
    
    const language = detectLanguage(text);
    
    // If it's foreign text and we should translate it
    if (shouldTranslateLanguage(language)) {
      span.dataset.universalTranslated = 'true';
      span.dataset.translating = 'true';
      
      // Add to translation queue
      translationQueue.push({ span, text, language });
      
      // Process queue
      processTranslationQueue();
    } else {
      // Mark as processed even if not translated to avoid re-checking
      span.dataset.universalTranslated = 'true';
    }
  });
}

// Debounced translation function for scroll events
let translationTimeout;
function debouncedTranslateAll() {
  clearTimeout(translationTimeout);
  translationTimeout = setTimeout(() => {
    translateAllCJKText();
  }, 300);
}

// Media Content Show/Hide functionality
function initMediaContentToggle() {
  
  // Process all tweets (including already processed ones to update state)
  const tweets = document.querySelectorAll('article[data-testid="tweet"]');
  
  tweets.forEach(tweet => {
    
    // Detect language and add badge
    const tweetTextElement = tweet.querySelector('div[data-testid="tweetText"]');
    if (tweetTextElement) {
      const tweetText = tweetTextElement.textContent || '';
      const language = detectLanguage(tweetText);
      
      if (language && !tweet.querySelector('.language-badge')) {
        // Find the three dots menu button
        const menuButton = tweet.querySelector('button[aria-label="More"]') || 
                          tweet.querySelector('div[role="button"][aria-label="More"]') ||
                          tweet.querySelector('[data-testid="caret"]');
        
        if (menuButton) {
          // Create language badge
          const badge = document.createElement('span');
          badge.className = 'language-badge';
          badge.textContent = language;
          badge.title = getLanguageName(language);
          
          // Insert badge before the menu button
          if (menuButton.parentElement) {
            menuButton.parentElement.insertBefore(badge, menuButton);
          }
        }
        
        // Auto-translate if enabled
        if (shouldTranslateLanguage(language)) {
          if (groqApiKey && !tweet.dataset.translated && !tweet.dataset.translating) {
            // Translate this specific tweet
            tweet.dataset.translating = 'true';
            tweet.dataset.originalText = tweetText;
            
            translateWithGroq(tweetText, language).then(translation => {
              if (translation && tweetTextElement) {
                // Replace the text content
                const spans = tweetTextElement.querySelectorAll('span[style]');
                if (spans.length > 0) {
                  const lastSpan = spans[spans.length - 1];
                  lastSpan.textContent = translation;
                } else {
                  tweetTextElement.textContent = translation;
                }
                
                // Add translation indicator
                if (!tweet.querySelector('.translation-indicator')) {
                  const indicator = document.createElement('span');
                  indicator.className = 'translation-indicator';
                  indicator.textContent = ` (Translated from ${language})`;
                  indicator.style.cssText = 'font-size: 11px; color: rgb(139, 152, 165); margin-left: 8px;';
                  tweetTextElement.appendChild(indicator);
                }
                
                tweet.dataset.translated = 'true';
              }
              delete tweet.dataset.translating;
            });
          }
        }
      }
    }
    
    // Check if tweet has media content and mark it for hover-to-show
    const hasImages = tweet.querySelector(':scope > div img[src*="/media/"], :scope > div div[data-testid="tweetPhoto"]');
    const hasVideo = tweet.querySelector(':scope > div video, :scope > div div[data-testid="videoPlayer"], :scope > div div[data-testid="videoComponent"]');
    const hasCard = tweet.querySelector(':scope > div div[data-testid="card.wrapper"]');
    const hasNewsCard = tweet.querySelector(':scope > div a[href*="t.co"] img, :scope > div img[src*="card_img"], :scope > div img[src*="ext_tw_video_thumb"]');
    
    if (hasImages || hasVideo || hasCard || hasNewsCard) {
      // Mark as processed
      tweet.classList.add('media-processed');
      // Only hide media if hideMediaEnabled is true
      if (hideMediaEnabled) {
        tweet.classList.add('media-content-hidden');
      }
    }
  });
}

// Initialize media content toggle
function setupMediaContentObserver() {
  initMediaContentToggle();
  translateAllCJKText(); // Universal translation
  
  // Re-process on timeline changes with debouncing
  const observer = new MutationObserver(() => {
    initMediaContentToggle();
    debouncedTranslateAll(); // Debounced translation on updates
  });
  
  const timeline = document.querySelector('main');
  if (timeline) {
    observer.observe(timeline, {
      childList: true,
      subtree: true
    });
  }
  
  // Add scroll listener for infinite scroll
  let lastScrollPosition = 0;
  window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;
    
    // Only translate when scrolling down (new content)
    if (currentScrollPosition > lastScrollPosition) {
      debouncedTranslateAll();
    }
    
    lastScrollPosition = currentScrollPosition;
  }, { passive: true });
}

// Global flag for media hiding
let hideMediaEnabled = false;

// Start features after page loads
setTimeout(() => {
  chrome.storage.local.get(['hideMedia'], function(result) {
    hideMediaEnabled = result.hideMedia !== false;
    if (hideMediaEnabled) {
      setupMediaContentObserver();
    }
  });
  
  // Always start translation observer
  translateAllCJKText();
}, 2000);

// Re-run periodically to catch new content
setInterval(() => {
  if (hideMediaEnabled) {
    initMediaContentToggle();
  }
  translateAllCJKText(); // Universal translation periodically
}, 3000);

// Reply Composer Tab Enhancement
function setupReplyComposerTabs() {
  // Find all reply composer elements on the page
  const composers = document.querySelectorAll('[data-testid="tweetTextarea_0"], [data-testid="tweetTextarea_1"], [role="textbox"][contenteditable="true"]');
  
  composers.forEach(composer => {
    // Skip if already processed
    if (composer.closest('.x2-composer-wrapper')) return;
    
    // Find the parent container (usually a few levels up)
    let parentContainer = composer.closest('[data-testid="toolBar"]')?.parentElement;
    if (!parentContainer) {
      parentContainer = composer.parentElement?.parentElement?.parentElement;
    }
    if (!parentContainer) return;
    
    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'x2-composer-wrapper';
    wrapper.style.cssText = `
      position: relative;
      width: 100%;
    `;
    
    // Create tab container
    const tabContainer = document.createElement('div');
    tabContainer.className = 'x2-composer-tabs';
    tabContainer.style.cssText = `
      display: flex;
      border-bottom: 1px solid rgb(47, 51, 54);
      margin-bottom: 12px;
      gap: 2px;
    `;
    
    // Create tabs
    const normalTab = document.createElement('button');
    normalTab.className = 'x2-tab x2-tab-active';
    normalTab.textContent = 'Normal';
    normalTab.style.cssText = `
      flex: 1;
      padding: 8px 16px;
      background: transparent;
      border: none;
      color: rgb(29, 155, 240);
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      border-bottom: 2px solid rgb(29, 155, 240);
      transition: all 0.2s;
    `;
    
    const capsTab = document.createElement('button');
    capsTab.className = 'x2-tab';
    capsTab.textContent = 'Translate';
    capsTab.style.cssText = `
      flex: 1;
      padding: 8px 16px;
      background: transparent;
      border: none;
      color: rgb(113, 118, 123);
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    `;
    
    // Create content containers
    const normalContent = document.createElement('div');
    normalContent.className = 'x2-tab-content x2-normal-content';
    normalContent.style.cssText = `
      display: block;
      width: 100%;
    `;
    
    const capsContent = document.createElement('div');
    capsContent.className = 'x2-tab-content x2-caps-content';
    capsContent.style.cssText = `
      display: none;
      width: 100%;
      padding: 12px;
      min-height: 100px;
      background: rgba(29, 155, 240, 0.05);
      border-radius: 8px;
      color: rgb(231, 233, 234);
      font-size: 15px;
      line-height: 20px;
      white-space: pre-wrap;
      word-break: break-word;
      position: relative;
      padding-bottom: 48px;
    `;
    
    // Create model indicator
    const modelIndicatorContainer = document.createElement('div');
    modelIndicatorContainer.style.cssText = `
      position: absolute;
      top: 8px;
      left: 12px;
      font-size: 11px;
      color: rgb(113, 118, 123);
      display: flex;
      align-items: center;
      gap: 6px;
    `;
    
    const modelIndicator = document.createElement('span');
    modelIndicator.className = 'x2-model-indicator';
    modelIndicator.textContent = getModelDisplayName(writingModel);
    modelIndicator.style.cssText = `
      color: rgb(113, 118, 123);
    `;
    
    const changeLink = document.createElement('a');
    changeLink.textContent = 'Change';
    changeLink.href = '#';
    changeLink.style.cssText = `
      color: rgb(29, 155, 240);
      text-decoration: none;
      cursor: pointer;
      transition: opacity 0.2s;
    `;
    changeLink.onmouseover = () => changeLink.style.opacity = '0.8';
    changeLink.onmouseout = () => changeLink.style.opacity = '1';
    
    // Add click handler for change link
    changeLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showModelSelectionModal(modelIndicator);
    });
    
    modelIndicatorContainer.appendChild(modelIndicator);
    modelIndicatorContainer.appendChild(changeLink);
    capsContent.appendChild(modelIndicatorContainer);
    
    // Create translated text display
    const capsTextDisplay = document.createElement('div');
    capsTextDisplay.className = 'x2-translated-text';
    capsTextDisplay.style.cssText = `
      min-height: 60px;
      margin-top: 20px;
      margin-bottom: 60px;
    `;
    capsContent.appendChild(capsTextDisplay);
    
    // Create language controls container
    const langControls = document.createElement('div');
    langControls.style.cssText = `
      position: absolute;
      bottom: 8px;
      left: 8px;
      right: 8px;
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: space-between;
    `;
    
    // Create language dropdown
    const langSelect = document.createElement('select');
    langSelect.className = 'x2-lang-select';
    langSelect.style.cssText = `
      padding: 6px 12px;
      background: rgb(32, 35, 39);
      color: rgb(231, 233, 234);
      border: 1px solid rgb(71, 82, 87);
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      outline: none;
    `;
    
    // Add language options - top 30 commonly used languages + special encodings
    const languages = [
      // Special encodings (local transforms)
      { code: 'hack3r', name: '🔥 Hack3r' },
      { code: 'binary', name: '💻 Binary' },
      { code: 'base64', name: '🔐 Base64' },
      { code: 'morse', name: '📡 Morse Code' },
      // Regular languages
      { code: 'en', name: 'English' },
      { code: 'zh', name: 'Chinese (Simplified)' },
      { code: 'zh-TW', name: 'Chinese (Traditional)' },
      { code: 'es', name: 'Spanish' },
      { code: 'hi', name: 'Hindi' },
      { code: 'ar', name: 'Arabic' },
      { code: 'bn', name: 'Bengali' },
      { code: 'pt', name: 'Portuguese' },
      { code: 'ru', name: 'Russian' },
      { code: 'ja', name: 'Japanese' },
      { code: 'pa', name: 'Punjabi' },
      { code: 'de', name: 'German' },
      { code: 'jv', name: 'Javanese' },
      { code: 'ko', name: 'Korean' },
      { code: 'fr', name: 'French' },
      { code: 'te', name: 'Telugu' },
      { code: 'mr', name: 'Marathi' },
      { code: 'ta', name: 'Tamil' },
      { code: 'vi', name: 'Vietnamese' },
      { code: 'tr', name: 'Turkish' },
      { code: 'ur', name: 'Urdu' },
      { code: 'it', name: 'Italian' },
      { code: 'th', name: 'Thai' },
      { code: 'gu', name: 'Gujarati' },
      { code: 'fa', name: 'Persian' },
      { code: 'pl', name: 'Polish' },
      { code: 'uk', name: 'Ukrainian' },
      { code: 'ml', name: 'Malayalam' },
      { code: 'kn', name: 'Kannada' },
      { code: 'or', name: 'Oriya' }
    ];
    
    languages.forEach(lang => {
      const option = document.createElement('option');
      option.value = lang.code;
      option.textContent = lang.name;
      langSelect.appendChild(option);
    });
    
    // Create Translate button
    const translateBtn = document.createElement('button');
    translateBtn.className = 'x2-translate-btn';
    translateBtn.textContent = 'Translate';
    translateBtn.style.cssText = `
      padding: 6px 16px;
      background: rgb(29, 155, 240);
      color: white;
      border: none;
      border-radius: 18px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    `;
    
    // Add hover effect for translate button
    translateBtn.onmouseover = () => {
      translateBtn.style.background = 'rgb(26, 140, 216)';
    };
    translateBtn.onmouseout = () => {
      translateBtn.style.background = 'rgb(29, 155, 240)';
    };
    
    // Add translate button click handler
    translateBtn.addEventListener('click', async () => {
      const textElement = normalContent.querySelector('[role="textbox"][contenteditable="true"], [data-testid^="tweetTextarea_"]');
      if (textElement) {
        const originalText = textElement.innerText || textElement.textContent || '';
        if (!originalText.trim()) {
          capsTextDisplay.textContent = 'Please enter text to translate';
          return;
        }
        
        const targetLang = langSelect.value;
        const langName = languages.find(l => l.code === targetLang).name;
        
        // Check if it's a special encoding (local transform)
        const specialEncodings = ['hack3r', 'binary', 'base64', 'morse'];
        if (specialEncodings.includes(targetLang)) {
          // Use local transformation
          translateBtn.disabled = true;
          capsTextDisplay.textContent = 'Transforming...';
          
          setTimeout(() => {
            let transformedText = '';
            
            switch(targetLang) {
              case 'hack3r':
                transformedText = toHack3r(originalText);
                break;
              case 'binary':
                transformedText = toBinary(originalText);
                break;
              case 'base64':
                transformedText = toBase64(originalText);
                break;
              case 'morse':
                transformedText = toMorseCode(originalText);
                break;
            }
            
            capsTextDisplay.textContent = transformedText;
            translateBtn.disabled = false;
          }, 300); // Small delay for effect
          
          return;
        }
        
        // Regular language translation via API
        // Show loading state
        capsTextDisplay.textContent = 'Translating...';
        translateBtn.disabled = true;
        
        try {
          // Use the global groqApiKey variable that's already loaded
          if (!groqApiKey) {
            capsTextDisplay.textContent = 'Please set your Groq API key in the extension settings';
            translateBtn.disabled = false;
            return;
          }
          
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${groqApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: writingModel,
              messages: [
                {
                  role: 'system',
                  content: `You are a translator. Translate the following text to ${langName}. Only provide the translation, no explanations or additional text.`
                },
                {
                  role: 'user',
                  content: originalText
                }
              ],
              temperature: 0.3,
              max_tokens: 1000
            })
          });
          
          if (!response.ok) {
            // Handle specific error codes with user-friendly messages
            let errorMessage = 'Translation failed';
            if (response.status === 401) {
              errorMessage = 'Invalid API key';
            } else if (response.status === 429) {
              errorMessage = 'Rate limit exceeded. Please try again later';
            } else if (response.status >= 500) {
              errorMessage = 'Service temporarily unavailable';
            }
            throw new Error(errorMessage);
          }
          
          const data = await response.json();
          const rawTranslation = data.choices[0]?.message?.content;
          
          if (!rawTranslation) {
            throw new Error('No translation received');
          }
          
          const translatedText = cleanTranslationResponse(rawTranslation);
          
          // Display translated text
          capsTextDisplay.textContent = translatedText;
          
        } catch (error) {
          // Log error without exposing sensitive details
          console.warn('Translation failed');
          
          // Show user-friendly error message
          if (error.message) {
            capsTextDisplay.textContent = error.message;
          } else if (error.name === 'NetworkError' || error.message?.includes('fetch')) {
            capsTextDisplay.textContent = 'Network error. Please check your connection';
          } else {
            capsTextDisplay.textContent = 'Translation failed. Please try again';
          }
        } finally {
          translateBtn.disabled = false;
        }
      }
    });
    
    // Create left controls container for dropdown and translate button
    const leftControls = document.createElement('div');
    leftControls.style.cssText = `
      display: flex;
      gap: 8px;
      align-items: center;
    `;
    leftControls.appendChild(langSelect);
    leftControls.appendChild(translateBtn);
    
    // Create "Use reply" button for caps content
    const useReplyBtn = document.createElement('button');
    useReplyBtn.className = 'x2-use-reply-btn';
    useReplyBtn.textContent = 'Use reply';
    useReplyBtn.style.cssText = `
      padding: 6px 12px;
      background: rgb(29, 155, 240);
      color: white;
      border: none;
      border-radius: 18px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    `;
    
    // Add both control groups to langControls
    langControls.appendChild(leftControls);
    langControls.appendChild(useReplyBtn);
    capsContent.appendChild(langControls);
    
    // Add hover effect for button
    useReplyBtn.onmouseover = () => {
      useReplyBtn.style.background = 'rgb(26, 140, 216)';
    };
    useReplyBtn.onmouseout = () => {
      useReplyBtn.style.background = 'rgb(29, 155, 240)';
    };
    
    // Add click handler for "Use reply" button
    useReplyBtn.addEventListener('click', () => {
      const textElement = normalContent.querySelector('[role="textbox"][contenteditable="true"], [data-testid^="tweetTextarea_"]');
      if (textElement && capsTextDisplay.textContent) {
        // Find the span element that contains the actual text
        const existingSpan = textElement.querySelector('span[data-text="true"]');
        
        if (existingSpan) {
          // If span exists, just update its text content
          existingSpan.textContent = capsTextDisplay.textContent;
        } else {
          // If no span exists (empty editor), find or create the proper structure
          const blockDiv = textElement.querySelector('div[data-offset-key]');
          if (blockDiv) {
            // Find the text span inside the block div
            const textSpan = blockDiv.querySelector('span[data-text="true"]');
            if (textSpan) {
              textSpan.textContent = capsTextDisplay.textContent;
            } else {
              // Create a new span with the proper attributes if none exists
              const newSpan = document.createElement('span');
              newSpan.setAttribute('data-text', 'true');
              newSpan.textContent = capsTextDisplay.textContent;
              blockDiv.appendChild(newSpan);
            }
          } else {
            // Fallback: just set the text content if structure is different
            textElement.textContent = capsTextDisplay.textContent;
          }
        }
        
        // Trigger input event to update Twitter's internal state
        const inputEvent = new Event('input', { bubbles: true, cancelable: true });
        textElement.dispatchEvent(inputEvent);
        
        // Switch back to normal tab
        normalTab.click();
      }
    });
    
    
    // Keep composer in its original location but hide/show based on tab
    // Don't move it to avoid breaking Twitter's event handlers
    composer.dataset.x2Original = 'true';
    
    // Add tab switching logic
    normalTab.addEventListener('click', () => {
      normalTab.style.color = 'rgb(29, 155, 240)';
      normalTab.style.borderBottom = '2px solid rgb(29, 155, 240)';
      normalTab.classList.add('x2-tab-active');
      
      capsTab.style.color = 'rgb(113, 118, 123)';
      capsTab.style.borderBottom = '2px solid transparent';
      capsTab.classList.remove('x2-tab-active');
      
      normalContent.style.display = 'block';
      capsContent.style.display = 'none';
      
      // Show the original composer container
      if (parentContainer) {
        parentContainer.style.display = '';
      }
    });
    
    capsTab.addEventListener('click', () => {
      capsTab.style.color = 'rgb(29, 155, 240)';
      capsTab.style.borderBottom = '2px solid rgb(29, 155, 240)';
      capsTab.classList.add('x2-tab-active');
      
      normalTab.style.color = 'rgb(113, 118, 123)';
      normalTab.style.borderBottom = '2px solid transparent';
      normalTab.classList.remove('x2-tab-active');
      
      normalContent.style.display = 'none';
      capsContent.style.display = 'block';
      
      // Hide the original composer container when in caps mode
      if (parentContainer) {
        parentContainer.style.display = 'none';
      }
      
      // Update caps content with uppercase text
      updateCapsContent();
    });
    
    // Function to clear translated content when switching tabs
    function updateCapsContent() {
      // Clear translated text when switching to translate tab
      capsTextDisplay.textContent = '';
    }
    
    // Monitor changes to the original composer
    const observer = new MutationObserver(() => {
      if (capsTab.classList.contains('x2-tab-active')) {
        updateCapsContent();
      }
    });
    
    // Start observing the composer for changes
    const textElement = normalContent.querySelector('[role="textbox"][contenteditable="true"], [data-testid^="tweetTextarea_"]');
    if (textElement) {
      observer.observe(textElement, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
    
    // Assemble the tab interface
    tabContainer.appendChild(normalTab);
    tabContainer.appendChild(capsTab);
    
    wrapper.appendChild(tabContainer);
    wrapper.appendChild(normalContent);
    wrapper.appendChild(capsContent);
    
    // Insert wrapper before the composer's parent container
    parentContainer.parentNode.insertBefore(wrapper, parentContainer);
    
    // Move the original parent container (with composer) into normalContent
    normalContent.appendChild(parentContainer);
  });
}

// Setup observer for reply composers
function observeReplyComposers() {
  // Initial setup
  setupReplyComposerTabs();
  
  // Watch for new composers being added
  const observer = new MutationObserver(() => {
    setupReplyComposerTabs();
  });
  
  // Observe the entire document for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Start the reply composer enhancement after page loads
setTimeout(() => {
  observeReplyComposers();
}, 2500);

// Also check periodically for new composers
setInterval(() => {
  setupReplyComposerTabs();
}, 5000);


console.log('Twitter Enhancer Extension loaded');
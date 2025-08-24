// Font data from fonts.json - all 50 fonts
const AVAILABLE_FONTS = [
  // Display Fonts
  { id: "02sotpja0fvji3h", name: "Single Day", category: "DISPLAY", fontFamily: "'Single Day', cursive" },
  { id: "5z9eu1qjogoyl1j", name: "Yeseva One", category: "DISPLAY", fontFamily: "'Yeseva One', cursive" },
  { id: "92dkysofm4cwxrp", name: "Spirax", category: "DISPLAY", fontFamily: "'Spirax', cursive" },
  { id: "egwdmddv9m4bjs2", name: "Tektur", category: "DISPLAY", fontFamily: "'Tektur', cursive" },
  { id: "n30a6u2wbgpc0dj", name: "Protest Strike", category: "DISPLAY", fontFamily: "'Protest Strike', cursive" },
  { id: "nhrj36ye92tgmy9", name: "Trade Winds", category: "DISPLAY", fontFamily: "'Trade Winds', cursive" },
  { id: "dkeeecb9hfe8yfd", name: "Turret Road", category: "DISPLAY", fontFamily: "'Turret Road', cursive" },
  { id: "j38tgh3oi7zdhqw", name: "Skranji", category: "DISPLAY", fontFamily: "'Skranji', cursive" },
  { id: "o77aa38j0ox3sce", name: "Trochut", category: "DISPLAY", fontFamily: "'Trochut', cursive" },
  { id: "pdokxl7l209wt52", name: "Silkscreen", category: "DISPLAY", fontFamily: "'Silkscreen', cursive" },
  
  // Handwriting Fonts
  { id: "05gutt76t92slb8", name: "Nerko One", category: "HANDWRITING", fontFamily: "'Nerko One', cursive" },
  { id: "218ocr3yynfl11w", name: "Nanum Pen Script", category: "HANDWRITING", fontFamily: "'Nanum Pen Script', cursive" },
  { id: "48hlm5r44q1m0te", name: "Square Peg", category: "HANDWRITING", fontFamily: "'Square Peg', cursive" },
  { id: "859u2gdhfojm8zz", name: "The Girl Next Door", category: "HANDWRITING", fontFamily: "'The Girl Next Door', cursive" },
  { id: "lua6o9nf1n88fkd", name: "WindSong", category: "HANDWRITING", fontFamily: "'WindSong', cursive" },
  { id: "nrc1mkxaicl0y2s", name: "Nanum Gothic Coding", category: "HANDWRITING", fontFamily: "'Nanum Gothic Coding', cursive" },
  
  // Sans Serif Fonts
  { id: "3qx8nya7o059lco", name: "Mozilla Headline", category: "SANS_SERIF", fontFamily: "'Mozilla Headline', serif" },
  { id: "4crqhj3h8jfbkd6", name: "Special Gothic", category: "SANS_SERIF", fontFamily: "'Special Gothic', serif" },
  { id: "4p3eiqeydywt3jj", name: "Prompt", category: "SANS_SERIF", fontFamily: "'Prompt', serif" },
  { id: "4ryjfn6c164yri7", name: "Teachers", category: "SANS_SERIF", fontFamily: "'Teachers', serif" },
  { id: "9wbwdn1er3git2t", name: "Yantramanav", category: "SANS_SERIF", fontFamily: "'Yantramanav', serif" },
  { id: "hdlk04j2bgyhb6r", name: "Syne", category: "SANS_SERIF", fontFamily: "'Syne', serif" },
  { id: "mujbxoegvoygr7f", name: "Titillium Web", category: "SANS_SERIF", fontFamily: "'Titillium Web', serif" },
  { id: "n1mfpmy8gry7k8n", name: "Mukta", category: "SANS_SERIF", fontFamily: "'Mukta', serif" },
  { id: "1x3oqg7wk82xo5v", name: "Rokkitt VF Beta", category: "SANS_SERIF", fontFamily: "'Rokkitt VF Beta', serif" },
  { id: "5157ulqhmza0jhf", name: "Winky Sans", category: "SANS_SERIF", fontFamily: "'Winky Sans', serif" },
  { id: "c1ih7kvb0q68zk2", name: "Tirra", category: "SANS_SERIF", fontFamily: "'Tirra', serif" },
  { id: "gtz819eep3p8yuv", name: "Yaldevi Colombo", category: "SANS_SERIF", fontFamily: "'Yaldevi Colombo', serif" },
  { id: "irhho0fmj0jhq97", name: "Smooch Sans", category: "SANS_SERIF", fontFamily: "'Smooch Sans', serif" },
  { id: "lx1xx622v8ph967", name: "Trispace", category: "SANS_SERIF", fontFamily: "'Trispace', serif" },
  { id: "o1l3l9l5wuky9ke", name: "Tajawal", category: "SANS_SERIF", fontFamily: "'Tajawal', serif" },
  { id: "1ifhh8z6dkgny62", name: "Tenali Ramakrishna", category: "SANS_SERIF", fontFamily: "'Tenali Ramakrishna', serif" },
  { id: "1lfgw4o20sjw1e0", name: "Mooli", category: "SANS_SERIF", fontFamily: "'Mooli', serif" },
  
  // Monospace Fonts
  { id: "6v1tfy3we9lflvn", name: "Victor Mono", category: "MONOSPACE", fontFamily: "'Victor Mono', monospace" },
  { id: "h1ufafypkqekk8o", name: "Ubuntu Mono", category: "MONOSPACE", fontFamily: "'Ubuntu Mono', monospace" },
  { id: "apnpuw2fwpgec12", name: "Spline Sans Mono", category: "MONOSPACE", fontFamily: "'Spline Sans Mono', monospace" },
  { id: "i6te39fwzskq7l8", name: "Ubuntu Sans Mono", category: "MONOSPACE", fontFamily: "'Ubuntu Sans Mono', monospace" },
  { id: "ksz2q4gupv2rkwz", name: "Xanh Mono", category: "MONOSPACE", fontFamily: "'Xanh Mono', monospace" },
  { id: "tkrz0rftdixurg0", name: "Sometype Mono", category: "MONOSPACE", fontFamily: "'Sometype Mono', monospace" },
  { id: "yqhpixmyh4h57qg", name: "M PLUS 1 Code", category: "MONOSPACE", fontFamily: "'M PLUS 1 Code', monospace" },
  
  // Serif Fonts
  { id: "7y6pux4v88g770v", name: "Trirong", category: "SERIF", fontFamily: "'Trirong', serif" },
  { id: "egd26toxu3n9zkv", name: "Taviraj", category: "SERIF", fontFamily: "'Taviraj', serif" },
  { id: "ujiqg6ua3fptekv", name: "Vollkorn", category: "SERIF", fontFamily: "'Vollkorn', serif" },
  { id: "36pjk1nb688rjn1", name: "Noticia Text", category: "SERIF", fontFamily: "'Noticia Text', serif" },
  { id: "5ctwxbiyttpqz1p", name: "KoPub Batang", category: "SERIF", fontFamily: "'KoPub Batang', serif" },
  { id: "dp0omid3wqs39gl", name: "Solway", category: "SERIF", fontFamily: "'Solway', serif" },
  { id: "iqix8l5cwdox342", name: "Noto Nastaliq Urdu", category: "SERIF", fontFamily: "'Noto Nastaliq Urdu', serif" },
  { id: "jawcqt117q1egge", name: "Zen Old Mincho", category: "SERIF", fontFamily: "'Zen Old Mincho', serif" },
  { id: "jpge3gzb0iladgz", name: "Yrsa", category: "SERIF", fontFamily: "'Yrsa', serif" },
  { id: "opsqamthtgsnlcu", name: "Unna", category: "SERIF", fontFamily: "'Unna', serif" }
];

document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      
      // Update active states
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      button.classList.add('active');
      document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
  });

  // Load saved settings
  chrome.storage.local.get([
    'theme', 'blockAds', 'showQuotes', 'fontSize',
    'hideMedia', 'hideStats', 'hideGrok',
    'groqApiKey', 'selectedModel', 'writingModel', 'targetLanguage',
    'enabledLanguages', 'languageStates', 'enableAutoTranslation',
    'useCustomFont', 'selectedFont'
  ], function(result) {
    const currentTheme = result.theme || 'original';
    const blockAds = result.blockAds !== false;
    const showQuotes = result.showQuotes !== false;
    const fontSize = result.fontSize || 13;
    const hideMedia = result.hideMedia !== false;
    const hideStats = result.hideStats === true;  // Only true if explicitly enabled
    const hideGrok = result.hideGrok !== false;
    const groqApiKey = result.groqApiKey || '';
    const selectedModel = result.selectedModel || 'llama3-8b-8192';
    const writingModel = result.writingModel || 'llama3-8b-8192';
    const targetLanguage = result.targetLanguage || 'english';
    const enableAutoTranslation = result.enableAutoTranslation !== false; // Default to true
    const useCustomFont = result.useCustomFont === true; // Default to false
    const selectedFont = result.selectedFont || 'default';
    
    // Load enabled languages (default to the original set)
    const enabledLanguages = result.enabledLanguages || DEFAULT_LANGUAGES;
    const languageStates = result.languageStates || {};
    
    // Update UI - Theme
    document.getElementById('currentTheme').textContent = getThemeName(currentTheme);
    
    // Highlight active theme button
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.theme === currentTheme) {
        btn.classList.add('active');
      }
    });
    
    // Update UI - Settings
    document.getElementById('adBlockToggle').checked = blockAds;
    document.getElementById('quotesToggle').checked = showQuotes;
    document.getElementById('hideMediaToggle').checked = hideMedia;
    document.getElementById('hideStatsToggle').checked = hideStats;
    document.getElementById('hideGrokToggle').checked = hideGrok;
    document.getElementById('fontSizeSlider').value = fontSize;
    document.getElementById('fontSizeValue').textContent = fontSize + 'px';
    
    // Update UI - Font Selector
    document.getElementById('useCustomFontToggle').checked = useCustomFont;
    document.getElementById('fontDropdownContainer').style.display = useCustomFont ? 'block' : 'none';
    
    // Populate font dropdown
    populateFontDropdown(selectedFont);
    
    // Update UI - Translation (now dynamic)
    renderLanguageToggles(enabledLanguages, languageStates);
    
    // Populate the language dropdown
    populateLanguageDropdown(enabledLanguages);
    
    // Show/hide API key warning
    const warningElement = document.getElementById('api-key-warning');
    if (!groqApiKey && warningElement) {
      warningElement.style.display = 'block';
    } else if (warningElement) {
      warningElement.style.display = 'none';
    }
    
    // Update UI - Model Config
    if (groqApiKey) {
      document.getElementById('groqApiKey').value = groqApiKey;
    }
    document.getElementById('modelPicker').value = selectedModel;
    document.getElementById('writingModelPicker').value = writingModel;
    
    // Update UI - Target Language
    document.getElementById('targetLanguage').value = targetLanguage;
    
    // Update UI - Enable Auto Translation
    document.getElementById('enableAutoTranslation').checked = enableAutoTranslation;
  });
  
  // Theme selection
  document.querySelectorAll('.theme-btn').forEach(button => {
    button.addEventListener('click', function() {
      const theme = this.dataset.theme;
      
      // Update active states
      document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      
      // Save theme preference
      chrome.storage.local.set({ theme: theme });
      
      // Update current theme display
      document.getElementById('currentTheme').textContent = getThemeName(theme);
      
      // Send message to content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'changeTheme',
          theme: theme
        });
      });
    });
  });
  
  // Ad block toggle
  document.getElementById('adBlockToggle').addEventListener('change', function() {
    const enabled = this.checked;
    chrome.storage.local.set({ blockAds: enabled });
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleAdBlock',
        enabled: enabled
      });
    });
  });
  
  // Quotes toggle
  document.getElementById('quotesToggle').addEventListener('change', function() {
    const enabled = this.checked;
    chrome.storage.local.set({ showQuotes: enabled });
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleQuotes',
        enabled: enabled
      });
    });
  });
  
  // Hide Media toggle
  document.getElementById('hideMediaToggle').addEventListener('change', function() {
    const enabled = this.checked;
    chrome.storage.local.set({ hideMedia: enabled });
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleHideMedia',
        enabled: enabled
      });
    });
  });
  
  // Hide Stats toggle
  document.getElementById('hideStatsToggle').addEventListener('change', function() {
    const enabled = this.checked;
    chrome.storage.local.set({ hideStats: enabled });
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleHideStats',
        enabled: enabled
      });
    });
  });
  
  // Hide Grok toggle
  document.getElementById('hideGrokToggle').addEventListener('change', function() {
    const enabled = this.checked;
    chrome.storage.local.set({ hideGrok: enabled });
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleHideGrok',
        enabled: enabled
      });
    });
  });
  
  // Font size slider
  document.getElementById('fontSizeSlider').addEventListener('input', function() {
    const size = this.value;
    document.getElementById('fontSizeValue').textContent = size + 'px';
    chrome.storage.local.set({ fontSize: parseInt(size) });
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'changeFontSize',
        size: parseInt(size)
      });
    });
  });
  
  // Save API key
  document.getElementById('saveApiKey').addEventListener('click', function() {
    const apiKey = document.getElementById('groqApiKey').value;
    chrome.storage.local.set({ groqApiKey: apiKey }, function() {
      // Update warning visibility
      const warningElement = document.getElementById('api-key-warning');
      if (apiKey && warningElement) {
        warningElement.style.display = 'none';
      } else if (!apiKey && warningElement) {
        warningElement.style.display = 'block';
      }
      
      // Show save confirmation
      const button = document.getElementById('saveApiKey');
      const originalText = button.textContent;
      button.textContent = 'Saved!';
      button.style.background = 'linear-gradient(135deg, #9FC131 0%, #DBF227 100%)';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2000);
      
      // Notify content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'updateApiKey',
          apiKey: apiKey
        });
      });
    });
  });
  
  // Translation toggles - removed as they're now handled dynamically
  // The old static toggles have been replaced with the dynamic language system
  // Language toggles are created in renderLanguageToggles() function
  
  // Model picker for reading
  document.getElementById('modelPicker').addEventListener('change', function() {
    const selectedModel = this.value;
    chrome.storage.local.set({ selectedModel: selectedModel });
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'updateModel',
        model: selectedModel
      });
    });
  });
  
  // Model picker for writing
  document.getElementById('writingModelPicker').addEventListener('change', function() {
    const writingModel = this.value;
    chrome.storage.local.set({ writingModel: writingModel });
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'updateWritingModel',
        model: writingModel
      });
    });
  });
  
  // Target language picker
  document.getElementById('targetLanguage').addEventListener('change', function() {
    const targetLanguage = this.value;
    chrome.storage.local.set({ targetLanguage: targetLanguage });
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'updateTargetLanguage',
        language: targetLanguage
      });
    });
  });
  
  // Enable Auto Translation toggle
  document.getElementById('enableAutoTranslation').addEventListener('change', function() {
    const enabled = this.checked;
    chrome.storage.local.set({ enableAutoTranslation: enabled });
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleAutoTranslation',
        enabled: enabled
      });
    });
  });
  
  // Custom font toggle
  document.getElementById('useCustomFontToggle').addEventListener('change', function() {
    const enabled = this.checked;
    const dropdown = document.getElementById('fontDropdownContainer');
    
    chrome.storage.local.set({ useCustomFont: enabled });
    dropdown.style.display = enabled ? 'block' : 'none';
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleCustomFont',
        enabled: enabled
      });
    });
  });
  
  // Font selector
  document.getElementById('fontSelector').addEventListener('change', function() {
    const fontId = this.value;
    chrome.storage.local.set({ selectedFont: fontId });
    
    // Update the dropdown's display font to match selection
    if (fontId === 'default') {
      this.style.fontFamily = '';
    } else {
      const selectedFont = AVAILABLE_FONTS.find(f => f.id === fontId);
      if (selectedFont) {
        this.style.fontFamily = selectedFont.fontFamily;
      }
    }
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'changeFont',
        fontId: fontId
      });
    });
  });
});

function getThemeName(theme) {
  const names = {
    'original': 'Original',
    'midnight': 'Midnight Dream',
    'forest': 'Forest Zen',
    'greenglobe': 'Green Globe',
    'hackernews': 'Hacker News'
  };
  return names[theme] || 'Original';
}

// Populate font dropdown with preview text
function populateFontDropdown(selectedFontId) {
  const select = document.getElementById('fontSelector');
  // Clear existing options safely
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
  // Add default option
  const defaultOption = document.createElement('option');
  defaultOption.value = 'default';
  defaultOption.textContent = 'Default (Twitter Font)';
  select.appendChild(defaultOption);
  
  // Group fonts by category for better organization
  const categories = {
    'SERIF': 'Serif',
    'SANS_SERIF': 'Sans Serif', 
    'MONOSPACE': 'Monospace',
    'DISPLAY': 'Display',
    'HANDWRITING': 'Handwriting'
  };
  
  Object.entries(categories).forEach(([categoryKey, categoryName]) => {
    const fontsInCategory = AVAILABLE_FONTS.filter(font => font.category === categoryKey);
    if (fontsInCategory.length > 0) {
      const optgroup = document.createElement('optgroup');
      optgroup.label = categoryName;
      
      fontsInCategory.forEach(font => {
        const option = document.createElement('option');
        option.value = font.id;
        option.textContent = font.name;
        // Use the fontFamily value directly as it already has proper quotes
        option.style.fontFamily = font.fontFamily;
        if (selectedFontId === font.id) {
          option.selected = true;
          // Also set the dropdown's display font
          select.style.fontFamily = font.fontFamily;
        }
        optgroup.appendChild(option);
      });
      
      select.appendChild(optgroup);
    }
  });
  
  // If default is selected, clear the font
  if (selectedFontId === 'default' || !selectedFontId) {
    select.style.fontFamily = '';
  }
}

// Render language toggles dynamically
function renderLanguageToggles(enabledLanguages, languageStates) {
  const container = document.getElementById('translationToggles');
  // Clear container safely
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  Object.entries(enabledLanguages).forEach(([code, name]) => {
    const item = document.createElement('div');
    item.className = 'language-toggle-item';
    
    const content = document.createElement('div');
    content.className = 'language-toggle-content';
    
    const toggle = document.createElement('div');
    toggle.className = 'toggle-item';
    // Create toggle elements safely
    const label = document.createElement('label');
    label.className = 'switch';
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `translate${code.toUpperCase()}`;
    input.checked = languageStates[code] || false;
    label.appendChild(input);
    
    const slider = document.createElement('span');
    slider.className = 'slider';
    label.appendChild(slider);
    
    toggle.appendChild(label);
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;
    toggle.appendChild(nameSpan);
    
    content.appendChild(toggle);
    item.appendChild(content);
    
    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-language-btn';
    deleteBtn.textContent = '🗑️';
    deleteBtn.title = `Remove ${name}`;
    deleteBtn.onclick = () => removeLanguage(code);
    
    item.appendChild(deleteBtn);
    container.appendChild(item);
    
    // Add event listener for toggle
    const checkbox = document.getElementById(`translate${code.toUpperCase()}`);
    checkbox.addEventListener('change', function() {
      const enabled = this.checked;
      
      // Save state
      chrome.storage.local.get(['languageStates'], function(result) {
        const states = result.languageStates || {};
        states[code] = enabled;
        chrome.storage.local.set({ languageStates: states });
      });
      
      // Send message to content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: `toggleTranslate${code.toUpperCase()}`,
          enabled: enabled
        });
      });
    });
  });
}

// Populate language dropdown
function populateLanguageDropdown(enabledLanguages) {
  const select = document.getElementById('languageSelect');
  // Clear and add default option safely
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a language...';
  select.appendChild(defaultOption);
  
  // Add all available languages that aren't already enabled
  Object.entries(ALL_LANGUAGES).forEach(([code, info]) => {
    if (!enabledLanguages[code]) {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = `${info.name} (${info.script})`;
      select.appendChild(option);
    }
  });
}

// Add language button handlers
document.getElementById('addLanguageBtn').addEventListener('click', function() {
  const dropdown = document.getElementById('languageDropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('confirmAddLanguage').addEventListener('click', function() {
  const select = document.getElementById('languageSelect');
  const code = select.value;
  
  if (code && ALL_LANGUAGES[code]) {
    chrome.storage.local.get(['enabledLanguages', 'languageStates'], function(result) {
      const enabledLanguages = result.enabledLanguages || DEFAULT_LANGUAGES;
      const languageStates = result.languageStates || {};
      
      // Add the new language
      enabledLanguages[code] = ALL_LANGUAGES[code].name;
      languageStates[code] = false; // Start disabled
      
      // Save and update UI
      chrome.storage.local.set({ 
        enabledLanguages: enabledLanguages,
        languageStates: languageStates 
      }, function() {
        renderLanguageToggles(enabledLanguages, languageStates);
        populateLanguageDropdown(enabledLanguages);
        document.getElementById('languageDropdown').style.display = 'none';
        select.value = '';
      });
    });
  }
});

document.getElementById('cancelAddLanguage').addEventListener('click', function() {
  document.getElementById('languageDropdown').style.display = 'none';
  document.getElementById('languageSelect').value = '';
});

// Remove language function
function removeLanguage(code) {
  if (confirm(`Remove ${ALL_LANGUAGES[code]?.name || code} from translation languages?`)) {
    chrome.storage.local.get(['enabledLanguages', 'languageStates'], function(result) {
      const enabledLanguages = result.enabledLanguages || DEFAULT_LANGUAGES;
      const languageStates = result.languageStates || {};
      
      // Remove the language
      delete enabledLanguages[code];
      delete languageStates[code];
      
      // Save and update UI
      chrome.storage.local.set({ 
        enabledLanguages: enabledLanguages,
        languageStates: languageStates 
      }, function() {
        renderLanguageToggles(enabledLanguages, languageStates);
        populateLanguageDropdown(enabledLanguages);
        
        // Notify content script to disable this language
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: `toggleTranslate${code.toUpperCase()}`,
            enabled: false
          });
        });
      });
    });
  }
}
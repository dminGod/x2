// Dynamically load font-face rules with proper Chrome extension URLs
function loadExtensionFonts() {
  const fontDefinitions = [
    // Display Fonts
    { family: 'Single Day', file: 'SingleDay-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Yeseva One', file: 'YesevaOne-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Spirax', file: 'Spirax-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Tektur', file: 'Tektur[wdth,wght].ttf', weight: 400, style: 'normal' },
    { family: 'Protest Strike', file: 'ProtestStrike-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Trade Winds', file: 'TradeWinds-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Turret Road', file: 'TurretRoad-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Skranji', file: 'Skranji-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Trochut', file: 'Trochut-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Silkscreen', file: 'Silkscreen-Regular.ttf', weight: 400, style: 'normal' },
    
    // Handwriting Fonts
    { family: 'Nerko One', file: 'NerkoOne-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Nanum Pen Script', file: 'NanumPenScript-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Square Peg', file: 'SquarePeg-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'The Girl Next Door', file: 'TheGirlNextDoor.ttf', weight: 400, style: 'normal' },
    { family: 'WindSong', file: 'WindSong-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Nanum Gothic Coding', file: 'NanumGothicCoding-Regular.ttf', weight: 400, style: 'normal' },
    
    // Sans Serif Fonts
    { family: 'Mozilla Headline', file: 'MozillaHeadline[wdth,wght].ttf', weight: 400, style: 'normal' },
    { family: 'Special Gothic', file: 'SpecialGothic[wdth,wght].ttf', weight: 400, style: 'normal' },
    { family: 'Prompt', file: 'Prompt-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Teachers', file: 'Teachers[wght].ttf', weight: 400, style: 'normal' },
    { family: 'Yantramanav', file: 'Yantramanav-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Syne', file: 'Syne[wght].ttf', weight: 400, style: 'normal' },
    { family: 'Titillium Web', file: 'TitilliumWeb-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Mukta', file: 'Mukta-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Rokkitt VF Beta', file: 'RokkittVFBeta.ttf', weight: 400, style: 'normal' },
    { family: 'Winky Sans', file: 'WinkySans[wght].ttf', weight: 400, style: 'normal' },
    { family: 'Tirra', file: 'Tirra-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Yaldevi Colombo', file: 'YaldeviColombo-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Smooch Sans', file: 'SmoochSans[wght].ttf', weight: 400, style: 'normal' },
    { family: 'Trispace', file: 'Trispace[wdth,wght].ttf', weight: 400, style: 'normal' },
    { family: 'Tajawal', file: 'Tajawal-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Tenali Ramakrishna', file: 'TenaliRamakrishna-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Mooli', file: 'Mooli-Regular.ttf', weight: 400, style: 'normal' },
    
    // Monospace Fonts
    { family: 'Victor Mono', file: 'VictorMono[wght].ttf', weight: 400, style: 'normal' },
    { family: 'Ubuntu Mono', file: 'UbuntuMono-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Spline Sans Mono', file: 'SplineSansMono[wght].ttf', weight: 400, style: 'normal' },
    { family: 'Ubuntu Sans Mono', file: 'UbuntuSansMono[wght].ttf', weight: 400, style: 'normal' },
    { family: 'Xanh Mono', file: 'XanhMono-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Sometype Mono', file: 'SometypeMono[wght].ttf', weight: 400, style: 'normal' },
    { family: 'M PLUS 1 Code', file: 'MPLUS1Code[wght].ttf', weight: 400, style: 'normal' },
    
    // Serif Fonts
    { family: 'Trirong', file: 'Trirong-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Taviraj', file: 'Taviraj-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Vollkorn', file: 'Vollkorn[wght].ttf', weight: 400, style: 'normal' },
    { family: 'Noticia Text', file: 'NoticiaText-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'KoPub Batang', file: 'KoPubBatang-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Solway', file: 'Solway-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Noto Nastaliq Urdu', file: 'NotoNastaliqUrdu[wght].ttf', weight: 400, style: 'normal' },
    { family: 'Zen Old Mincho', file: 'ZenOldMincho-Regular.ttf', weight: 400, style: 'normal' },
    { family: 'Yrsa', file: 'Yrsa[wght].ttf', weight: 400, style: 'normal' },
    { family: 'Unna', file: 'Unna-Regular.ttf', weight: 400, style: 'normal' }
  ];

  // Create a style element to hold all font-face rules
  const styleElement = document.createElement('style');
  styleElement.id = 'extension-fonts';
  
  let fontFaceRules = '';
  
  fontDefinitions.forEach(font => {
    const fontUrl = chrome.runtime.getURL(`fonts/${font.file}`);
    fontFaceRules += `
      @font-face {
        font-family: '${font.family}';
        src: url('${fontUrl}') format('truetype');
        font-weight: ${font.weight};
        font-style: ${font.style};
        font-display: swap;
      }
    `;
  });
  
  styleElement.textContent = fontFaceRules;
  document.head.appendChild(styleElement);
}

// Load fonts when the script runs
loadExtensionFonts();
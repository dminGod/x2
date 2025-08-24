// Load fonts for the popup window to display in dropdown
function loadPopupFonts() {
  const fontDefinitions = [
    // Display Fonts
    { family: 'Single Day', file: 'SingleDay-Regular.ttf' },
    { family: 'Yeseva One', file: 'YesevaOne-Regular.ttf' },
    { family: 'Spirax', file: 'Spirax-Regular.ttf' },
    { family: 'Tektur', file: 'Tektur[wdth,wght].ttf' },
    { family: 'Protest Strike', file: 'ProtestStrike-Regular.ttf' },
    { family: 'Trade Winds', file: 'TradeWinds-Regular.ttf' },
    { family: 'Turret Road', file: 'TurretRoad-Regular.ttf' },
    { family: 'Skranji', file: 'Skranji-Regular.ttf' },
    { family: 'Trochut', file: 'Trochut-Regular.ttf' },
    { family: 'Silkscreen', file: 'Silkscreen-Regular.ttf' },
    
    // Handwriting Fonts
    { family: 'Nerko One', file: 'NerkoOne-Regular.ttf' },
    { family: 'Nanum Pen Script', file: 'NanumPenScript-Regular.ttf' },
    { family: 'Square Peg', file: 'SquarePeg-Regular.ttf' },
    { family: 'The Girl Next Door', file: 'TheGirlNextDoor.ttf' },
    { family: 'WindSong', file: 'WindSong-Regular.ttf' },
    { family: 'Nanum Gothic Coding', file: 'NanumGothicCoding-Regular.ttf' },
    
    // Sans Serif Fonts
    { family: 'Mozilla Headline', file: 'MozillaHeadline[wdth,wght].ttf' },
    { family: 'Special Gothic', file: 'SpecialGothic[wdth,wght].ttf' },
    { family: 'Prompt', file: 'Prompt-Regular.ttf' },
    { family: 'Teachers', file: 'Teachers[wght].ttf' },
    { family: 'Yantramanav', file: 'Yantramanav-Regular.ttf' },
    { family: 'Syne', file: 'Syne[wght].ttf' },
    { family: 'Titillium Web', file: 'TitilliumWeb-Regular.ttf' },
    { family: 'Mukta', file: 'Mukta-Regular.ttf' },
    { family: 'Rokkitt VF Beta', file: 'RokkittVFBeta.ttf' },
    { family: 'Winky Sans', file: 'WinkySans[wght].ttf' },
    { family: 'Tirra', file: 'Tirra-Regular.ttf' },
    { family: 'Yaldevi Colombo', file: 'YaldeviColombo-Regular.ttf' },
    { family: 'Smooch Sans', file: 'SmoochSans[wght].ttf' },
    { family: 'Trispace', file: 'Trispace[wdth,wght].ttf' },
    { family: 'Tajawal', file: 'Tajawal-Regular.ttf' },
    { family: 'Tenali Ramakrishna', file: 'TenaliRamakrishna-Regular.ttf' },
    { family: 'Mooli', file: 'Mooli-Regular.ttf' },
    
    // Monospace Fonts
    { family: 'Victor Mono', file: 'VictorMono[wght].ttf' },
    { family: 'Ubuntu Mono', file: 'UbuntuMono-Regular.ttf' },
    { family: 'Spline Sans Mono', file: 'SplineSansMono[wght].ttf' },
    { family: 'Ubuntu Sans Mono', file: 'UbuntuSansMono[wght].ttf' },
    { family: 'Xanh Mono', file: 'XanhMono-Regular.ttf' },
    { family: 'Sometype Mono', file: 'SometypeMono[wght].ttf' },
    { family: 'M PLUS 1 Code', file: 'MPLUS1Code[wght].ttf' },
    
    // Serif Fonts
    { family: 'Trirong', file: 'Trirong-Regular.ttf' },
    { family: 'Taviraj', file: 'Taviraj-Regular.ttf' },
    { family: 'Vollkorn', file: 'Vollkorn[wght].ttf' },
    { family: 'Noticia Text', file: 'NoticiaText-Regular.ttf' },
    { family: 'KoPub Batang', file: 'KoPubBatang-Regular.ttf' },
    { family: 'Solway', file: 'Solway-Regular.ttf' },
    { family: 'Noto Nastaliq Urdu', file: 'NotoNastaliqUrdu[wght].ttf' },
    { family: 'Zen Old Mincho', file: 'ZenOldMincho-Regular.ttf' },
    { family: 'Yrsa', file: 'Yrsa[wght].ttf' },
    { family: 'Unna', file: 'Unna-Regular.ttf' }
  ];

  // Create a style element to hold all font-face rules
  const styleElement = document.createElement('style');
  styleElement.id = 'popup-fonts';
  
  let fontFaceRules = '';
  
  fontDefinitions.forEach(font => {
    // For popup, we can use relative URLs since it's loaded from extension context
    fontFaceRules += `
      @font-face {
        font-family: '${font.family}';
        src: url('fonts/${font.file}') format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
    `;
  });
  
  styleElement.textContent = fontFaceRules;
  document.head.appendChild(styleElement);
}

// Load fonts when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPopupFonts);
} else {
  loadPopupFonts();
}
# Selected Fonts Package

## Quick Start

This folder contains 50 carefully selected fonts optimized for web use, particularly for Twitter-like interfaces.

### Files Included:
- **Font files** (.ttf) - All font files ready to use
- **fonts.json** - Metadata for all fonts
- **fonts.css** - Ready-to-use @font-face declarations
- **preview.html** - Visual preview of all fonts

### Integration:

#### Option 1: CSS Import
```html
<link rel="stylesheet" href="selected_fonts/fonts.css">
```

#### Option 2: JavaScript Dynamic Loading
```javascript
const response = await fetch('selected_fonts/fonts.json');
const { fonts } = await response.json();

fonts.forEach(font => {
    // Use font.fontFamily in your styles
    element.style.fontFamily = font.fontFamily;
});
```

#### Option 3: React/Next.js
```jsx
import fontsData from './selected_fonts/fonts.json';

const FontSelector = () => {
    return (
        <select onChange={(e) => setFontFamily(e.target.value)}>
            {fontsData.fonts.map(font => (
                <option key={font.id} value={font.fontFamily}>
                    {font.displayName}
                </option>
            ))}
        </select>
    );
};
```

### Font Categories:
- **SANS_SERIF** - Clean, modern fonts perfect for body text
- **SERIF** - Classic, readable fonts for elegant content
- **DISPLAY** - Eye-catching fonts for headlines and titles
- **HANDWRITING** - Personal, creative fonts for special touches
- **MONOSPACE** - Code-style fonts for technical content

### Usage Tips:
1. The fonts are organized by category in the metadata
2. Each font includes a pre-configured fallback font
3. Variable fonts are marked with `isVariable: true`
4. Sample text is provided for each font category

### Browser Support:
All fonts are in TrueType (.ttf) format, supported by all modern browsers.

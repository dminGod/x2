# Twitter CSS Theming Reference Guide

## Overview
This document provides a comprehensive reference for styling Twitter/X through CSS customization. Based on analysis of actual Twitter HTML pages, this guide identifies key CSS classes, variables, and patterns that can be modified to create custom themes.

## Theme System Architecture

### Data Theme Attributes
Twitter uses a `data-theme` attribute on the body element to control themes:
- `data-theme="light"` - Light mode
- `data-theme="dark"` - Dark mode  
- `data-theme="dim"` - Dim mode
- Custom themes can be added using `data-theme="custom-name"`

## CSS Variables Reference

### Core Color Variables
These CSS custom properties control the main color scheme:

```css
/* Primary Colors */
--color-background: /* HSL values */
--color-text: /* HSL values */
--color-brand: /* HSL values */
--color-border: /* HSL values */

/* Component Colors */
--background: /* Background for main content */
--foreground: /* Text on main background */
--card: /* Card/panel backgrounds */
--card-foreground: /* Text on cards */
--primary: /* Primary action color */
--secondary: /* Secondary elements */
--muted: /* Muted text/elements */
--accent: /* Accent highlights */
```

### Specific Color Classes

#### Background Colors
| Class | Default Color | Usage |
|-------|--------------|-------|
| `.r-14lw9ot` | rgba(255,255,255,1.00) | White backgrounds |
| `.r-kemksi` | rgba(0,0,0,1.00) | Black backgrounds |
| `.r-x572qd` | rgba(247,249,249,1.00) | Light gray backgrounds |
| `.r-yfoy6g` | rgba(21,32,43,1.00) | Dark backgrounds |
| `.r-1niwhzg` | rgba(0,0,0,0.00) | Transparent |

#### Text Colors
| Class | Default Color | Usage |
|-------|--------------|-------|
| `.r-18jsvk2` | rgba(15,20,25,1.00) | Primary text (dark) |
| `.r-1nao33i` | rgba(231,233,234,1.00) | Primary text (light) |
| `.r-14j79pv` | rgba(83,100,113,1.00) | Secondary/muted text |
| `.r-jwli3a` | rgba(255,255,255,1.00) | White text |

## Key Structural Elements

### Main Layout Components
```css
/* Root containers */
#react-root { /* Main app container */ }
#layers { /* Modal/overlay system */ }

/* Navigation */
[data-testid="AppTabBar_*_Link"] { /* Nav links */ }
[data-testid="BottomBar"] { /* Bottom navigation */ }

/* Content areas */
[data-testid="primaryColumn"] { /* Main content column */ }
[data-testid="sidebarColumn"] { /* Sidebar */ }

/* Tweets/Posts */
article[data-testid="tweet"] { /* Individual tweets */ }
[data-testid="cellInnerDiv"] { /* Tweet container */ }
```

### Interactive Elements

#### Buttons
```css
/* Button base styles */
[role="button"] {
  /* Apply background, text color, borders */
}

/* Button states */
[role="button"]:hover {
  background-color: /* Hover color */;
}
```

#### Links
```css
a {
  color: rgb(29, 155, 240); /* Twitter blue */
}

a:hover {
  text-decoration: underline;
}
```

## Border and Effects

### Border Radius Classes
| Class | Value | Usage |
|-------|-------|-------|
| `.r-sdzlij` | 9999px | Full round (pills/circles) |
| `.r-z2wwpe` | 4px | Small radius |
| `.r-1jkafct` | 2px | Minimal radius |

### Shadow Effects
```css
/* Drop shadows */
--tw-drop-shadow: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04));

/* Backdrop blur */
--tw-backdrop-blur: blur(40px);
```

## Theming Strategy

### 1. Override CSS Variables
Best approach for comprehensive theming:
```css
body[data-theme="custom"] {
  --color-background: 0 0% 10%;
  --color-text: 0 0% 90%;
  --color-brand: 200 100% 50%;
  /* etc... */
}
```

### 2. Target Specific Classes
For granular control:
```css
body[data-theme="custom"] .r-14lw9ot {
  background-color: #1a1a1a !important;
}

body[data-theme="custom"] .r-18jsvk2 {
  color: #e0e0e0 !important;
}
```

### 3. Component-Level Styling
Target specific UI components:
```css
/* Style all tweets */
body[data-theme="custom"] article {
  background-color: #2a2a2a;
  border-color: #404040;
}

/* Style navigation */
body[data-theme="custom"] [data-testid="AppTabBar_Home_Link"] {
  color: #ffffff;
}
```

## Common Patterns

### HSL with CSS Variables
Twitter uses HSL color space with CSS variables:
```css
background-color: hsl(var(--background));
color: hsl(var(--foreground));
```

### RGB with Opacity
For transparent effects:
```css
background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
```

### Inline Styles
Some elements use inline styles that need `!important`:
```css
body[data-theme="custom"] [style*="color: rgb"] {
  color: #custom-color !important;
}
```

## Theme Implementation Checklist

- [ ] Define CSS variables for base colors
- [ ] Override background color classes (`.r-*`)
- [ ] Override text color classes (`.r-*`)
- [ ] Style navigation elements
- [ ] Style tweet/post containers
- [ ] Style buttons and interactive elements
- [ ] Style borders and separators
- [ ] Add hover/focus states
- [ ] Handle modal/overlay backgrounds
- [ ] Test in light/dark mode contexts

## Creating a New Theme for X² Extension

### Step 1: Define Your Color Palette
Choose 5-6 colors for your theme:
- **Primary Background**: Main background color
- **Secondary Background**: Cards, hover states
- **Primary Text**: Main text color  
- **Secondary Text**: Muted text, timestamps
- **Accent**: Links, highlights
- **Bright Accent**: Hover states, important elements

### Step 2: Add Theme to themes.css
Create a new section in `themes.css` following this structure:

```css
/* Theme Name - Description */
body[data-theme="themename"] {
  background-color: #primarybg !important;
  --color-background: /* HSL values */;
  --color-text: /* HSL values */;
  --color-border: /* HSL values */;
}

/* Main layout areas */
body[data-theme="themename"] #react-root {
  background-color: #primarybg !important;
}

body[data-theme="themename"] main {
  background-color: #primarybg !important;
}

/* Continue with required overrides... */
```

### Step 3: Add Theme Support in styles.css
Add quote replacement and badge styling:

```css
/* Theme name ad replacement */
body[data-theme="themename"] .quotation-replacement {
  background: /* your gradient */;
  border: 1px solid /* accent color */;
}

body[data-theme="themename"] .language-badge {
  background: /* semi-transparent accent */;
  color: /* accent color */;
  border-color: /* accent color */;
}
```

### Step 4: Register Theme in popup.html
Add theme button to the themes tab:

```html
<button class="theme-btn" data-theme="themename">
  <div class="theme-preview themename-preview"></div>
  <span>Theme Name</span>
</button>
```

### Step 5: Add Preview Style in popup.css
```css
.themename-preview {
  background: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

### Step 6: Update popup.js
Add theme name to the `getThemeName` function:

```javascript
'themename': 'Theme Display Name',
```

## Example: Green Globe Theme

The Green Globe theme uses an environmental color palette:
- **Deep Teal** (#042940): Primary background
- **Teal** (#005C53): Secondary background
- **Olive Green** (#9FC131): Links and accents
- **Bright Lime** (#DBF227): Highlights and hover
- **Soft Beige** (#D6D58E): Primary text

Key implementation points:
1. Override all background classes (.r-14lw9ot, .r-x572qd, etc.)
2. Override all text classes (.r-18jsvk2, .r-14j79pv, etc.)
3. Force main div backgrounds for complete coverage
4. Style tweets with semi-transparent overlays
5. Add hover states for interactive elements

## Notes

1. **Specificity**: Use `body[data-theme="name"]` prefix for proper specificity
2. **Important Flag**: May need `!important` for inline style overrides
3. **Testing**: Test themes with different Twitter layouts (home, profile, messages)
4. **Performance**: Minimize use of universal selectors
5. **Updates**: Twitter may change classes, so themes need maintenance
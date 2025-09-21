# OSINTraX Dashboard Design Guidelines

## Design Approach
**System Selection:** Custom dark-tech aesthetic inspired by cybersecurity interfaces like Splunk, Palantir, and military command centers. This utility-focused OSINT tool requires a professional, intimidating appearance that conveys advanced intelligence capabilities.

## Core Design Elements

### A. Color Palette
**Dark Mode Primary:**
- Background: 210 25% 8% (deep navy-black)
- Surface: 210 20% 12% (slightly lighter panels)
- Card backgrounds: 210 15% 15% (elevated surfaces)

**Accent Colors:**
- Primary neon: 180 100% 50% (cyan glow for active states)
- Warning/Alert: 15 100% 65% (orange for critical data)
- Success: 120 60% 50% (green for completed scans)
- Danger: 0 80% 60% (red for threats/alerts)

**Text Colors:**
- Primary text: 0 0% 95% (near white)
- Secondary text: 210 10% 70% (muted gray)
- Accent text: 180 100% 80% (lighter cyan)

### B. Typography
**Fonts:** JetBrains Mono for code/data, Inter for UI text
- Headers: 600-700 weight, tracking-tight
- Body: 400-500 weight, leading-relaxed for readability
- Monospace data: 400 weight, letter-spacing for technical info

### C. Layout System
**Spacing:** Tailwind units 2, 4, 6, 8, 12 for consistent rhythm
- Sidebar: w-64, compact vertical spacing (p-2, gap-2)
- Main content: p-6, gap-6 between major sections
- Cards: p-4, gap-4 internal spacing

### D. Component Library

**Navigation:**
- Left sidebar with icons and labels
- Hover states with subtle cyan glow (shadow-lg shadow-cyan-500/20)
- Active states with border-l-2 border-cyan-400

**Dashboard Elements:**
- Search bar: Large, prominent with scan button
- Progress indicators: Animated bars with glow effects
- Data cards: Dark backgrounds with subtle borders
- Charts: Dark themes with cyan/orange accent colors
- Maps: Dark map tiles with glowing location pins

**Interactive Elements:**
- Buttons: Dark with cyan borders and hover glows
- Input fields: Dark backgrounds with focused cyan borders
- Toggle switches: Glowing active states
- Hover effects: Subtle scale and glow transforms

**Status Indicators:**
- Loading spinners with cyan glow
- Progress bars with animated gradients
- Status badges with appropriate color coding
- Real-time data streams with typewriter effects

### E. Visual Effects
**Subtle Animations:**
- Gentle pulse on active scan elements
- Fade-in transitions for data loading
- Smooth hover state transitions (200ms)
- Progressive loading animations for charts

**Glow Effects:**
- box-shadow with cyan/orange colors at 20% opacity
- ring-2 with glow colors for focus states
- Subtle backdrop-blur on overlays

## Specific Module Styling

**Main Dashboard:**
- Large search input with prominent scan button
- Grid layout for cards and charts
- Real-time scanning animations with status text
- Interactive map with dark theme and glowing pins

**DataHawk Military Module:**
- Enhanced security styling with red accent warnings
- Satellite imagery thumbnails with metadata overlays
- Network connection diagrams with animated data flows
- Equipment tracking with military iconography

## Data Presentation
- Monospace fonts for technical data
- Color-coded threat levels and risk scores
- Interactive tooltips with detailed information
- Fake sample data clearly labeled as "DEMO" or "SAMPLE"

This design creates a professional, intimidating OSINT interface that balances usability with the high-tech aesthetic required for cybersecurity and intelligence applications.
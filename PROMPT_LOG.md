# Team AI Prompt & Audit Log
 
**Project Name:** The Galaxy 
**Team Members:** Ximena Casillas & Santiago de la Torre
**SDG Goal Target:** [Goal # and Title]
 
---
 ## Week [X] Log Entry
*Duplicate this section for each week. If no AI was used this week, state: "No Generative AI was used in Week X."*

### 1. High-Level Goal
*What feature, component, or bug were you trying to solve this week?*
- Defining a custom CSS color palette and typography system inspired by deep space and desert sci-fi (Dune / Tatooine aesthetic) for a modern, user-friendly character search interface[cite: 1, 2].

### 2. The Interaction Log
*Document the primary prompts you used to generate the base code.*

| AI Tool Used | Exact Initial Prompt | What the AI Generated (Summary/Snippet) |
| :--- | :--- | :--- |
| *ChatGPT* | *"me das un paleta de colores para un css para busqueda de personajes, quiero que se vea moderno y agradable pata el usuario, que sea referente al espacio y ciencia ficcion en tono cafes y amarillo"* | Generated a list of CSS root variables (`:root`) with a "Desert Sci-Fi / Golden Space" theme, including dark brown backgrounds (`#1c1308`), card containers (`#2e2112`), text colors, electric yellow accents (`#ffea00`), borders, and glowing box-shadow effects[cite: 1]. |
| *ChatGPT* | *"tambien me puedes dar tipografías para que quede la estética"* | Recommended pairing Google Fonts: **Chakra Petch** (tech/angular style for titles) and **Inter** (clean sans-serif for body text)[cite: 2]. Provided the corresponding `<link>` tag to import both fonts[cite: 2]. |

### 3. The Human Audit & Modifications
*What did the AI get wrong or omit? What manual changes did you make to integrate this code into your existing application structure? (Write 2-3 sentences explaining your adjustments).*
- **What we changed/added:** We verified the contrast ratios between the neon yellow accent (`#ffea00`) and dark brown backgrounds (`#1c1308`) to ensure UI visual accessibility[cite: 1]. We integrated the CSS variables into our global stylesheet (`styles.css`), bound the font families using standard CSS rules (`font-family: 'Chakra Petch', sans-serif;` for headings), and embedded the provided Google Fonts `<link>` tag into our base HTML `<head>` file[cite: 2].

### 4. Integration & Learnings
*How does this code integrate with the rest of your system? What is the core mechanism you learned?*
- **Core Mechanics:** CSS custom properties (variables) defined in `:root` allow theme-wide maintenance and quick consistency updates across component files[cite: 1]. The UI aesthetic balances deep ambient dark backgrounds with targeted electric yellow glow effects (`box-shadow: 0 0 15px rgba(255, 234, 0, 0.35)`) to direct user focus toward search bars and active cards[cite: 1]. Using a two-font pairing ensures high-tech flavor in titles without sacrificing readability for body text or search results[cite: 2].

### 5. Oral Defense Self-Check
- [x] We can explain every single line of this code.
- [x] We understand how the asynchronous operations/CSS classes used here affect other components.
- [x] We know exactly which file and line numbers this code is located in our repository.

---
## Week [X] Log Entry (Backend - Santiago)

### 1. High-Level Goal
*What feature, component, or bug were you trying to solve this week?*
- Express backend: search by name and circular next/previous.

### 2. The Interaction Log
*Document the primary prompts you used to generate the base code.*

| AI Tool Used | Exact Initial Prompt | What the AI Generated (Summary/Snippet) |
| :--- | :--- | :--- |
| *AI assistant* | *"we're in charge of the backend, what are we supposed to do?"* | The two endpoints we need and some issues in the API data. |
| *AI assistant* | *"write the backend"* | `server.js` with a search route and a detail route with prev/next. |
| *AI assistant* | *"i think some bugs is that the json response is inconsistent isnt it"* | Confirmed it: some fields come as text or as a list depending on the character. |
| *AI assistant* | *"fix the bugs that may happen"* | Loads the data before starting the server and returns JSON errors. |

### 3. The Human Audit & Modifications
*What did the AI get wrong or omit? What manual changes did you make to integrate this code into your existing application structure? (Write 2-3 sentences explaining your adjustments).*
- **What we changed/added:** I read the generated `server.js` and rewrote the prev/next myself with `% n` so it wraps around, and tried using the list position as the ID (I also left a typo, `idnex`, that broke the detail route until we fixed it). We went back to the API IDs because the assignment asks to show them. We also made search work with no query and with IDs, and return 404 when nothing matches.

### 4. Integration & Learnings
*How does this code integrate with the rest of your system? What is the core mechanism you learned?*
- **Core Mechanics:** The frontend calls `/api/characters` on the same Express server. Prev/next uses the position in the list with modulo, so the last goes back to the first.

### 5. Oral Defense Self-Check
- [ ] We can explain every single line of this code.
- [ ] We understand how the asynchronous operations/CSS classes used here affect other components.
- [ ] We know exactly which file and line numbers this code is located in our repository.

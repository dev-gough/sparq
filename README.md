# IMPORTANT

If you've previously cloned this repo, you need to do so again before contributing, as I royally scuffed up the commit history.  Sry :)

## Getting Started

First, install the required packages (ensure you're in the main dir):

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Todo

## Hassan Notes
- In the 1st page of Homeowner Highlight, let’s just list the three bullets. And provide a link to the main Sparq Product page to see the Sparq Differentiation.
- Hassan Video (MP4) should be included in the Learning page and linked in the Homeowner and Installer pages.
- Clause 18 of posted ToS provides detailed disclaimer for third-party content! Just notify the users that by clinking on the link they are exiting Sparq website and will access third-party content ???

## Highest Prio

- firebase
    - event on form submission for support ticket
    - have to make support ticket function first

- send email to pvwats with the content from 'design my system'
    - ask for their feedback, if it's correct
    - incl a link to the site

### Content
- /products
    - Quad 3 description & "Read more"
    - Legacy products better description
    - Standardize open dropdowns (none open on mobile?)
    - integrate new info from pp slides
    - new sparqvu picture (just screenshot)

- /investors
    - Content for slider (what do we actually want showing as highlights)
- /resources
    - Home page for /resources needs overhaul
    - Homeowners/Installers should have more than just a few FAQ questions

- See if I can force zoom to 100%
- Add /resources/investors
    - include ppts

### Functionality

- add firebase console support for the site itself

- /support
    - integrate AWS email service to send out support ticket emails
- Think about integrating indian language

### Styling
-  /products
    - new image for sparqsync
-  /investors
- /products/{product}
    - Ensure consistent text sizing and colour (maybe swap to black font)
- sm:
    - /investors
        - Highlights Slider
    - /investors/stock
        - format chart for mobile (fit to vh)
    - /resources
        - format once content is finalized
    - footer
        - Spacing around address and nav links ++
        - Spacing around +tel +mailto links
- md: (tablet sizing - minwidth>=768px)
    - /investors
        - highlights slider
    - /investors/stock
        - fit the chart to 100vh - headers
    - /resources
        - style once content is finalized
    - /resources/design
        - "set the dc system size" needs to be inline, not cols

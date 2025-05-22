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

## Notes

For the split-line tailwind classes, they go from smallest->largest as you go down.  i.e. top level is for sm: classes, then md: then lg: ect

## Todo

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
    - Annual report
    - /stock
        - Integrate our stock data
- /resources
    - Home page for /resources needs overhaul
    - Homeowners/Installers should have more than just a few FAQ questions

- See if I can force zoom to 100%
- Opt in to investor highlights slider with "see details", then shows header "Our Partners are Invaluable to our Success"
- Add /resources/investors
    - include ppts

### Functionality

- /support
    - integrate AWS email service to send out support ticket emails
- Think about integrating indian language

### Styling

-  /investors
    - ensure videos do not get cut off at different screen sizes and zoom levels
- /products/{product}
    - Ensure consistent text sizing and colour (maybe swap to black font)
- sm:
    - /investors
        - Mobile video
        - Page height (take into account the smaller subheader)
        - Buttons after video
        - Highlights Slider
    - /investors/stock
        - format chart for mobile (fit to vh)
    - /resources
        - format once content is finalized
    - footer
        - Spacing around address and nav links ++
        - Spacing around +tel +mailto links
- md: (tablet sizing - minwidth>=768px)
    - /products/{product}
        - switch to mobile structure (image on top, text full width below)
    - /investors
        - tablet video / black bars
        - increase height for btns
        - highlights slider
    - /investors/stock
        - fit the chart to 100vh - headers
    - /resources
        - style once content is finalized
    - /resources/design
        - "set the dc system size" needs to be inline, not cols
- move lg: to xl: (>=1024px -> >=1280px)

- look at formatting for lg:

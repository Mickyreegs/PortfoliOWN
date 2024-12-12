# PortfoliOWN ReadMe Document

Welcome, all!  

This document aims to explain the who, what, why, and how of this website.


## PortfoliOWN

PortfoliOWN is a stock simulator designed to be an intuitive and fun way of learning about buying, selling and realising profits/losses in investments.
As a user, I want to simulate stock sortfolio construction so that I can see how daily changes affect my stocks, cash and profits (realised and unrealised). I have a full description of the game layout and operation. I can buy and sell stocks in a simulated portfolio. I can make decisions on when to buy/sell a stock based on market prices and profit/loss.

## Initial Design - Wireframe
The original idea was to have 4 boxes, 2 up/2 down, and fill those with sections with "How to Play" - Box 1, "Stock Selection" (10 stocks) - Box 2, "Build your Portfolio" - Box 3 & "Portfolio Valuation" - Box 4.  The data in each of box 2, 3, & 4 will be used together to build a portfolio and reflect the cost, unrealised gain/loss, and profit.

![Wireframe image of the PortfoliOWN webpage and layout](assets/README/WireFrame.JPG)

## General Features

### Responsive Design
The website was designed to ensure that the user can enjoy playing this game on all screen sizes.

![AmIResponsive website image of PortfoliOWN responsiveness](assets/README/AmIResponsive.JPG)


## Testing
### Code Validation
All 3 pages were put through the HTML validator tool and passed:

![HTML validator checks](readme-images/HTML%20Check%20After.JPG)

The CSS cose also passed the CSS validator test.  There was one warning - "Imported style sheets are not checked in direct input and file upload modes".  This was my import from Google Fonts and is an expected warning:

![CSS validator checks](readme-images/CSS%20code%20validation%20-%20After.JPG)

### Functional Testing
<table>
    <tr>
        <th>Action</th>
        <th>Expected Behaviour</th>
        <th>Pass/Fail</th>
    </tr>
    <tr>
        <td>Page URL</td>
        <td>Deployed page to open</td>
        <td>Pass</td>
    </tr>
    <tr>
        <td>NAV Bar</td>
        <td>NAV bar directs user to correct page</td>
        <td>Pass</td>
    </tr>
    <tr>
        <td>NAV Bar - Highlighted Page</td>
        <td>NAV bar highlights the page the user is currently on</td>
        <td>Pass</td>
    </tr>
    <tr>
        <td>Page Responsiveness</td>
        <td>Pages are responsive to mobile, tablet and desktop users</td>
        <td>Pass</td>
    </tr>
    <tr>
        <td>NAV Bar Menu</td>
        <td>Menu dropdown disappears for larger screens</td>
        <td>Pass</td>
    </tr>
    <tr>
        <td>Social Media</td>
        <td>Social media links work and open in new page</td>
        <td>Pass</td>
    </tr>
    <tr>
        <td>External Links</td>
        <td>External website links work and open in new page</td>
        <td>Pass</td>
    </tr>
    <tr>
        <td>Audio Files</td>
        <td>Audio controls operate correctly and play files</td>
        <td>Pass</td>
    </tr>
    <tr>
        <td>User forms - Input Fields</td>
        <td>Input fields are marked as required and operate as expected</td>
        <td>Pass</td>
    </tr>
    <tr>
        <td>User forms - Dropdowns</td>
        <td>Dropdown lists are marked as required and operate as expected</td>
        <td>Pass</td>
    </tr>
    <tr>
        <td>Relative Filepaths</td>
        <td>All relative filepaths function correctly to display correct content</td>
        <td>Pass</td>
    </tr>
    <tr>
        <td>Physical Test</td>
        <td>Website tested on users and their various devices</td>
        <td>Pass</td>
    </tr>
</table>

### Browser Performance
All three pages performed well on the below browsers:
<ul>
    <li>Google Chrome</li>
    <li>Microsoft Edge</li>
    <li>Mozilla Firefox</li>    
    <li>Safari</li>
</ul>


### Lighthouse Checks


### Bug Fixes
Bugs that were discovered and fixed are as follows - Screenshots are added below:
<ul>
    <li>Error 404 (HTML)</li>
    This was fixed by amending the relative filepaths in the html code pages.
    <li>Duplicate IDs (HTML)</li>
    This was fixed by removing the duplicate from the HEAD.
    <li>No Section Heading (HTML)</li>
    This was evident on the background images of all 3 pages.  It was fixed by adding a heading to each page's section and using the invisibility styling in CSS to hide it.
    <li>No P Element In Scope (HTML)</li>
    The /P tag was incorrectly placed in the section and repositioned to it's correct location.
    <li>Element without attribute must not be empty (HTML)</li>
    Label was added to the form and option with value "" had text of Choose From The Following: added to it.
    <li>Value Error: min-height (CSS)</li>
    The min-height element of the text boxes was not initially set and left blank in error.  This was fixed by giving them all a value of 150px.
    <li>.text-input Styling (CSS)</li>
    The background and border colours were initially set to whitesmoke.  As this clashed, the border was updated to gray in keeping with other border styles.
</ul>


## Known Bugs

## Deployment
The site was deployed through GitHub.  The steps taken were:
<ul>
    <li>Go to settings</li>
    <li>Select pages and apply "Deploy from branch" on the Source dropdown</li>
    <li>Our branch is set to "main" with "/root" as the folder</li>
</ul>


## Credits
### The following websites were used for informational purposes:

[Stack Overflow - General Queries](https://stackoverflow.com/)

[W3 Schools - General Queries](https://www.w3schools.com/)

[Free Code Camp - General Queries](https://www.freecodecamp.org/)

### The following websites were used visual purposes:

[Font Awesome - Header Tags](https://fontawesome.com/)

[Google Fonts](https://fonts.google.com/)

[Favicon - Head Icon](https://favicon.io/emoji-favicons/drum/)

[Pexels - Background Images](https://www.pexels.com/search/drumming/)

### The following projects were used as a reference guide to build this website:


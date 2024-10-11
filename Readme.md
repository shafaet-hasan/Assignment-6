# Pet Adoption Website

This is a responsive Pet Adoption website that allows users to browse available pets, filter by categories, like pets, and adopt them. The application integrates with an external API to dynamically fetch and display data. Users can interact with the site to see pet details, and the "Adopt" button starts a countdown timer in a modal. Additionally, the website is fully responsive and includes a "View More" button that navigates to the main section.

## Live Demo

You can check the live version of the website here:  
[Pet Adoption Website](https://pet-adoption-shafaet.netlify.app/)

## Features

- **Category Filter:** Filter pets by categories like "Cat", "Dog", etc. Each category fetches the respective pets dynamically.
- **Sort by Price:** Sort the pets by price in descending order.
- **Like Pets:** Clicking the "Like" button will add the pet's thumbnail to a liked pets grid on the right-hand side.
- **Adopt Pets:** The "Adopt" button triggers a countdown modal to confirm the adoption.
- **Responsive Design:** The website is fully responsive for both desktop and mobile views, including a responsive navbar.
- **Spinner:** A loading spinner appears while pets are being fetched from the API.
- **Error Handling:** If there are no pets in a category, a meaningful message is displayed.
- **"View More" Button:** Clicking the "View More" button scrolls the user down to the main section.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- [DaisyUI](https://daisyui.com/) for UI components
- Fetch API for data fetching
- Responsive Design with CSS Flexbox and Grid
- Netlify for hosting the live site

## Instructions

1. Clone the repository or download the ZIP file.
2. Open the `index.html` file in your browser.
3. Browse the pets, filter by categories, and enjoy the functionality.

## How to Use

- **Filtering:** Select a category from the list to filter pets. The active category is highlighted.
- **Sorting by Price:** Click on the "Sort by Price" button to sort pets in descending order of their price.
- **Liking a Pet:** Click the heart icon to like a pet. The liked pets will be displayed on the right side.
- **Adopting a Pet:** Click the "Adopt" button to trigger a countdown in a modal, confirming the adoption.

## API Endpoints

- All Pets: `https://openapi.programming-hero.com/api/peddy/pets`
- Categories: `https://openapi.programming-hero.com/api/peddy/categories`
- Pet by ID: `https://openapi.programming-hero.com/api/peddy/pet/{id}`
- Pets by Category: `https://openapi.programming-hero.com/api/peddy/category/{category}`

## Project Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/pet-adoption.git

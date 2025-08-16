Boutique Website

A modern boutique e-commerce website built with Vite, React (TypeScript), and Tailwind CSS, featuring product browsing, shopping cart, and checkout functionality.

🚀 Features

Home page (index.html) with boutique showcase

Shop page (shop.html) for product listing

Cart page (cart.html) with add/remove/update functionality

Checkout page (checkout.html) for order completion

Contact page (contact.html) and About/Blog pages

Responsive design with Tailwind CSS

React + TypeScript powered components in src/

Modular JS files for cart, shop, and checkout logic

📂 Project Structure
project/
├── index.html          # Landing page
├── shop.html           # Shop page
├── cart.html           # Shopping cart
├── checkout.html       # Checkout page
├── contact.html        # Contact page
├── about.html          # About page
├── blog.html           # Blog page
├── styles.css          # Global styles (Tailwind + custom)
├── shop.js             # Shop page logic
├── cart.js             # Cart management logic
├── checkout.js         # Checkout handling
├── contact.js          # Contact form script
├── script.js           # General scripts
├── src/                # React + TS app entry
│   ├── main.tsx
│   ├── App.tsx
│   └── index.css
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind setup
└── ...

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript, React, TypeScript

Styling: Tailwind CSS + custom CSS

Build Tool: Vite

Linting: ESLint

⚙️ Installation & Setup

Clone the repository:

git clone https://github.com/yourusername/boutique-website.git
cd boutique-website/project


Install dependencies:

npm install


Run development server:

npm run dev


Build for production:

npm run build
npm run preview

📌 Usage

Visit /shop.html to browse products.

Add items to the cart and proceed to /cart.html.

Checkout via /checkout.html.

Contact via /contact.html.



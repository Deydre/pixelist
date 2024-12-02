# Pixelist 🎮✨

This project offers a **videogames web application** where users can:

- Filter games by categories.  
- Search for games by name.  
- View detailed information about each game.

### Additional Features
- Logged-in users can:
- Mark games as favorites.  
- View their favorite games in their profile.  


## ✨ Features

- **Responsive Design**: The website is optimized for various screen sizes, ensuring a seamless experience across devices with a Mobile-First approach.
- **User-Centered UI/UX**: A visually pleasing, user-friendly interface designed to provide an enjoyable and intuitive navigation experience.
- **Dynamic API Integration**: Real-time data fetching and display from the [videogames API RAWG](https://api.rawg.io/docs/), making the content dynamic and always up-to-date.
- **Detailed Game Information**: When we click on a videogame, we can see the detail view
- **Spinner Animation**: A loading animation offers a better experience while waiting for content to load.
- **User Authentication**: Authentication JWT with cookies for secure user sign-in, providing a personalized experience.

## 📸 Some screenshots
 <img src="https://i.ibb.co/2Zzhd7F/Screenshotbb.png" alt="Desktop view of Home">
 <img src="https://i.ibb.co/fdmGVWS/image.png" alt="Desktop view of game detail with user logged">
 <img src="https://i.ibb.co/5j9xBkB/image.png" alt="Desktop view of user profile">



## 💻 Technologies Used

| Logo                                                                                          | Description                                                        |
|----------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" height="30"> | **React**: To build the website's dynamic and interactive UI.     |
| <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js Logo" height="30"> | **Node.js**: For backend development and running server-side code. |
| <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express.js Logo" height="30"> | **Express.js**: A web framework for Node.js to manage routes and APIs. |
| <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="PostgreSQL Logo" height="30"> | **PostgreSQL**: A relational database for storing structured data. |
| <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg" alt="Sass Logo" height="30"> | **Sass**: A CSS preprocessor to streamline styling and design.     |



## 📦 APIS and libraries used

| Logo                                                                                           | Description                                                        |
|------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| <img src="https://avatars.githubusercontent.com/u/221409?s=400&v=4" alt="NY Times Books API Logo" height="30"> | **NY Times Books API**: A free-to-use API that provides a vast collection of trivia questions across various categories, enabling dynamic quiz creation and engagement.               |
| 



## 🌱 Challenges Faced

- Implementing **React components and hooks** to create reusable and efficient UI elements while managing state and side effects effectively.  
- Using **asynchronous operations** for seamless integration of API calls, ensuring data fetching and error handling were managed properly.  
- Handling user session management securely with **JWT tokens stored in cookies**, including setting, validating, and expiring tokens to maintain user authentication.  


## 🛠️ Future Improvements

- **Email Validation with Regex**: Implement regex checks in the Sign Up and Log In forms to ensure valid email formatting.
- **User Verification on Sign In**: Check if a user exists in the system during sign-in, and display a warning if the user input is incorrect.
- **Favorites System**: Create a favorites feature linked to each user via **Firebase Firestore**. Add a complementary page where users can view and manage their favorite books.
- **Integration with Firebase Cloud Storage**: Allow users to upload profile pictures, storing the image URL in their Firebase Firestore document.
- **Search by List and Book Name**: Add search functionality for easy lookup of lists and specific books.
- **Book Category Filters**: Implement a filter system to sort books by category, making it easier for users to find relevant content.
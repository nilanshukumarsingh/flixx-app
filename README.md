# Flixx App 🎬

Flixx is a modern movie and TV show information app built with vanilla JavaScript. It uses [The Movie Database (TMDB) API v3](https://www.themoviedb.org/settings/api) to fetch and display data.

Features include:
- Browse popular movies and TV shows
- View detailed information pages
- Search movies and shows with pagination
- View a slider of movies currently in theaters (powered by Swiper.js)

---

## 📸 Screenshot

![Flixx Screenshot](./screenshot.png)

---

## 🚀 Getting Started

Follow the steps below to run this project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/nilanshukumarsingh/flixx-app.git
```

### 2. Navigate to the Project Folder

```bash
cd flixx-app
```

3. Install Dependencies
> This project uses only vanilla JavaScript, so there are no dependencies to install.
Just open the index.html file in your browser or use a local server.

## 🔑 Get an API Key from TMDB

To use this project, you'll need an API key from [The Movie Database (TMDB)](https://www.themoviedb.org/).

### Steps:

1. Go to the [TMDB API Settings](https://www.themoviedb.org/settings/api).
2. Sign up or log in to your account.
3. Create and copy your API key.

### Add Your API Key to the Project

1. In the project directory, open the file: `js/global.js`.
2. Replace the `apiKey` value with your API key:

```javascript
const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1
  },
  api: {
    apiKey: 'YOUR_API_KEY_HERE',
    apiUrl: 'https://api.themoviedb.org/3/'
  }
};
```
## 🧰 Development Tools Used

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- [**Swiper.js**](https://swiperjs.com/) – for slider functionality
- [**TMDB API v3**](https://developer.themoviedb.org/docs) – for fetching movie and TV show data

## 🔗 API Credits

All movie and TV show data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

---

## 📬 Contact

Have questions, suggestions, or want to contribute?  
Feel free to **open an issue** or **fork the project** and submit a pull request.

# Flixx App 🎬

Flixx is a modern movie and TV show information app built with vanilla JavaScript. It uses [The Movie Database (TMDB) API v3](https://www.themoviedb.org/settings/api) to fetch and display data.

Features include:

- Browse popular movies and TV shows
- View detailed information pages
- Search movies and shows with pagination
- View a slider of movies currently in theaters (powered by Swiper.js)

---

## 📸 Screenshot

![Flixx Screenshot](images/screen.jpg)

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

3. Start the local server

```bash
node server.js
```

Then open `http://localhost:3000` in your browser.

## 🔑 Get an API Key from TMDB

To use this project securely, you'll need an API key from [The Movie Database (TMDB)](https://www.themoviedb.org/).

### Steps:

1. Go to the [TMDB API Settings](https://www.themoviedb.org/settings/api).
2. Sign up or log in to your account.
3. Create and copy your API key.

### Add Your API Key to the Project

1. Create a `.env` file from `.env.example`.
2. Set `TMDB_KEY` to your TMDB API key.
3. Deploy the app to Vercel so the API route in [api/tmdb.js](api/tmdb.js) can use the environment variable server-side.

```env
TMDB_KEY=your_real_api_key
```

The browser now talks only to the local proxy endpoint, and the TMDB key stays on the server. Do not put the key back into frontend files.

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

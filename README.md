<p align="center">
  <img width="400" src="https://user-images.githubusercontent.com/87912847/170173939-ed0d80b7-7a5c-432a-a3a7-cc7c2f2d262e.png">
  <h3 align="center">Library-box</h3>
  <p align="center">📚Update a pinned gist to contain your latest reads & Current read from Google Books<br>For those without the GoodRead API key </p>
</p>

---

📌✨ For more pinned-gist projects like this one, check out: https://github.com/matchai/awesome-pinned-gists

## Setup

### Prep work

1. [Create a new public GitHub Gist](https://gist.github.com/)
2. [Create a token with the `gist` scope and copy it.](https://github.com/settings/tokens/new)
4. [Create an API for the Google Books](https://developers.google.com/books/docs/v1/using)
5. [Get your Google Books User ID](https://books.google.com/). It is usually located on the google books url `https://books.google.com/books?uid=**************`

### Project setup

1. Fork this repo
2. Go to the repo **Settings > Secrets**
3. Add the following environment variables:
  - **GIST_ID:** The ID of the gist you created.
  - **GH_TOKEN:** The GitHub token generated above.
  - **GOOGLE_BOOKS_KEY:** The API key for your Google Books account.
  - **GOOGLE_BOOKS_UID:** The user ID for your Google Books account.

## Inspiration

This gist was inspired by [matchai's](https://github.com/matchai) [bird-box](https://github.com/matchai/bird-box).<br>
Also inspired by [amorriscode](https://github.com/amorriscode) [book-box](https://github.com/amorriscode/book-box).

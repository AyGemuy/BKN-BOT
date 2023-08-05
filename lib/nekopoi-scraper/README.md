<a name="readme-top"></a>
<br />

<h3 align="center">Simple</h3>
<div align="center">
  <a href="#">
    <img src="https://static.zerochan.net/Frieren.full.3233127.jpg" alt="Logo">
  </a>

<h3 align="center">NekoPoi Scraper API</h3>
<img alt="npm" src="https://img.shields.io/npm/dw/nekopoi-scraper">
<img alt="NPM" src="https://img.shields.io/npm/l/nekopoi-scraper">

<a href="https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Fxct007%2Fnekopoi-scraper"></a>
<img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fxct007%2Fnekopoi-scraper&countColor=%232ccce4&style=flat" />
<img alt="CodeFactor Grade" src="https://img.shields.io/codefactor/grade/github/xct007/nekopoi-scraper/main">

</div>

## Note:

`Dont forget to star the repo :)`

### How To Use

## Basic

1. Install Packages
   ```sh
   npm install nekopoi-scraper
   ```
   or using `yarn`
   ```sh
   yarn add nekopoi-scraper
   ```
2. Import packages

- `CommonJS`
  ```js
  const { search, latest, list, detail } = require("nekopoi-scraper");
  ```
- `ESM`
  ```ts
  import { search, latest, list, detail } from "nekopoi-scraper";
  ```

## Example

<details><summary><b>Search hentai by query</b></summary>
    
```js
import { search } from "nekopoi-scraper";

const query = "love";
const limit = 10; // (optional) limit output. default 10

search(query, limit).then((data) => {
console.log(data);
});

````
Output
```js
  [
    {
      "id": Number,
      "date": String,
      "title":String,
      "image": String,
      "type": String,
    },
    ...
  ]
````

</details>

<details><summary><b>Get latest hentai</b></summary>

```js
import { latest } from "nekopoi-scraper";

latest().then((data) => {
  console.log(data);
});
```

- Output

```js
[
  {
    id: Number,
    title: String,
    image: String,
    description: String,
  },
  ...
];
```

</details>

<details><summary><b>Get hentai detail by id</b></summary>

```js
import { detail } from "nekopoi-scraper";

detail(21910).then((data) => {
  console.log(data);
});
```

- Output

```js
  {
    "id": Number,
    "date": String,
    "title": String,
    "description": String,
    "image": String,
    "info_meta": {
      "aliases": String,
      "episode": String,
      "status": String,
      "tayang": String,
      "produser": String,
      "genre": String,
      "durasi": String,
      "skor": String,
    },
    "episode": [
      {
        "id": Number,
        "date": String,
        "title": String,
        "image": String,
      },
      ...
    ]
  }
```

- Output if **id** is episode

```js
  {
    "id":Number,
    "title": String,
    "image": String,
    "series": {
      "id": Number,
      "title": String,
      "content": String,
      "image": String,
      "genre": String,
    }
    "stream": [
      {
        "link": String
      },
      ...
    ],
    "download": [
      {
        "type": String,
        "links": [
           "name": String,
           "link": String
        ]
      },
      ...
    ],
  }
```

</details>

<details><summary><b>Get List all hentai</b></summary>

```js
import { list } from "nekopoi-scraper";

const type = "jav"; // available "jav", "hentai"
const page = 1; // optional
list(type, page).then((data) => {
  console.log(data);
});
```

- Output

```js
  [
    {
      "id": Number,
      "date": String,
      "title": String,
      "image": String,
      "type":String,
    }
    ...
  ]
```

</details>

## Contributing

If have a suggestion that whould make this better, please fork and create a pull request. You can also simply open an issue. Don't forget to give the repo a star!

```
1. Fork the repo
2. Commit your Changes
3. Push to the Branch
4. Open a Pull Request
```

## Contact

David - [@david.stefen](https://instagram.com/david.stefen)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

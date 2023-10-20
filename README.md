# WebScraper

A small service api built with typescript and express for web service along with node.js for scraping data from the website https://wsa-test.vercel.app/. For scraping part it was used [Puppeteer](https://pptr.dev/) library from node.js.

## API Reference

#### Do request for scraping info

```http
  POST /scrape
```

| Body field | Value                          |
| :--------- | :----------------------------- |
| `url`      | `https://wsa-test.vercel.app/` |

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd WebScraping
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Running through Docker

Download the image from docker hub

```bash
  docker pull andreiondocker/web-scraper:1.0.0
```

For creating a container from the image

```bash
  docker run -itd --name webscraper -p 3000:3000 andreiondocker/web-scraper:1.0.0
```

## Open web browser and type [localhost:3000](http://localhost:3000)

![img1](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

![img2](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

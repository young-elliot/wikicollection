const puppeteer = require("puppeteer");
const fs = require("fs");

const category = fs
  .readFileSync("paintings-by-media.txt")
  .toString()
  .split("\n");

// console.log((category))

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  var data = {};
  for (var i of category) {
    var [url, count] = i.split(",");
    // console.log(i);
    console.log(url);
    console.log(url.split("/").slice(-1));
    var name = url.split("/").slice(-1)[0].split("?")[0];

    await page.goto(url);
    // console.log("111111");
    var picture_selector =
      "body > div.wiki-container > div.wiki-container-responsive.with-overflow > section > main > div:nth-child(4) > div > div > div.masonry-content > div > ul > li > div > a:nth-child(3)";
    //   "body > div.wiki-container > div.wiki-container-responsive.with-overflow > section > main > div:nth-child(4) > div > div > div.masonry-content > div > ul > li > a";
    var LOAD_selector =
      "body > div.wiki-container > div.wiki-container-responsive.with-overflow > section > main > div:nth-child(4) > div > div > div.masonry-load-more-button-wrapper > a";
    // console.log(picture_selector)
    var finish_load = false;
    while (finish_load == false) {
      finish_load = await page.evaluate(
        ({ count, picture_selector, LOAD_selector }) => {
          try {
            if (
              (document.querySelector(LOAD_selector).offsetParent === null) ==
              false
            ) {
              document.querySelector(LOAD_selector).click();
            }
            console.log(document.querySelectorAll(picture_selector).length)
            return (
              document.querySelector(LOAD_selector).offsetParent === null ||
              document.querySelectorAll(picture_selector).length == count
            );
          } catch (error) {}
        },
        { count, picture_selector, LOAD_selector }
      );
    }

    var list = await page.evaluate((picture_selector) => {
      try {
        var d = [];
        document.querySelectorAll(
          "body > div.wiki-container > div.wiki-container-responsive.with-overflow > section > main > div:nth-child(4) > div > div > div.masonry-content > div > ul > li > div > a:nth-child(3)"
        );
        document
          .querySelectorAll(picture_selector)
          .forEach((e) => d.push(e.href));
        console.log(document.querySelectorAll(picture_selector).length);
        return d;
      } catch (error) {}
    }, picture_selector);
    console.log(list);
    data[name] = list;
    // break;
  }
  let obj = JSON.stringify(data, null, "\t");
  fs.writeFile("paintingbymedia1.json", obj, function (err, data) {
    console.log(err);
    console.log(data);
  });
  //   await browser.close();
})();



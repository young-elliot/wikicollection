const puppeteer = require("puppeteer");
const fs = require("fs");

let painting = JSON.parse(fs.readFileSync("paintingbystyle.json"));

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  var data = {};
  var ee = 0;
  for (var i in painting) {
    for (var url of painting[i]) {
      ee += 1;
      console.log(ee);
      var name = url.split("/").slice(-1)[0];

      var picture_selector =
        "body > div.wiki-container > div.wiki-container-responsive > section.wiki-layout-left-menu > main > div.wiki-layout-artist-info.wiki-layout-artwork-info > aside > div.wiki-layout-artist-image-wrapper.btn-overlay-wrapper-artwork.ng-scope > img";
      var description_selector =
        "body > div.wiki-container > div.wiki-container-responsive > section.wiki-layout-left-menu > main > div.wiki-layout-artist-info.wiki-layout-artwork-info > article";
      var copyright_selector =
        "body > div.wiki-container > div.wiki-container-responsive > section.wiki-layout-left-menu > main > div.wiki-layout-artist-info.wiki-layout-artwork-info > aside > div.wiki-layout-painting-info-bottom > div.text-info > div.copyright-wrapper";
      try {
        await page.goto(url, {
          waitUntil: "load", // Remove the timeout
          timeout: 0,
        });
      } catch (error) {
        console.log(error);
      }
      try {
        var copyright = await page.evaluate((copyright_selector) => {
          try {
            return document.querySelector(copyright_selector).innerText;
          } catch (error) {
            console.log(error);
          }
        }, copyright_selector);
      } catch (error) {
        console.log(error);
      }

try {
  var picture = await page.evaluate((picture_selector) => {
    try {
      return document.querySelector(picture_selector).src;
    } catch (error) {
      console.log(error);
    }
  }, picture_selector);
} catch (error) {
  console.log(error);
}

try {
  var description = await page.evaluate((description_selector) => {
    try {
      return document.querySelector(description_selector).innerText;
    } catch (error) {
      console.log(error);
    }
  }, description_selector);
} catch (error) {
  console.log(error);
}

      try {
        data[name] = {
          description: description,
          copyright: copyright,
          img_url: picture,
          wikiart_url: url,
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
  try {
    let obj = JSON.stringify(data, null, "\t");
    fs.writeFile("data.json", obj, function (err, data) {
      console.log(err);
      console.log(data);
    });
  } catch (error) {
    console.log(error);
  }

  //   await browser.close();
})();

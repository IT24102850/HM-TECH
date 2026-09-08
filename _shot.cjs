const puppeteer = require("puppeteer-core");
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

(async () => {
  const [url, out, sel, w, h] = process.argv.slice(2);
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--disable-gpu", "--hide-scrollbars", "--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: Number(w) || 1440, height: Number(h) || 1200 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });

  // Wait out the intro overlay, then settle scroll-reveal wrappers so the
  // capture shows final layout rather than a mid-animation frame.
  await new Promise((r) => setTimeout(r, 4000));
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        y += 500;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 80);
        else setTimeout(res, 600);
      };
      step();
    });
  });

  const m = sel && sel.match(/^(.*)@([0-9]+)$/);
  const el = m ? (await page.$$(m[1]))[Number(m[2])] : sel ? await page.$(sel) : null;
  if (el) {
    await el.scrollIntoView();
    await new Promise((r) => setTimeout(r, 900));
    console.log("box:", JSON.stringify(await el.boundingBox()));
    await el.screenshot({ path: out });
  } else {
    await page.screenshot({ path: out });
  }
  console.log("shot ->", out);
  await browser.close();
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});

import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = process.env.LYNX_TEST_ORIGIN ?? "https://lynxracingspainteam.com";
const browser = await chromium.launch();

try {
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await mobile.goto(origin, { waitUntil: "domcontentloaded" });
  const menu = mobile.getByRole("button", { name: "Abrir menú" });
  await menu.tap();
  const mediaLink = mobile.locator("#mobile-menu").getByRole("link", { name: "Multimedia" });
  await mediaLink.waitFor();
  await mobile.getByRole("button", { name: "Cerrar menú" }).tap();
  await mediaLink.waitFor({ state: "hidden" });
  await menu.tap();
  await mediaLink.tap();
  await mobile.waitForURL("**/multimedia");
  await mobile.locator('main button[aria-haspopup="dialog"]').first().tap();
  await mobile.getByRole("dialog").waitFor();
  await mobile.getByRole("button", { name: "Cerrar visor" }).tap();
  await mobile.getByRole("dialog").waitFor({ state: "hidden" });
  console.log("Móvil: menú y visor de Multimedia funcionan.");

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(origin, { waitUntil: "domcontentloaded" });
  const carousel = desktop.locator(".sponsor-carousel");
  const sponsorLinks = carousel.getByRole("link");
  await sponsorLinks.first().waitFor();
  const count = await sponsorLinks.count();
  await sponsorLinks.first().focus();
  assert.equal(await carousel.locator(".sponsor-carousel-track").evaluate((el) => getComputedStyle(el).animationName), "none");
  for (let index = 0; index < count; index++) {
    assert.ok(await sponsorLinks.nth(index).evaluate((el) => el === document.activeElement), `Foco incorrecto en sponsor ${index + 1}`);
    await desktop.keyboard.press("Tab");
  }
  assert.ok(await carousel.evaluate((el) => !el.contains(document.activeElement)), "Tab debe salir tras el último sponsor");

  await desktop.getByRole("navigation").getByRole("link", { name: "Multimedia" }).press("Enter");
  const thumbnail = desktop.locator('main button[aria-haspopup="dialog"]').first();
  await thumbnail.press("Enter");
  await desktop.getByRole("dialog").waitFor();
  await desktop.keyboard.press("Escape");
  await desktop.getByRole("dialog").waitFor({ state: "hidden" });
  assert.ok(await thumbnail.evaluate((el) => el === document.activeElement), "Escape debe devolver el foco a la miniatura");
  console.log("Escritorio: Tab recorre los sponsors una vez y Escape devuelve el foco a la foto.");
} finally {
  await browser.close();
}

const path = require("path");
const pptxgen = require("pptxgenjs");

const root = path.resolve(__dirname, "..");
const outDir = path.resolve(root, "slides-output");
const shotsDir = path.resolve(root, "prototype-screenshots");
const output = path.resolve(outDir, "iamlo-prototype-screenshots.pptx");

const pptx = new pptxgen();

pptx.layout = "LAYOUT_WIDE";
pptx.author = "Codex";
pptx.company = "Business Alive";
pptx.subject = "iAMLO prototype screenshots";
pptx.title = "iAMLO Prototype Screenshots";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};
pptx.defineLayout({name: "LAYOUT_WIDE", width: 13.333, height: 7.5});

const W = 13.333;
const H = 7.5;
const colors = {
  blue: "0B2F6B",
  red: "D71920",
  ice: "EEF4FF",
  white: "FFFFFF",
  ink: "111827",
  muted: "64748B",
  dark: "080D18",
  line: "DDE5F2",
};

function addFlagStripe(slide, y = 0) {
  slide.addShape(pptx.ShapeType.rect, {x: 0, y, w: W, h: 0.08, fill: {color: colors.red}, line: {color: colors.red}});
  slide.addShape(pptx.ShapeType.rect, {x: 0, y: y + 0.08, w: W, h: 0.08, fill: {color: colors.white}, line: {color: colors.white}});
  slide.addShape(pptx.ShapeType.rect, {x: 0, y: y + 0.16, w: W, h: 0.12, fill: {color: colors.blue}, line: {color: colors.blue}});
  slide.addShape(pptx.ShapeType.rect, {x: 0, y: y + 0.28, w: W, h: 0.08, fill: {color: colors.white}, line: {color: colors.white}});
  slide.addShape(pptx.ShapeType.rect, {x: 0, y: y + 0.36, w: W, h: 0.08, fill: {color: colors.red}, line: {color: colors.red}});
}

function addTitle(slide, title, subtitle, opts = {}) {
  const color = opts.color ?? colors.ink;
  const subColor = opts.subColor ?? colors.muted;

  slide.addText(title, {
    x: 0.55,
    y: 0.48,
    w: 8.2,
    h: 0.42,
    margin: 0,
    fontFace: "Aptos Display",
    fontSize: 23,
    bold: true,
    color,
    breakLine: false,
    fit: "shrink",
  });
  slide.addText(subtitle, {
    x: 0.57,
    y: 0.95,
    w: 9.8,
    h: 0.28,
    margin: 0,
    fontSize: 9,
    color: subColor,
    fit: "shrink",
  });
}

function addModeBadge(slide, label, options = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 11.25,
    y: 0.5,
    w: 1.55,
    h: 0.4,
    rectRadius: 0.08,
    fill: {color: options.fill ?? colors.blue},
    line: {color: options.line ?? options.fill ?? colors.blue, transparency: 100},
  });
  slide.addText(label, {
    x: 11.25,
    y: 0.58,
    w: 1.55,
    h: 0.16,
    margin: 0,
    align: "center",
    fontSize: 8,
    bold: true,
    color: options.color ?? colors.white,
    fit: "shrink",
  });
}

function addShot(slide, file, label, x, y, w, h, options = {}) {
  const lineColor = options.lineColor ?? colors.line;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x - 0.04,
    y: y - 0.04,
    w: w + 0.08,
    h: h + 0.08,
    rectRadius: 0.08,
    fill: {color: options.frame ?? colors.white},
    line: {color: lineColor, width: 0.8},
    shadow: {type: "outer", color: "000000", opacity: 0.12, blur: 2, angle: 45, offset: 1},
  });
  slide.addImage({
    path: path.resolve(shotsDir, file),
    x,
    y,
    w,
    h,
    sizing: {type: "contain", x, y, w, h},
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y: y + h + 0.1,
    w: Math.min(w, 2.6),
    h: 0.3,
    rectRadius: 0.07,
    fill: {color: options.labelFill ?? colors.blue},
    line: {color: options.labelFill ?? colors.blue, transparency: 100},
  });
  slide.addText(label, {
    x: x + 0.1,
    y: y + h + 0.185,
    w: Math.min(w, 2.4),
    h: 0.12,
    margin: 0,
    fontSize: 6.8,
    bold: true,
    color: options.labelColor ?? colors.white,
    fit: "shrink",
  });
}

function addCover() {
  const slide = pptx.addSlide();
  slide.background = {color: colors.blue};
  addFlagStripe(slide, 0);
  slide.addText("iAMLO Prototype", {
    x: 0.7,
    y: 0.85,
    w: 7.6,
    h: 0.65,
    margin: 0,
    fontFace: "Aptos Display",
    fontSize: 32,
    bold: true,
    color: colors.white,
    fit: "shrink",
  });
  slide.addText("Clickable front-end prototype screenshots", {
    x: 0.73,
    y: 1.58,
    w: 6.3,
    h: 0.26,
    margin: 0,
    fontSize: 12,
    color: "DCE8FF",
    fit: "shrink",
  });
  slide.addText("Light / Dark / Gray accessibility views with English mock content", {
    x: 0.73,
    y: 2.08,
    w: 6.2,
    h: 0.35,
    margin: 0,
    fontSize: 12,
    color: colors.white,
    fit: "shrink",
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.73,
    y: 2.85,
    w: 2.05,
    h: 0.45,
    rectRadius: 0.08,
    fill: {color: colors.white},
    line: {color: colors.white},
  });
  slide.addText("Prototype only", {
    x: 0.95,
    y: 2.98,
    w: 1.6,
    h: 0.15,
    margin: 0,
    fontSize: 8.8,
    bold: true,
    color: colors.blue,
    fit: "shrink",
  });
  addShot(slide, "light-hero-search.png", "Live prototype capture", 6.55, 0.9, 5.95, 3.96, {
    frame: "153A78",
    lineColor: "476797",
    labelFill: colors.red,
  });
  slide.addText("Screens captured from the local Next.js prototype route /prototype.", {
    x: 6.58,
    y: 5.32,
    w: 5.5,
    h: 0.28,
    margin: 0,
    fontSize: 9,
    color: "DCE8FF",
    fit: "shrink",
  });
}

function addModeSlide({mode, title, subtitle, files, badge, bg = colors.white, text = colors.ink, muted = colors.muted, frame = colors.white, label = colors.blue}) {
  const slide = pptx.addSlide();
  slide.background = {color: bg};
  addFlagStripe(slide, 0);
  addTitle(slide, title, subtitle, {color: text, subColor: muted});
  addModeBadge(slide, badge, {fill: label});
  addShot(slide, files[0], "Hero + Smart Search", 0.62, 1.55, 7.1, 4.73, {frame, labelFill: label});
  addShot(slide, files[1], "Services + API Dashboard", 8.15, 1.55, 4.55, 2.45, {frame, labelFill: colors.red});
  addShot(slide, files[2], "CMS + Notifications", 8.15, 4.6, 4.55, 2.45, {frame, labelFill: label});
  slide.addText(`Mode: ${mode} · EN mock content enabled · Officer workbench unlocked`, {
    x: 0.62,
    y: 6.72,
    w: 7.5,
    h: 0.22,
    margin: 0,
    fontSize: 8,
    color: muted,
    fit: "shrink",
  });
}

function addSingleShotSlide({file, mode, title, subtitle, bg = colors.white, text = colors.ink, muted = colors.muted, label = colors.blue, frame = colors.white}) {
  const slide = pptx.addSlide();
  slide.background = {color: bg};
  addFlagStripe(slide, 0);
  addTitle(slide, title, subtitle, {color: text, subColor: muted});
  addModeBadge(slide, mode.toUpperCase(), {fill: label});
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.12,
    y: 1.35,
    w: 11.1,
    h: 5.74,
    rectRadius: 0.08,
    fill: {color: frame},
    line: {color: bg === colors.dark ? "6E7890" : colors.line, width: 0.9},
    shadow: {type: "outer", color: "000000", opacity: 0.13, blur: 2, angle: 45, offset: 1},
  });
  slide.addImage({
    path: path.resolve(shotsDir, file),
    x: 1.18,
    y: 1.41,
    w: 10.98,
    h: 5.62,
    sizing: {type: "contain", x: 1.18, y: 1.41, w: 10.98, h: 5.62},
  });
}

addCover();
addModeSlide({
  badge: "LIGHT",
  files: ["light-hero-search.png", "light-services-api.png", "light-cms-notifications.png"],
  mode: "Light",
  subtitle: "Default presentation view for public services, search, API dashboard, and officer CMS.",
  title: "Prototype Screens - Light Mode",
});
addModeSlide({
  badge: "DARK",
  bg: colors.dark,
  files: ["dark-hero-search.png", "dark-services-api.png", "dark-cms-notifications.png"],
  frame: "111827",
  label: colors.red,
  mode: "Dark",
  muted: "A8B5CB",
  subtitle: "Dark theme view for the same clickable prototype screens and localStorage-backed state.",
  text: colors.white,
  title: "Prototype Screens - Dark Mode",
});
addModeSlide({
  badge: "GRAY",
  files: ["gray-hero-search.png", "gray-services-api.png", "gray-cms-notifications.png"],
  label: "555555",
  mode: "Gray",
  muted: "555555",
  subtitle: "Grayscale accessibility view showing the prototype with reduced color dependency.",
  title: "Prototype Screens - Gray Mode",
});

const singleSlides = [
  {
    file: "light-hero-search.png",
    mode: "Light",
    subtitle: "Single-screen capture: hero, controls, smart search, personalization, and registration.",
    title: "Light Mode - Hero + Smart Search",
  },
  {
    file: "light-services-api.png",
    mode: "Light",
    subtitle: "Single-screen capture: service cards, request form, auction cards, calendar, and logs.",
    title: "Light Mode - Services + API Dashboard",
  },
  {
    file: "light-cms-notifications.png",
    mode: "Light",
    subtitle: "Single-screen capture: officer CMS, widget order, banner analytics, and notifications.",
    title: "Light Mode - CMS + Notifications",
  },
  {
    bg: colors.dark,
    file: "dark-hero-search.png",
    frame: "111827",
    label: colors.red,
    mode: "Dark",
    muted: "A8B5CB",
    subtitle: "Single-screen capture: hero, controls, smart search, personalization, and registration.",
    text: colors.white,
    title: "Dark Mode - Hero + Smart Search",
  },
  {
    bg: colors.dark,
    file: "dark-services-api.png",
    frame: "111827",
    label: colors.red,
    mode: "Dark",
    muted: "A8B5CB",
    subtitle: "Single-screen capture: service cards, request form, auction cards, calendar, and logs.",
    text: colors.white,
    title: "Dark Mode - Services + API Dashboard",
  },
  {
    bg: colors.dark,
    file: "dark-cms-notifications.png",
    frame: "111827",
    label: colors.red,
    mode: "Dark",
    muted: "A8B5CB",
    subtitle: "Single-screen capture: officer CMS, widget order, banner analytics, and notifications.",
    text: colors.white,
    title: "Dark Mode - CMS + Notifications",
  },
  {
    file: "gray-hero-search.png",
    label: "555555",
    mode: "Gray",
    muted: "555555",
    subtitle: "Single-screen capture: hero, controls, smart search, personalization, and registration.",
    title: "Gray Mode - Hero + Smart Search",
  },
  {
    file: "gray-services-api.png",
    label: "555555",
    mode: "Gray",
    muted: "555555",
    subtitle: "Single-screen capture: service cards, request form, auction cards, calendar, and logs.",
    title: "Gray Mode - Services + API Dashboard",
  },
  {
    file: "gray-cms-notifications.png",
    label: "555555",
    mode: "Gray",
    muted: "555555",
    subtitle: "Single-screen capture: officer CMS, widget order, banner analytics, and notifications.",
    title: "Gray Mode - CMS + Notifications",
  },
];

singleSlides.forEach(addSingleShotSlide);

pptx.writeFile({fileName: output});

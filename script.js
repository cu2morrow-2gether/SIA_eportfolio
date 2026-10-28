// Link the QR code points to. Set your real URL once deployed, e.g. "https://username.github.io/portfolio/"
const SITE_URL = "";
const url = SITE_URL || location.href.split("#")[0];

// QR + card download (skipped if the libraries fail to load)
if (window.QRCode) {
  new QRCode(document.getElementById("qr"), {
    text: url, width: 208, height: 208,
    colorDark: "#0b1020", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M
  });
}
document.getElementById("dl").addEventListener("click", async () => {
  const canvas = await html2canvas(document.getElementById("card"), { backgroundColor: "#0b1020", scale: 3 });
  const a = document.createElement("a");
  a.download = "Moralde Business Card.png";
  a.href = canvas.toDataURL("image/png");
  a.click();
});

// Highlight the nav link for the section in view
const links = [...document.querySelectorAll("nav a")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
["home", "about", "contact"].forEach(id => spy.observe(document.getElementById(id)));

// Pixel-art decoration for the About section
const rows = [
  "#..........#",
  "##........##",
  "############",
  "##e######e##",
  "############",
  "############",
  ".##########.",
  "..########.."
];
const c = 14, ox = 16, oy = 20, ns = "http://www.w3.org/2000/svg";
const svg = document.getElementById("pixel");
rows.forEach((r, y) => [...r].forEach((ch, x) => {
  if (ch === ".") return;
  const rect = document.createElementNS(ns, "rect");
  rect.setAttribute("x", ox + x * c); rect.setAttribute("y", oy + y * c);
  rect.setAttribute("width", c); rect.setAttribute("height", c);
  rect.setAttribute("fill", ch === "e" ? "#8a2a5c" : "#ff5fa8");
  svg.appendChild(rect);
}));
const HEART = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
[[18, 10, 0.5], [190, 70, 0.4], [180, 135, 0.75]].forEach(([x, y, s]) => {
  const h = document.createElementNS(ns, "path");
  h.setAttribute("d", HEART);
  h.setAttribute("transform", `translate(${x - 12 * s} ${y - 12 * s}) scale(${s})`);
  h.setAttribute("fill", "none"); h.setAttribute("stroke", "#ff5fa8"); h.setAttribute("stroke-width", 3);
  h.setAttribute("vector-effect", "non-scaling-stroke");
  svg.appendChild(h);
});

const fs = require('fs');

let urls = [];

["mono","svs","vhc","svg","ast"].forEach(type => {
  const dir = `data/${type}`;
  if (!fs.existsSync(dir)) return;

  fs.readdirSync(dir).forEach(file => {
    const d = JSON.parse(fs.readFileSync(`${dir}/${file}`));
    urls.push(`https://astitva.gsfn.in/${type}/${d.files.slug}`);
  });
});

const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u=>`<url><loc>${u}</loc></url>`).join("")}
</urlset>`;

fs.writeFileSync("sitemap.xml", xml);

console.log("✔ Sitemap created");

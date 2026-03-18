const fs = require('fs');

let out = { publications: [] };

["mono","svs","vhc","svg","ast"].forEach(type => {
  const dir = `data/${type}`;
  if (!fs.existsSync(dir)) return;

  fs.readdirSync(dir).forEach(file => {
    const d = JSON.parse(fs.readFileSync(`${dir}/${file}`));

    out.publications.push({
      title: d.title,
      url: `/${type}/${d.files.slug}`,
      year: d.year,
      author: d.author.name
    });
  });
});

fs.mkdirSync("registry",{recursive:true});
fs.writeFileSync("registry/registry.json", JSON.stringify(out,null,2));

console.log("✔ Registry created");

const fs = require('fs');

const template = fs.readFileSync('templates/landing.html', 'utf8');

function render(t, d) {
  return t
    .replace(/{{TITLE}}/g, d.title)
    .replace(/{{AUTHOR_NAME}}/g, d.author.name)
    .replace(/{{DOI}}/g, d.doi)
    .replace(/{{AST_ID}}/g, d.id)
    .replace(/{{YEAR}}/g, d.year)
    .replace(/{{ABSTRACT}}/g, d.abstract)
    .replace(/{{PDF_URL}}/g, `/${d.type}/${d.files.slug}/${d.files.pdf}`)
    .replace(/{{PAGE_URL}}/g, `https://astitva.gsfn.in/${d.type}/${d.files.slug}`);
}

function process(type) {
  const dir = `data/${type}`;
  if (!fs.existsSync(dir)) return;

  fs.readdirSync(dir).forEach(file => {
    const d = JSON.parse(fs.readFileSync(`${dir}/${file}`));

    const folder = `${type}/${d.files.slug}`;
    fs.mkdirSync(folder, { recursive: true });

    const html = render(template, d);

    fs.writeFileSync(`${folder}/index.html`, html);
  });
}

["mono","svs","vhc","svg","ast"].forEach(process);
console.log("✔ Pages generated");

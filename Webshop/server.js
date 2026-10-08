const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});



app.get('/zoeken', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';

  const products_array = [
    // { title: "Demon Slayer vol1-23",
    //   price: 133.44,
    //   img: "demonslayer.jpg",
    //   inVooraad: true,
    //   description: "Box of DS manga volume 1 through 23"
    // }
   ["Demon Slayer Complete Manga Box Set volume 1-23", 133.69, "demonslayer.jpg", true],
  ["My Hero Academia Complete Box Set Volume 1-20", 124.34, "myheroacademia.jpg", true],
  ["Tokyo Ghoul Complete Manga Box Set Volume 1-16", 143.59, "tokyoghoul.jpg", true],
  ["Naruto Shipudden Complete Manga Box Set Volume 28-48", 134.74, "narutoanime.jpg", true],
  ["Bleach Complete Manga Box Set Volume 1-21", 89.99, "bleach.jpg", false],
  ["Dragon Ball Complete Manga Box Set Volume 1-26", 149.12, "dragonball.jpg", true],
  ["Bakuman Complete Box Set vol 1-22", 160.00, "bakuman.jpg", true],
  ["One Piece, Dressrosa to Reverie: Vol 71-90", 228.98, "opopop.webp", true],
  ["Vampire Knight Complete Box Set Vol 1-19", 157.36, "vampire.jpg", false],
  ["Death Note Box Set Vol 1-13 + L card", 80.00, "nnnn.jpg", true],
  ["Fairy Tail 2nd Box Set Vol 12-22 + 2 Posters", 82.46, "fairy.jpg", true],
  ["Yu Yu Hakusho Box Set Vol 1-12", 102.12, "yyyy.jpg", false],
  ["The Promised Neverland Box Set Vol 1-21", 97.74, "tpn.jpg", true],
  ["Black Bird Box Set Vol 1-18", 102.12, "black.jpg", false],
  ["Pandora Hearts Box Set Vol 1-12 Omnibus Edition", 178.31, "ffff.jpg", true],
  ["Naruto Shipudden Bookmarks 9pcs", 1.70, "sakura.webp", false],
  ["Demon Slayer Bookmarks 9pcs", 1.45, "tanj.jpg", false],
  ["Jujutsu Kaisen Bookmarks 9pcs", 1.50, "jjkk.jpg", true],
  ["Blue Lock jersey - Nagi Seishiro", 14.99, "nagi.webp", true],
  ["Blue Lock jersey - Yoichi Isagi", 14.99, "isagii.webp", true],
  ["Blue Lock jersey - Michael Kaiser", 15.50, "kaiser22.jpeg", false],
  ["Blue Lock figure - Nagi Seishiro", 4.79, "nagii.jpg", true],
  ["Blue Lock figure - Meguru Bachira", 4.79, "bachi.webp", true],
  ["Blue Lock figure - Rin & Sae", 9.25, "rinn.webp", true],
  ["Mystery Box mini anime figures 5pcs", 9.95, "figures.jpg", true],
  ["Anime Stickers - 50pcs Random", 3.29, "stickers.jpg", true],
  ["My Hero Academia Keychains", 8.99 , "keychain.jpg", true],
  ["Konosuba Nendroid - Aqua Goddess of Water", 49.95, "aqua.webp", true],
  ["Konosuba Nendroid - Megumin", 49.95, "megumin.jpg", true],
  ["Death Note Nendroid - L", 75.50, "L.jpg", false],
  ["Lego Katana with Scabbard & Stand - Zoro", 68.99, "zoro.jpg", false],
  ["Lego Katana with Scabbard & Stand - Yamato", 70.00, "redred.jpg", true],
  ["Lego Katana with Scabbard & Stand - Zenitsu", 58.50, "zeni.jpg", true]
  ];

  const results = products_array.filter(product =>
    product[0].toLowerCase().includes(query)
  );

  let html = `<h1>Zoekresultaten voor: ${query}</h1>`;
  if (results.length === 0) {
    html += `<p>Geen resultaten gevonden.</p>`;
  } else {
    results.forEach(p => {
      html += `<div>
        <h2>${p.title}</h2>
        <p>€${p[1].toFixed(2)}</p>
        <img src="${p[2]}" width="100">
      </div>`;
    });
  }

  res.send(html);
});


app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});



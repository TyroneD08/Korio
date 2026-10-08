const products_array = [
  ["Demon Slayer Complete Manga Box Set volume 1-23", 133.69, "img/demonslayer.jpg", true, "Follow Tanjiro's journey from its beginning with this complete manga box set, collecting volumes 1 through 23."],
  ["My Hero Academia Complete Box Set Volume 1-20", 124.34, "img/myheroacademia.jpg", true, "Join the aspiring heroes of Class 1-A with this box set collecting My Hero Academia volumes 1 through 20."],
  ["Tokyo Ghoul Complete Manga Box Set Volume 1-16", 143.59, "img/tokyoghoul.jpg", true, "Explore Ken Kaneki's world in this Tokyo Ghoul manga box set, collecting volumes 1 through 16."],
  ["Naruto Shipudden Complete Manga Box Set Volume 28-48", 134.74, "img/narutoanime.jpg", true, "Continue Naruto's adventure with this manga set collecting volumes 28 through 48."],
  ["Bleach Complete Manga Box Set Volume 1-21", 89.99, "img/bleach.jpg", false, "Start Ichigo Kurosaki's supernatural adventures with this Bleach box set of volumes 1 through 21."],
  ["Dragon Ball Complete Manga Box Set Volume 1-26", 149.12, "img/dragonball.jpg", true, "Relive Goku's early adventures with this Dragon Ball manga box set collecting volumes 1 through 26."],
  ["Bakuman Complete Box Set vol 1-22", 160.00, "img/bakuman.jpg", true, "Follow two aspiring manga creators as they work toward publication in this Bakuman box set of volumes 1 through 22."],
  ["One Piece, Dressrosa to Reverie: Vol 71-90", 228.98, "img/opopop.webp", true, "Set sail with the Straw Hat crew through the Dressrosa and Reverie stories, collecting One Piece volumes 71 through 90."],
  ["Vampire Knight Complete Box Set Vol 1-19", 157.36, "img/vampire.jpg", false, "Discover the secrets of Cross Academy with this Vampire Knight box set collecting volumes 1 through 19."],
  ["Death Note Box Set Vol 1-13 + L card", 80.00, "img/nnnn.jpg", true, "Follow the battle of wits between Light and L with all 13 Death Note volumes and a bonus L card."],
  ["Fairy Tail 2nd Box Set Vol 12-22 + 2 Posters", 82.46, "img/fairy.jpg", true, "Join the Fairy Tail guild's adventures with volumes 12 through 22 and two included posters."],
  ["Yu Yu Hakusho Box Set Vol 1-12", 102.12, "img/yyyy.jpg", false, "Follow Yusuke Urameshi's supernatural cases with this Yu Yu Hakusho box set of volumes 1 through 12."],
  ["The Promised Neverland Box Set Vol 1-21", 97.74, "img/tpn.jpg", true, "Uncover the mystery with Emma, Norman, and Ray in this box set collecting all 21 volumes of The Promised Neverland."],
  ["Black Bird Box Set Vol 1-18", 102.12, "img/black.jpg", false, "Enter the supernatural romance of Black Bird with this box set collecting volumes 1 through 18."],
  ["Pandora Hearts Box Set Vol 1-12 Omnibus Edition", 178.31, "img/ffff.jpg", true, "Explore the mysteries of Pandora Hearts in this omnibus set collecting volumes 1 through 12."],
  ["Naruto Shipudden Bookmarks 9pcs", 1.70, "img/sakura.webp", false, "Keep your place with this set of nine Naruto Shippuden-themed bookmarks."],
  ["Demon Slayer Bookmarks 9pcs", 1.45, "img/tanj.jpg", false, "Mark your favourite pages with this set of nine Demon Slayer-themed bookmarks."],
  ["Jujutsu Kaisen Bookmarks 9pcs", 1.50, "img/jjkk.jpg", true, "Add a Jujutsu Kaisen touch to your reading with this set of nine bookmarks."],
  ["Blue Lock jersey - Nagi Seishiro", 14.99, "img/nagi.webp", true, "Show your support for Nagi Seishiro with this Blue Lock character jersey."],
  ["Blue Lock jersey - Yoichi Isagi", 14.99, "img/isagii.webp", true, "Show your support for Yoichi Isagi with this Blue Lock character jersey."],
  ["Blue Lock jersey - Michael Kaiser", 15.50, "img/kaiser22.jpeg", false, "Show your support for Michael Kaiser with this Blue Lock character jersey."],
  ["Blue Lock figure - Nagi Seishiro", 4.79, "img/nagii.jpg", true, "Add Nagi Seishiro to your collection with this Blue Lock character figure."],
  ["Blue Lock figure - Meguru Bachira", 4.79, "img/bachi.webp", true, "Add Meguru Bachira to your collection with this Blue Lock character figure."],
  ["Blue Lock figure - Rin & Sae", 9.25, "img/rinn.webp", true, "Bring the Itoshi brothers to your collection with this Blue Lock Rin and Sae figure."],
  ["Mystery Box mini anime figures 5pcs", 9.95, "img/figures.jpg", true, "Discover five assorted mini anime figures in this mystery box."],
  ["Anime Stickers - 50pcs Random", 3.29, "img/stickers.jpg", true, "Decorate your notebooks and other belongings with 50 assorted anime stickers."],
  ["My Hero Academia Keychains", 8.99, "img/keychain.jpg", true, "Carry a little hero with you with these My Hero Academia-themed keychains."],
  ["Konosuba Nendroid - Aqua Goddess of Water", 49.95, "img/aqua.webp", true, "Add Aqua, the Goddess of Water, to your collection with this Konosuba Nendoroid figure."],
  ["Konosuba Nendroid - Megumin", 49.95, "img/megumin.jpg", true, "Add the explosion-loving Megumin to your collection with this Konosuba Nendoroid figure."],
  ["Death Note Nendroid - L", 75.50, "img/L.jpg", false, "Bring the mysterious detective L to your collection with this Death Note Nendoroid figure."],
  ["Lego Katana with Scabbard & Stand - Zoro", 68.99, "img/zoro.jpg", false, "Display your love of One Piece with this Zoro-inspired buildable katana, scabbard, and stand."],
  ["Lego Katana with Scabbard & Stand - Yamato", 70.00, "img/redred.jpg", true, "Build and display a Yamato-inspired katana with its matching scabbard and stand."],
  ["Lego Katana with Scabbard & Stand - Zenitsu", 58.50, "img/zeni.jpg", true, "Build and display a Zenitsu-inspired katana with its matching scabbard and stand."]
];

const CART_STORAGE_KEY = "korio-cart";

function readCart() {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (savedCart === null) return {};

  const cart = JSON.parse(savedCart);
  if (!cart || typeof cart !== "object" || Array.isArray(cart)) {
    throw new Error("Saved cart data is invalid.");
  }

  return cart;
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

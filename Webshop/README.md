# Webshop Korio

## Changing product pictures

Product names, prices, availability, image paths, and descriptions are kept
together in `products.js`. Descriptions appear when a shopper opens an item.
To use a different product picture, put the image in the `img` folder and
update that product's image path in `products.js`, for example:

```js
["Example product", 12.50, "img/example-product.jpg", true]
```

The shop logo is set in `shop.html`. The landing page is `index.html`; its
featured image (`img/power.png`) can be changed there. Keep image paths
relative to the `Webshop` folder.

Open `index.html` for the landing page or `shop.html` to go directly to the
product catalogue.

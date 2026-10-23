import sharp from "sharp";

const src = "public/images/profile-circle.jpg";

async function circle(size, file) {
  const photo = await sharp(src)
    .resize(size, size, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  );
  await sharp(photo).composite([{ input: mask, blend: "dest-in" }]).png().toFile(file);
}

await circle(512, "public/favicon.png");
await sharp(src)
  .resize(180, 180, { fit: "cover", position: "centre" })
  .png()
  .toFile("public/apple-touch-icon.png");

console.log("icons written");

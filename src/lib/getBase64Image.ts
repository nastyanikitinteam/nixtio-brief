import path from "path";
import fs from "fs";

export function getBase64Image(image: string) {
  const imagePath = path.join(process.cwd(), "public", image);

  try {
    const imageBuffer = fs.readFileSync(imagePath);
    return `data:image/png;base64,${imageBuffer.toString("base64")}`;
  } catch (error) {
    console.error("Error reading image file:", error);
    return "";
  }
}

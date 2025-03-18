import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const imageResponse = await fetch(url);
    if (!imageResponse.ok) {
      throw new Error("Failed to fetch image");
    }
    const imageBuffer = await imageResponse.buffer();
    res.setHeader("Content-Type", imageResponse.headers.get("content-type"));
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).send("Error fetching image");
  }
}

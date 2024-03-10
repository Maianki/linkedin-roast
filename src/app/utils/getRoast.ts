import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_SECRET,
  dangerouslyAllowBrowser: true,
});

export async function getRoast(image: string, name: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: image, name: name }),
  };

  try {
    const res = await fetch("/api/roast", requestOptions);
    const roast = await res.json();

    if (roast.status == 200) {
      return getAudioRoast(roast.message.join(""));
    } else {
      throw new Error("Trouble creating roast!");
    }
  } catch (error) {
    throw new Error("Trouble creating roast!");
  }
}

export async function getAudioRoast(roast: string) {
  console.log(roast);
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input: roast,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());

  return buffer;
}
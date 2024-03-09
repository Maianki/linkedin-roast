import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_SECRET,
  dangerouslyAllowBrowser: true,
});

export async function getRoast(image: string, name: string): Promise<string> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: image, name: name }),
  };

  try {
    const res = await fetch("/api/roast", requestOptions);
    const roast = await res.json();

    if (roast.status == 200) {
      getAudioRoast(roast.message.join(" "));
      return roast.message.join(" ");
    } else {
      return "error";
    }
  } catch (error) {
    throw "error";
  }
}

export async function getAudioRoast(roast: string) {
  console.log("hello");
}

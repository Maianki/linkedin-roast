import { NextResponse } from "next/server";
import Replicate from "replicate";
import generatePrompt from "@/app/utils/generatePrompt";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    let prompt: string | string[] = "";

    const image = userData?.image;
    const name = userData?.name;
    const title = userData?.title ?? "";

    //Here you can call a text to text model which will give the roast if user don't have image and has entered his bio
    if (image == undefined && name == undefined) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    if (!image) {
      const output = generatePrompt(name);

      return NextResponse.json({
        message: output,
        status: 200,
      });
    }

    console.log(prompt);
    prompt = generatePrompt(name, image, title);

    console.log(prompt);

    const output = await replicate.run(
      "yorickvp/llava-13b:a0fdc44e4f2e1f20f2bb4e27846899953ac8e66c5886c5878fa1d6b73ce009e5",
      {
        input: {
          image: image,
          top_p: 1,
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.2,
        },
      }
    );

    return NextResponse.json({ message: output, status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

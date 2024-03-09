import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  try {
    const userData = await request.json();

    console.log("user data is :", userData);

    const image = userData?.image;
    const name = userData?.name;

    if (image == undefined || name == undefined) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const output = await replicate.run(
      "yorickvp/llava-13b:a0fdc44e4f2e1f20f2bb4e27846899953ac8e66c5886c5878fa1d6b73ce009e5",
      {
        input: {
          image: image,
          top_p: 1,
          prompt: `You are a comedian. This is a linkedIn profile picture (A social network for connecting with your work colleagues) of a some user make a roast of this user profile be super sarcastic and funny. Roast him his name is ${name}. If the image does not appear to depict a person, please respond with a sarcastic remark regarding the inappropriate choice of image." `,
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

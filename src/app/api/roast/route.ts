import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  try {
    const userData = await request.json();

    console.log("user data is :", userData);

    let prompt = "";

    const image = userData?.image;
    const name = userData?.name;
    const title = userData?.title ?? "";

    if (image == undefined && name == undefined) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    if (!image) {
      const output =
        `Well, well, well, look who we have here ${name} - the mysterious shadow lurking in the depths of LinkedIn! Your profile picture speaks volumes... about your absence. It's like trying to find Bigfoot in a dense forest - elusive and shrouded in mystery. Is this a strategic move to keep your identity hidden from headhunters, or are you just auditioning for the role of 'The Invisible Man'? Let's be honest, your profile is about as complete as a puzzle missing its most crucial piece - you! Maybe you're saving your face reveal for a grand finale, but until then, let's just call you 'The Phantom of LinkedIn' - lurking in the shadows, leaving us all wondering: Who. Are. You? Or maybe try using the textbox to tell us little about yourself next time.`.split(
          " "
        );
      return NextResponse.json({
        message: output,
        status: 200,
      });
    }

    if (title.length > 0) {
      prompt = `You are a comedian. This is a linkedIn profile picture (A social network for connecting with your work colleagues) of a some user make a roast of this user profile and bio, be super sarcastic and funny. Roast him his name is ${name} and and his bio on linkedIn is ${title}. If the image does not appear to depict a person, please respond with a sarcastic remark regarding the inappropriate choice of image." `;
    } else {
      prompt = `You are a comedian. This is a linkedIn profile picture (A social network for connecting with your work colleagues) of a some user make a roast of this user profile be super sarcastic and funny. Roast him his name is ${name}. If the image does not appear to depict a person, please respond with a sarcastic remark regarding the inappropriate choice of image." `;
    }

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

    console.log(output);
    return NextResponse.json({ message: output, status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

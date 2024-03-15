function generatePrompt(
  name: string,
  image?: string,
  title?: string
): string | string[] {
  let prompt: string | string[] =
    `Well, well, well, look who we have here ${name} - the mysterious shadow lurking in the depths of LinkedIn! Your profile picture speaks volumes... about your absence. It's like trying to find Bigfoot in a dense forest - elusive and shrouded in mystery. Is this a strategic move to keep your identity hidden from headhunters, or are you just auditioning for the role of 'The Invisible Man'? Let's be honest, your profile is about as complete as a puzzle missing its most crucial piece - you! Maybe you're saving your face reveal for a grand finale, but until then, let's just call you 'The Phantom of LinkedIn' - lurking in the shadows, leaving us all wondering: Who. Are. You? Or maybe try using the textbox to tell us little about yourself next time.`.split(
      " "
    );

  if (title != "undefined" && title!.length > 0) {
    prompt = `You are a comedian. This is a linkedIn profile picture (A social network for connecting with your work colleagues) of a some user make a roast of this user profile and bio, be super sarcastic and funny. Roast him his name is ${name} and and his bio on linkedIn is ${title}. If the image does not appear to depict a person, please respond with a sarcastic remark regarding the inappropriate choice of image." `;
  } else {
    prompt = `You are a comedian. This is a linkedIn profile picture (A social network for connecting with your work colleagues) of a some user make a roast of this user profile be super sarcastic and funny. Roast him his name is ${name}. If the image does not appear to depict a person, please respond with a sarcastic remark regarding the inappropriate choice of image." `;
  }

  return prompt;
}

export default generatePrompt;

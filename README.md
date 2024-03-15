# LinkedIn Roast Generator

This project is a LinkedIn roast generator built on Next.js, Supabase, and utilizing **OpenAI TTS (Text-to-Speech) API** [Learn more](https://platform.openai.com/docs/guides/text-to-speech) and **LLaVA Model** [Learn more](https://llava-vl.github.io/). The roast generator takes a user's LinkedIn profile information and generates humorous and lighthearted roasts based on their profile.

## Features

- **LinkedIn Profile Integration:** Connect your LinkedIn profile to the roast generator to fetch your linkedin profile.
  
- **Roast Generation:** Utilize OpenAI's OpenAI TTS (Text-to-Speech) and LLaVA Model to generate witty and humorous roasts tailored to the user's LinkedIn profile.

- **Personalization:** Customize the roasts based on the user's specific details (optional).

- **Interactive User Interface:** Enjoy a sleek and user-friendly interface built with Next.js for seamless navigation and interaction.

## Getting Started

1. **Clone the Repository:**
   ```bash 
   git clone https://github.com/Maianki/linkedin-roast.git 
   ```
2. **Install dependencies:**
   ```
   cd linkedin-roast
   npm install
3. **Set Up Supabase and add your openai secret and replicate secret:**

- Sign up for a Supabase account and create a new project.
- Set up authentication and database services in your Supabase project.
- Update the .env.local file with your Supabase, openai and replicate credentials.

4. **Run the project:**
   ```
   npm install

# License
This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

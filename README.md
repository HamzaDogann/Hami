

![hami](https://github.com/HamzaDogann/Hami/assets/93007915/ec38558b-ac11-4ba4-ab44-d02fb1ff3156)


---------

![Introduction](https://github.com/HamzaDogann/Hami/assets/93007915/1b313385-5711-4897-be5f-04d56d48eb51)

 Hami, is a web application developed by Hamza Doğan, capable of generating images and text using artificial intelligence models. You can favorite the results you like and view them later. With its modern and user-friendly interface, it provides you with a great experience.

 
 Users log in by choosing an avatar and a name, and then they encounter a menu. They can choose between the Text or Image generator menus. On the Text Generator page, they make a prompt (about coding, articles, poems, anecdotes, artistic content, inspiring ideas, and many other topics). They can copy the liked results or add them to favorites. Later, they can view their added favorites and delete them if they wish. On the Image generator page, users can create an image by selecting their prompts, image quality, and image style. They can download the created image or add it to favorites. They can view, search, and remove the images they added to the Favorite images page.



![HamiAIDevicesBanner](https://github.com/HamzaDogann/Hami/assets/93007915/e42ba4e2-b0c1-466c-9ebc-7cb1773dd11e)

-----------------------

![techo](https://github.com/HamzaDogann/Hami/assets/93007915/4a50da05-c3ec-4445-98ee-a60058100110)

### ⚒️ Project Software and Design Tools

- Vite & React
- Tailwind CSS

### 🔧 Dependencies in the project
- @huggingface/inference: ^4.13.30,
- react: ^18.2.0,
- react-dom: ^18.2.0,
- react-icons: ^5.0.1,
- react-markdown: ^9.0.1,
- react-router-dom: ^6.22.3,
- react-syntax-highlighter: ^15.5.0

  
### 🤖 AI setup (Hugging Face)

Text and images are generated through [Hugging Face Inference Providers](https://huggingface.co/docs/inference-providers). Requests go through two Netlify Functions (`netlify/functions/chat.mjs`, `image.mjs`), so the token is never exposed to the browser.

- Text: `openai/gpt-oss-120b` (fallbacks `openai/gpt-oss-20b`, `google/gemma-4-31B-it`)
- Images: `black-forest-labs/FLUX.1-schnell` (fallbacks: fal-ai FLUX.1-schnell, `Tongyi-MAI/Z-Image-Turbo`)

1. Create a fine-grained token with **"Make calls to Inference Providers"** at https://huggingface.co/settings/tokens/new?tokenType=fineGrained
2. Local: copy `.env.example` to `.env` and set `HF_TOKEN`, then `npm run dev`. Check everything with `npm run check:ai`.
3. Netlify: Site settings → Environment variables → add `HF_TOKEN`.

### 🗂️ Project structure

```
netlify/functions/   chat.mjs, image.mjs  -> Hugging Face calls (token stays server-side)
src/config/          browser clients for the two functions + AIError
src/providers/       one context per concern: language, theme, user, alerts, confirm popup,
                     favorite chats, favorite images, AI chat, AI image generation
src/i18n/            all UI text (en / tr) - add new text here, use t("key") in components
src/utils/           localStorage access, markdown -> plain text, image download helpers
src/hooks/           small reusable hooks
src/components/      shared UI (page layouts, confirm popup, markdown renderer, route guard)
src/pages/           one folder per page
```

### ✅ Commands

- `npm run dev` - start locally (functions included)
- `npm run lint` - ESLint, must report 0 problems
- `npm test` - unit tests + full-app smoke tests (AI calls are mocked)
- `npm run check:ai` - real call to Hugging Face with your `HF_TOKEN`

### 🔹 React Hooks used in the project
- useState
- useEffect
- useCallback
- useMemo
- useRef
- useContext

### 🔹React Router used in the project.
- Routes
- Route
- Navigate
- Link


#### ✖️ There is no database connection in this project.
#### ✅ Data is kept on Local Storage.
-------------------

![ProjectProcess](https://github.com/HamzaDogann/Hami/assets/93007915/e226e17d-e93a-4736-a5e5-02d54f97c975)

## 1 - Resources and Research

During the project process, the identification of resources and tools to be used was prioritized. The process of identifying needs and resources took about 1 week.

## 2 - Project Features

The features to be added to the project were researched by evaluating competitor applications and exploring the use of tools.

## 3 - Project Storyboard and Prototyping

Storyboarding was conducted to have an idea of how the project would look and what designs would be made.

![Storyboards](https://github.com/HamzaDogann/Hami/assets/93007915/59149d19-076a-4627-a6e6-d2cdabc61b81)


## 4 - Project Initiation

After conducting project needs assessments, resource research, evaluation of competitor applications, and storyboard work, the project was initiated on March 5, 2024.

## 5 - Utilization of Resources and Tools

Development of the application continued using the identified resources and tools. Additional work was done to address deficiencies, errors, and bugs.

## 6 - Application Testing Process

Each scenario was carefully checked by the developer and efforts were made to eliminate all bugs and errors as much as possible.

## 7 - Implementation of the Project

The project was largely completed and presented to users on April 23, 2024.

## 8 - User Experience and Issue Resolution

The project continues to be improved based on user feedback and requests received daily, with efforts ongoing to resolve issues and improve user experience.

![ProjectInformation](https://github.com/HamzaDogann/Hami/assets/93007915/0a0388f6-3ff0-4e9a-bb20-8cbd8575a8a2)


- Publication Date: 23.04.2024
- Last Update: 6.06.2024 🕟 13:30
- Version: 1.0

-------------------
Website : https://hami-ai.netlify.app/


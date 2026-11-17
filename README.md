# A little letter

A mobile-first birthday page for one person. She opens an envelope, the candles wait for a wish, and a small record player sits at the bottom of the screen.

All of the personal writing lives in [`src/config.ts`](src/config.ts). Names, dates, wishes, reasons, the timeline, the letter, and the songs are edited there.

## Edit the words

Open `src/config.ts` and change the placeholders at the top:

| Field | What it is |
| --- | --- |
| `herName` | The name in the headline. Placeholder: `My Love`. |
| `herNickname` | The pet name on the envelope and in the letter. Placeholder: `Meri Jaan`. |
| `hisName` | The signature. Placeholder: `Yours`. |
| `relationshipStart` | When you two started, as an ISO date with `+05:30`. Placeholder `2020-11-21` so the counter reaches 6 years on 21 November 2026. |
| `birthday` | Midnight at the start of her birthday, India time. Placeholder `2026-11-21T00:00:00+05:30`. |
| `togetherHeadline` | The heading above the live counter. |
| `wishes`, `reasons`, `milestones`, `letter`, `songs` | The notes, scratch cards, timeline, closing letter, and playlist. |

The countdown and the years-together counter both use **Asia/Kolkata**, even if her phone is set to another timezone.

While you are editing, add `?open=1` to the address to skip the envelope:

```text
http://127.0.0.1:4179/?open=1
```

## Add photos

1. Put image files in [`public/photos/`](public/photos/) — jpg, png, or webp.
2. In the matching milestone inside `src/config.ts`, set `photo` to the file name:

```ts
{ year: "2020", title: "Where we began", text: "...", photo: "2020.jpg" }
```

Leave `photo` as `null` and the page draws a small illustration instead. If the file is missing or fails to load, that same illustration shows, so a typo never leaves a broken image.

## Songs

The player does **not** include any audio files. Each song is a YouTube video id (the part after `watch?v=`). The ids shipped here were checked against official label uploads: T-Series, Sony Music India, and Saregama.

Playback needs a network connection. The envelope tap is what unlocks sound. If a video is blocked in her region, replace that `videoId`.

## Run it locally

```bash
npm install
npm run dev
```

The dev server is [http://127.0.0.1:4179](http://127.0.0.1:4179).

```bash
npm run build
npm run preview
```

`npm run build` writes a static site to `dist/`.

## Deploy it for free

The site is a static Vite build. No server, no database, no API key.

### Vercel

1. Push the project to GitHub.
2. In [Vercel](https://vercel.com), import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. Send her the URL.

### Netlify

1. New site from Git.
2. Build command: `npm run build`. Publish directory: `dist`.

### GitHub Pages

`vite.config.ts` uses `base: "./"`, so the built files work in a project site or a user site without rewriting asset paths.

1. Run `npm run build`.
2. Push the contents of `dist/` to the `gh-pages` branch, or use a GitHub Action that publishes `dist` on every push to `main`.
3. In the repo settings, set Pages to that branch.

Google Fonts and YouTube load from the internet when she opens the page. Everything else is in the build.

## What she can do

- Tap the seal to open the letter. That tap also starts the music.
- Watch the countdown until 21 November, midnight IST. On the day, it switches to a birthday message.
- See the live years, days, hours, minutes, and seconds since `relationshipStart`.
- Blow out the candles with the microphone, or tap the cake. Then type a wish. The wish stays on her phone.
- Swipe the note stack, or use the buttons.
- Scratch the pink cards.
- Tap the bunny six times.
- Answer the last question. The "No" button is not very cooperative.

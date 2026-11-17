/**
 * Everything personal lives in this file.
 * Change the names, dates, notes, photos, and songs here — nowhere else.
 *
 * Dates use ISO 8601 with the India offset (+05:30), so the countdown
 * and the "years together" counter stay on Asia/Kolkata time
 * even if her phone is set somewhere else.
 *
 * Photos: put a file in `public/photos/`, then set `photo` to that file name.
 * Leave `photo` as null and the page draws a placeholder instead.
 *
 * Songs: `videoId` is the YouTube id (the part after watch?v=).
 * These ids were checked against official label uploads (T-Series,
 * Sony Music India, Saregama). No audio files are stored in this project.
 * If a video will not play where she is, swap the id.
 */

const herName = "Jessi";
const herNickname = "Meri Jaan";
const hisName = "Yours";

export const siteConfig = {
  herName,
  herNickname,
  hisName,

  /**
   * The day you count from. 7 March is "our day"; the exact first hour
   * can stay a little fuzzy. The live counter starts here, in IST.
   */
  relationshipStart: "2020-03-07T00:00:00+05:30",
  ourDay: "7 March",

  /** Midnight at the start of her birthday, India time. */
  birthday: "2026-11-21T00:00:00+05:30",

  /** Shown as the big heading above the live counter. */
  togetherHeadline: "6+ years together",
  togetherNote: "7 March is our day. This is the exact time I have been yours.",

  envelopeKicker: "for your eyes only",
  envelopeTitle: "A letter with your name on it",
  envelopeHint: "tap the seal",

  heroKicker: "today, and every day after",
  heroGreeting: "Happy Birthday",
  heroSub: "More than six years beside you, and I would still choose the seat next to yours.",

  countdownKicker: "until your day begins",
  countdownTitle: "Not long now",
  celebrationKicker: "the day is here",
  celebrationTitle: "It's your birthday",
  celebrationBody:
    "Midnight has come and gone in our time. Today is yours — soft, loud, sweet, and exactly like you.",

  sceneHint: "psst — the bunny is ticklish",
  easterTaps: 6,
  easterEgg:
    "You found the secret. I love you in the hidden places too. Happy birthday, quietly and out loud.",

  cakeKicker: "make a wish",
  cakeTitle: "The candles are for you",
  cakeLead: "Blow into the mic, or just tap the cake. Either way, I am on wish duty.",
  cakeMic: "I'll blow",
  cakeListening: "Okay — blow",
  cakeMicDenied: "No mic? A tap on the cake works just as well.",
  wishPlaceholder: "whisper a wish...",
  wishButton: "Send it to the stars",
  wishDone: "Caught. The stars and I are on it. This wish never leaves your phone.",

  wishesKicker: "saved for today",
  wishesTitle: "Little notes",
  wishes: [
    "Tum ho toh sab kuch hai.",
    `Happy birthday, ${herNickname.toLowerCase()}. You are my favourite person in every room.`,
    "Years on, and I still look for you first in a crowd.",
    "You make ordinary days feel like they were planned by someone kind.",
    "Tere saath, even traffic has a soundtrack.",
    "Thank you for loving the version of me that is still learning.",
    "I hope this year is as gentle as your hands and as bright as your laugh.",
    "Dil se, and also in the small ways: good morning, reach home, eat something.",
    "You are my calm, and my favourite kind of chaos.",
    "If home is a person, I have known her name since our day.",
    "May the cake be sweet, and the year after it even sweeter. Main hoon na.",
    "To more sunsets, more silly fights, and more of your hand in mine.",
  ],

  reasonsKicker: "a few of them",
  reasonsTitle: "Reasons I love you",
  reasonsHint: "Scratch a card. There are more underneath the pink.",
  reasons: [
    "The way you scrunch your nose when you laugh",
    "How you remember tiny things I forgot I told you",
    "Your kindness when nobody is clapping for it",
    "That you make me want to be a softer person",
    "Your half-asleep voice, still my favourite sound",
    "How the day sorts itself out when you hold my hand",
    "The way you say my name, like it belongs to you",
    "With you, even a Tuesday feels chosen",
    "Tum ho. That is the whole reason, and it is enough.",
  ],

  timelineKicker: "year by year",
  timelineTitle: "Our timeline",
  timelineIntro: "A little drawing for every year. A photo can take its place whenever you want.",
  milestones: [
    {
      year: "2020",
      title: "Where we began",
      text: "7 March. A hello that forgot to end. This is the year our story picked up a pen.",
      photo: null,
    },
    {
      year: "2021",
      title: "Learning you",
      text: "Long calls, inside jokes, and the year I memorised your favourite everything.",
      photo: null,
    },
    {
      year: "2022",
      title: "Side by side",
      text: "We grew up in the same direction, even on the days that were a mess.",
      photo: null,
    },
    {
      year: "2023",
      title: "Choosing us",
      text: "Not just falling. Staying. Again and again, on purpose.",
      photo: null,
    },
    {
      year: "2024",
      title: "Softer",
      text: "The year comfort started sounding a lot like your name.",
      photo: null,
    },
    {
      year: "2025",
      title: "Like home",
      text: "A whole year of 'you and me' feeling like the most natural sentence I know.",
      photo: null,
    },
  ],

  /**
   * Official uploads, checked November 2026:
   * T-Series, Sony Music India, and Saregama Music.
   */
  songs: [
    { title: "Tum Hi Ho", movie: "Aashiqui 2", artist: "Arijit Singh", videoId: "pmxa2wKwhrA" },
    { title: "Pehla Nasha", movie: "Jo Jeeta Wohi Sikandar", artist: "Udit Narayan, Sadhana Sargam", videoId: "ZYotlBxpM3Q" },
    { title: "Tum Se Hi", movie: "Jab We Met", artist: "Mohit Chauhan", videoId: "mt9xg0mmt28" },
    { title: "Raabta", movie: "Agent Vinod", artist: "Arijit Singh", videoId: "-d9nvq3402M" },
    { title: "Agar Tum Saath Ho", movie: "Tamasha", artist: "Arijit Singh, Alka Yagnik", videoId: "sK7riqg2mr4" },
    { title: "Pee Loon", movie: "Once Upon a Time in Mumbaai", artist: "Mohit Chauhan", videoId: "D8XFTglfSMg" },
    { title: "Hawayein", movie: "Jab Harry Met Sejal", artist: "Arijit Singh", videoId: "cs1e0fRyI18" },
    { title: "Tera Ban Jaunga", movie: "Kabir Singh", artist: "Akhil Sachdeva, Tulsi Kumar", videoId: "mQiiw7uRngk" },
    { title: "Kesariya", movie: "Brahmāstra", artist: "Arijit Singh", videoId: "BddP6PYo2gs" },
    { title: "Raataan Lambiyan", movie: "Shershaah", artist: "Jubin Nautiyal, Asees Kaur", videoId: "gvyUuxdRdR4" },
  ],

  letterKicker: "read this slowly",
  letterTitle: "A letter, just for you",
  letter: [
    `${herName},`,
    "I tried to be clever about this. I couldn't. What I feel for you has never sat still inside one sentence, and I don't think it is supposed to.",
    "Our day is 7 March. I don't remember the exact hour we began, only that the date became ours, and that you became my calm, my laughter, and the place I want to land.",
    "Thank you for the way you love. For your patience, your fire, your softness, and the hundred quiet ways you turn a life into a home.",
    `Happy birthday, ${herNickname}. I hope today feels as warm as you have made so many of mine.`,
    "I love you. I am so glad you were born, and so glad the world arranged for me to find you.",
    "Forever, and then some,",
    hisName,
  ],

  valentineKicker: "one small question",
  valentineQuestion: "Will you be my Valentine for the next 60 years?",
  yesLabel: "Yes, obviously",
  noLabel: "No",
  caughtLabel: "Okay, fine, yes",
  yesReply: "Then it is settled. Sixty more years — and after that, we negotiate for sixty more.",
  noReply: "Nice try. The yes button is the one with the hearts.",

  finaleKicker: "for you",
  finaleTitle: "Happy birthday",
  finaleBody: `Thank you for these years, ${herNickname}. I love you.`,
  finaleReplay: "Light the sky again",

  footer: `Made with a very full heart, for ${herName}.`,
} as const;

export type Milestone = (typeof siteConfig.milestones)[number];
export type Song = (typeof siteConfig.songs)[number];

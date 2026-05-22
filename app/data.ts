import { Website } from "./types"

export const defaultTitle = "Generation Alpha"

export const sections: {
  title: string
  websites: Website[]
}[] = [
  {
    title: "Games",
    websites: [
      {
        name: "Roblox",
        url: "https://www.roblox.com",
        description: "Popular online game platform",
        cost: 10000,
      },
      {
        name: "Fortnite",
        url: "https://www.fortnite.com",
        description: "Battle royale shooter game",
        cost: 12000,
      },
      {
        name: "Minecraft",
        url: "https://www.minecraft.net",
        description: "Sandbox building game",
        cost: 9000,
      },
      {
        name: "PUBG",
        url: "https://pubg.com",
        description: "Battle royale survival game",
        cost: 10000,
      },
      {
        name: "Call of Duty",
        url: "https://www.callofduty.com",
        description: "Competitive FPS shooter",
        cost: 12000,
      },
      {
        name: "Krunker",
        url: "https://krunker.io",
        description: "Browser FPS game",
        cost: 3000,
      },
      {
        name: "Cool Math Games",
        url: "https://www.coolmathgames.com",
        description: "Fun browser games",
        cost: 1500,
      },
      {
        name: "Chess",
        url: "https://www.chess.com",
        description: "Online chess platform",
        cost: 2000,
      },
      {
        name: "Blooket",
        url: "https://www.blooket.com",
        description: "Educational multiplayer quiz game",
        cost: 3500,
      },
      {
        name: "Kahoot",
        url: "https://kahoot.com",
        description: "Live learning quiz platform",
        cost: 3000,
      },
      {
        name: "Geometry Dash",
        url: "https://store.steampowered.com/app/322170/Geometry_Dash/",
        description: "Rhythm platformer game",
        cost: 5000,
      },
      {
        name: "Poki",
        url: "https://poki.com",
        description: "Free browser games website",
        cost: 2500,
      },
      {
        name: "Y8 Games",
        url: "https://www.y8.com",
        description: "Classic online games",
        cost: 2500,
      },
      {
        name: "Scratch",
        url: "https://scratch.mit.edu",
        description: "Coding and games community",
        cost: 1800,
      },
      {
        name: "Steam",
        url: "https://store.steampowered.com",
        description: "Massive PC gaming platform",
        cost: 15000,
      },
      {
        name: "Epic Games",
        url: "https://store.epicgames.com",
        description: "Game launcher and store",
        cost: 14000,
      },
    ],
  },

  {
    title: "Apps",
    websites: [
      {
        name: "YouTube",
        url: "https://youtube.com",
        description: "Video platform",
        cost: 10000,
      },
      {
        name: "TikTok",
        url: "https://tiktok.com",
        description: "Short-form video app",
        cost: 12000,
      },
      {
        name: "Netflix",
        url: "https://netflix.com",
        description: "Streaming platform",
        cost: 12000,
      },
      {
        name: "Spotify",
        url: "https://spotify.com",
        description: "Music streaming service",
        cost: 9000,
      },
      {
        name: "Discord",
        url: "https://discord.com",
        description: "Gaming and community chat app",
        cost: 7000,
      },
      {
        name: "Twitch",
        url: "https://twitch.tv",
        description: "Live streaming app",
        cost: 8000,
      },
      {
        name: "Snapchat",
        url: "https://snapchat.com",
        description: "Photo messaging app",
        cost: 8500,
      },
      {
        name: "Instagram",
        url: "https://instagram.com",
        description: "Photo and video sharing app",
        cost: 10000,
      },
      {
        name: "X",
        url: "https://x.com",
        description: "Social media platform",
        cost: 8500,
      },
      {
        name: "Reddit",
        url: "https://reddit.com",
        description: "Community discussion platform",
        cost: 6000,
      },
      {
        name: "Pinterest",
        url: "https://pinterest.com",
        description: "Creative image sharing",
        cost: 3500,
      },
      {
        name: "Canva",
        url: "https://canva.com",
        description: "Graphic design platform",
        cost: 4500,
      },
      {
        name: "CapCut",
        url: "https://capcut.com",
        description: "Video editing app",
        cost: 5500,
      },
      {
        name: "Photopea",
        url: "https://photopea.com",
        description: "Online Photoshop alternative",
        cost: 3000,
      },
      {
        name: "Pixlr",
        url: "https://pixlr.com",
        description: "Online image editor",
        cost: 2500,
      },
    ],
  },

  {
    title: "School Tools",
    websites: [
      {
        name: "Google Docs",
        url: "https://docs.google.com",
        description: "Online document editor",
        cost: 1500,
      },
      {
        name: "Google Slides",
        url: "https://slides.google.com",
        description: "Presentation editor",
        cost: 1500,
      },
      {
        name: "Google Classroom",
        url: "https://classroom.google.com",
        description: "School classroom platform",
        cost: 2000,
      },
      {
        name: "Khan Academy",
        url: "https://www.khanacademy.org",
        description: "Educational learning platform",
        cost: 1000,
      },
      {
        name: "Quizlet",
        url: "https://quizlet.com",
        description: "Study flashcards platform",
        cost: 1200,
      },
      {
        name: "Duolingo",
        url: "https://www.duolingo.com",
        description: "Language learning app",
        cost: 1800,
      },
      {
        name: "Brainly",
        url: "https://brainly.com",
        description: "Homework help website",
        cost: 2500,
      },
    ],
  },

  {
    title: "Fun Websites",
    websites: [
      {
        name: "BuzzFeed",
        url: "https://buzzfeed.com",
        description: "Entertainment and quizzes",
        cost: 2000,
      },
      {
        name: "Bored Panda",
        url: "https://boredpanda.com",
        description: "Funny and creative content",
        cost: 2500,
      },
      {
        name: "Akinator",
        url: "https://en.akinator.com",
        description: "Guessing game website",
        cost: 2200,
      },
      {
        name: "MonkeyType",
        url: "https://monkeytype.com",
        description: "Typing speed test website",
        cost: 3500,
      },
      {
        name: "Radio Garden",
        url: "https://radio.garden",
        description: "Listen to radio worldwide",
        cost: 4000,
      },
      {
        name: "Internet Archive",
        url: "https://archive.org",
        description: "Archive of internet history",
        cost: 3000,
      },
    ],
  },
]

export const secretApps: Website[] = [
  {
    name: "GeForce NOW",
    url: "https://play.geforcenow.com",
    description: "Cloud gaming service",
    cost: 20000,
  },
  {
    name: "Xbox Cloud Gaming",
    url: "https://www.xbox.com/play",
    description: "Xbox cloud streaming",
    cost: 18000,
  },
]

export const secretWebsites: Website[] = [
  {
    name: "Neal Fun",
    url: "https://neal.fun",
    description: "Interactive fun experiments",
    cost: 6000,
  },
  {
    name: "This Person Does Not Exist",
    url: "https://thispersondoesnotexist.com",
    description: "AI generated faces",
    cost: 7000,
  },
]
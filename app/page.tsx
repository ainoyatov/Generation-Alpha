"use client"

import { useState } from "react"

const sections = [
  {
    title: "Entertainment",
    websites: [
      { name: "YouTube", url: "https://www.youtube.com", description: "Videos and livestreams" },
      { name: "Netflix", url: "https://www.netflix.com", description: "Watch movies and TV shows" },
      { name: "Disney+", url: "https://www.disneyplus.com", description: "Disney movies and Marvel shows" },
      { name: "Spotify", url: "https://www.spotify.com", description: "Music and podcasts" },
      { name: "Twitch", url: "https://www.twitch.tv", description: "Gaming livestreams" },
    ],
  },

  {
    title: "Social Media",
    websites: [
      { name: "TikTok", url: "https://www.tiktok.com", description: "Watch viral short videos" },
      { name: "Instagram", url: "https://www.instagram.com", description: "Photos and reels" },
      { name: "Snapchat", url: "https://www.snapchat.com", description: "Chat and stories" },
      { name: "Discord", url: "https://www.discord.com", description: "Chat with friends" },
      { name: "Reddit", url: "https://www.reddit.com", description: "Communities and discussions" },
    ],
  },

  {
    title: "Games",
    websites: [
      { name: "Roblox", url: "https://www.roblox.com", description: "Millions of online games" },
      { name: "Minecraft", url: "https://www.minecraft.net", description: "Build and explore worlds" },
      { name: "Brawl Stars", url: "https://apps.apple.com/us/app/brawl-stars/id1229016807", description: "Fast multiplayer battles" },
      { name: "Clash Royale", url: "https://apps.apple.com/us/app/clash-royale/id1053012308", description: "Real-time strategy battles" },
      { name: "Fortnite", url: "https://www.fortnite.com", description: "Battle royale and creative mode" },
      { name: "Geometry Dash Lite", url: "https://apps.apple.com/us/app/geometry-dash-lite/id698255242", description: "Free Geometry Dash version" },
    ],
  },

  {
    title: "Editing Apps",
    websites: [
      { name: "CapCut", url: "https://www.capcut.com", description: "Edit viral videos" },
      { name: "Canva", url: "https://www.canva.com", description: "Create graphics and slides" },
      { name: "Adobe Photoshop", url: "https://www.adobe.com/products/photoshop.html", description: "Professional photo editing" },
      { name: "Photopea", url: "https://www.photopea.com", description: "Free Photoshop alternative" },
    ],
  },

  {
    title: "School",
    websites: [
      { name: "Google Classroom", url: "https://classroom.google.com", description: "Assignments and school classes" },
      { name: "Blooket", url: "https://www.blooket.com", description: "Fun classroom quiz games" },
      { name: "Classroom 6x", url: "https://classroom6x.org", description: "Popular unblocked games website" },
      { name: "Classroom Resources", url: "https://sites.google.com/view/classroom-resources", description: "Unblocked games and resources" },
      { name: "Cool Math Games", url: "https://www.coolmathgames.com", description: "Educational puzzle games" },
    ],
  },

  {
    title: "Fun Websites",
    websites: [
      { name: "Neal.fun", url: "https://neal.fun", description: "Fun internet experiments" },
      { name: "GeoGuessr", url: "https://www.geoguessr.com", description: "Guess places around the world" },
      { name: "Akinator", url: "https://en.akinator.com", description: "Guess characters and people" },
      { name: "The Useless Web", url: "https://theuselessweb.com", description: "Random funny websites" },
    ],
  },
]

const secretApps = [
  { name: "Threads", url: "https://www.threads.net" },
  { name: "BeReal", url: "https://bereal.com" },
  { name: "Notion", url: "https://www.notion.so" },
  { name: "Replit", url: "https://replit.com" },
  { name: "Scratch", url: "https://scratch.mit.edu" },
  { name: "CodePen", url: "https://codepen.io" },
  { name: "Giphy", url: "https://giphy.com" },
  { name: "Tenor", url: "https://tenor.com" },
  { name: "Grammarly", url: "https://www.grammarly.com" },
  { name: "Remove.bg", url: "https://www.remove.bg" },
]

const secretWebsites = [
  { name: "Bored Button", url: "https://www.boredbutton.com" },
  { name: "MapCrunch", url: "https://www.mapcrunch.com" },
  { name: "Hacker Typer", url: "https://hackertyper.net" },
  { name: "Zoom Quilt", url: "https://zoomquilt.org" },
  { name: "WeaveSilk", url: "https://weavesilk.com" },
  { name: "Sandspiel", url: "https://sandspiel.club" },
  { name: "FutureMe", url: "https://www.futureme.org" },
  { name: "Astronaut.io", url: "https://astronaut.io" },
  { name: "Internet Live Stats", url: "https://www.internetlivestats.com" },
  { name: "Drive & Listen", url: "https://driveandlisten.herokuapp.com" },
]

export default function HomePage() {
  const [passcode, setPasscode] = useState("")
  const [unlocked, setUnlocked] = useState(false)

  const [announcementInput, setAnnouncementInput] = useState("")
  const [announcement, setAnnouncement] = useState("")
  const [showAnnouncement, setShowAnnouncement] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  const [showSecretLinks, setShowSecretLinks] = useState(false)

  const [secretApp, setSecretApp] = useState(secretApps[0])
  const [secretWebsite, setSecretWebsite] =
    useState(secretWebsites[0])

  const [darkMode, setDarkMode] = useState(false)

  function unlockAdmin() {
    if (passcode === "5494") {
      setUnlocked(true)
    } else {
      alert("Wrong passcode")
    }
  }

  function sendAnnouncement() {
    if (!announcementInput.trim()) return

    setAnnouncement(announcementInput)
    setAnnouncementInput("")
    setShowAnnouncement(true)
    setFadeOut(false)

    setTimeout(() => {
      setFadeOut(true)
    }, 4000)

    setTimeout(() => {
      setShowAnnouncement(false)
    }, 5000)
  }

  function randomizeSecretLinks() {
    if (showSecretLinks) {
      setShowSecretLinks(false)
      return
    }

    const randomApp =
      secretApps[Math.floor(Math.random() * secretApps.length)]

    const randomWebsite =
      secretWebsites[
        Math.floor(Math.random() * secretWebsites.length)
      ]

    setSecretApp(randomApp)
    setSecretWebsite(randomWebsite)
    setShowSecretLinks(true)
  }

  return (
    <main
      className={`min-h-screen px-6 py-12 ${
        darkMode
          ? "bg-black text-white"
          : "bg-gradient-to-b from-green-100 to-white"
      }`}
    >
      <section className="mx-auto max-w-7xl">
        {announcement && showAnnouncement && (
          <div
            className={`sticky top-4 z-50 mb-8 rounded-xl bg-yellow-200 p-4 text-center font-bold text-black shadow-xl transition-opacity duration-1000 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            {announcement}
          </div>
        )}

        <h1 className="text-center text-6xl font-black text-green-900">
          Generation Alpha
        </h1>

        <p className="mt-4 text-center text-xl text-green-800">
          Your portal to apps, games, entertainment,
          and fun websites.
        </p>

        {sections.map((section) => (
          <div key={section.title} className="mt-16">
            <h2 className="mb-6 text-4xl font-bold text-green-900">
              {section.title}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {section.websites.map((website) => (
                <a
                  key={website.name}
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-white p-6 text-green-900 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
                >
                  <h3 className="text-2xl font-bold">
                    {website.name}
                  </h3>

                  <p className="mt-3 text-green-700">
                    {website.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}

        {showSecretLinks && (
          <div className="mt-16">
            <h2 className="mb-6 text-4xl font-bold text-purple-700">
              Secret Links Gamble
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <a
                href={secretApp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-purple-100 p-6 font-bold text-purple-900"
              >
                Secret App: {secretApp.name}
              </a>

              <a
                href={secretWebsite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-purple-100 p-6 font-bold text-purple-900"
              >
                Secret Website: {secretWebsite.name}
              </a>
            </div>
          </div>
        )}

        <div className="mt-20 rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="text-3xl font-bold text-green-900">
            Admin Panel
          </h2>

          {!unlocked ? (
            <>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="mt-4 w-full rounded-lg border p-4"
              />

              <button
                onClick={unlockAdmin}
                className="mt-4 rounded-lg bg-green-900 px-6 py-3 text-white"
              >
                Unlock Admin
              </button>
            </>
          ) : (
            <div className="mt-6">
              <div className="mt-6 flex gap-3">
                <input
                  value={announcementInput}
                  onChange={(e) =>
                    setAnnouncementInput(e.target.value)
                  }
                  placeholder="Type global announcement..."
                  className="flex-1 rounded-lg border p-4"
                />

                <button
                  onClick={sendAnnouncement}
                  className="rounded-lg bg-green-900 px-6 py-4 text-white"
                >
                  ↵
                </button>
              </div>

              <button
                onClick={randomizeSecretLinks}
                className="mt-4 rounded-lg bg-purple-700 px-5 py-3 text-white"
              >
                Gamble Secret Links
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="mt-4 ml-3 rounded-lg bg-black px-5 py-3 text-white"
              >
                Toggle Dark Mode
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
"use client"

import { useEffect, useMemo, useState } from "react"

const defaultTitle = "Generation Alpha"

type Website = {
  name: string
  url: string
  description: string
}

type BugReport = {
  id: number
  websiteName: string
  reason: string
  reporter: string
  status: "Pending" | "Accepted"
}

type PrivateMessage = {
  id: number
  to: string
  message: string
}

const sections = [
  {
    title: "Entertainment",
    websites: [
      { name: "YouTube", url: "https://www.youtube.com", description: "Videos and livestreams" },
      { name: "Netflix", url: "https://www.netflix.com", description: "Watch movies and TV shows" },
      { name: "Disney+", url: "https://www.disneyplus.com", description: "Disney movies and Marvel shows" },
      { name: "Spotify", url: "https://www.spotify.com", description: "Music and podcasts" },
      { name: "Twitch", url: "https://www.twitch.tv", description: "Gaming livestreams" },
      { name: "Crunchyroll", url: "https://www.crunchyroll.com", description: "Anime streaming" },
      { name: "Hulu", url: "https://www.hulu.com", description: "TV shows and movies" },
      { name: "Tubi", url: "https://tubitv.com", description: "Free movies and shows" },
      { name: "Pluto TV", url: "https://pluto.tv", description: "Free live TV" },
      { name: "Prime Video", url: "https://www.primevideo.com", description: "Movies and shows" },
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
      { name: "Pinterest", url: "https://www.pinterest.com", description: "Ideas and inspiration" },
      { name: "ChatGPT", url: "https://chatgpt.com", description: "AI assistant" },
    ],
  },
  {
    title: "Games",
    websites: [
      { name: "Roblox", url: "https://www.roblox.com", description: "Millions of online games" },
      { name: "Minecraft", url: "https://www.minecraft.net", description: "Build and explore worlds" },
      { name: "Fortnite", url: "https://www.fortnite.com", description: "Battle royale and creative mode" },
      { name: "Call of Duty Mobile", url: "https://apps.apple.com/us/app/call-of-duty-mobile/id1287282214", description: "Mobile shooter game" },
      { name: "PUBG Mobile", url: "https://apps.apple.com/us/app/pubg-mobile/id1330123889", description: "Battle royale survival" },
      { name: "Brawl Stars", url: "https://apps.apple.com/us/app/brawl-stars/id1229016807", description: "Fast multiplayer battles" },
      { name: "Clash Royale", url: "https://apps.apple.com/us/app/clash-royale/id1053012308", description: "Real-time strategy battles" },
      { name: "Clash of Clans", url: "https://apps.apple.com/us/app/clash-of-clans/id529479190", description: "Build villages and battle" },
      { name: "Among Us", url: "https://apps.apple.com/us/app/among-us/id1351168404", description: "Find the impostor" },
      { name: "Stumble Guys", url: "https://apps.apple.com/us/app/stumble-guys/id1541153375", description: "Funny obstacle races" },
      { name: "Subway Surfers", url: "https://apps.apple.com/us/app/subway-surfers/id512939461", description: "Classic endless runner" },
      { name: "Temple Run 2", url: "https://apps.apple.com/us/app/temple-run-2/id572395608", description: "Escape and survive" },
      { name: "Pokémon GO", url: "https://apps.apple.com/us/app/pokémon-go/id1094591345", description: "Catch Pokémon outside" },
      { name: "Geometry Dash Lite", url: "https://apps.apple.com/us/app/geometry-dash-lite/id698255242", description: "Free Geometry Dash version" },
      { name: "Geometry Dash World", url: "https://apps.apple.com/us/app/geometry-dash-world/id1185457891", description: "Explore Geometry Dash levels" },
      { name: "Geometry Dash Meltdown", url: "https://apps.apple.com/us/app/geometry-dash-meltdown/id1045901853", description: "Rhythm platform challenge" },
      { name: "Geometry Dash SubZero", url: "https://apps.apple.com/us/app/geometry-dash-subzero/id1324044770", description: "Music and jumping action" },
      { name: "Free Fire", url: "https://ff.garena.com", description: "Battle royale action game" },
      { name: "Rocket League", url: "https://www.rocketleague.com", description: "Soccer with rocket cars" },
      { name: "Valorant", url: "https://playvalorant.com", description: "Competitive tactical shooter" },
      { name: "League of Legends", url: "https://www.leagueoflegends.com", description: "Popular MOBA strategy game" },
      { name: "Genshin Impact", url: "https://genshin.hoyoverse.com", description: "Open world anime adventure" },
      { name: "Fall Guys", url: "https://www.fallguys.com", description: "Funny obstacle survival game" },
      { name: "Apex Legends", url: "https://www.ea.com/games/apex-legends", description: "Squad battle royale shooter" },
      { name: "CS2", url: "https://www.counter-strike.net", description: "Competitive FPS action" },
      { name: "Halo Infinite", url: "https://www.halowaypoint.com", description: "Sci-fi multiplayer battles" },
      { name: "FIFA", url: "https://www.ea.com/games/ea-sports-fc", description: "Football and soccer simulation" },
      { name: "NBA 2K", url: "https://nba.2k.com", description: "Basketball sports game" },
    ],
  },
  {
    title: "Editing Apps",
    websites: [
      { name: "CapCut", url: "https://www.capcut.com", description: "Edit viral videos" },
      { name: "Canva", url: "https://www.canva.com", description: "Create graphics and slides" },
      { name: "Adobe Photoshop", url: "https://www.adobe.com/products/photoshop.html", description: "Professional photo editing" },
      { name: "Photopea", url: "https://www.photopea.com", description: "Free Photoshop alternative" },
      { name: "Pixlr", url: "https://pixlr.com", description: "Online photo editor" },
      { name: "Figma", url: "https://www.figma.com", description: "Design websites and apps" },
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
      { name: "Khan Academy", url: "https://www.khanacademy.org", description: "Free learning and lessons" },
      { name: "Quizlet", url: "https://quizlet.com", description: "Flashcards and study tools" },
      { name: "Kahoot!", url: "https://kahoot.com", description: "Interactive classroom quizzes" },
      { name: "Duolingo", url: "https://www.duolingo.com", description: "Learn languages for free" },
    ],
  },
  {
    title: "Fun Websites",
    websites: [
      { name: "Neal.fun", url: "https://neal.fun", description: "Fun internet experiments" },
      { name: "GeoGuessr", url: "https://www.geoguessr.com", description: "Guess places around the world" },
      { name: "Akinator", url: "https://en.akinator.com", description: "Guess characters and people" },
      { name: "The Useless Web", url: "https://theuselessweb.com", description: "Random funny websites" },
      { name: "Pointer Pointer", url: "https://pointerpointer.com", description: "Finds a photo pointing at your cursor" },
      { name: "Quick, Draw!", url: "https://quickdraw.withgoogle.com", description: "AI guessing drawing game" },
      { name: "Chrome Music Lab", url: "https://musiclab.chromeexperiments.com", description: "Create music with fun tools" },
      { name: "Little Alchemy 2", url: "https://littlealchemy2.com", description: "Mix elements to create things" },
    ],
  },
]

const secretApps = [
  { name: "Scratch", url: "https://scratch.mit.edu", description: "Create games and animations" },
  { name: "Replit", url: "https://replit.com", description: "Code in your browser" },
  { name: "CodePen", url: "https://codepen.io", description: "Build frontend demos" },
  { name: "Desmos", url: "https://www.desmos.com", description: "Graphing calculator" },
  { name: "Remove.bg", url: "https://www.remove.bg", description: "Remove image backgrounds" },
  { name: "Notion", url: "https://www.notion.so", description: "Notes and organization" },
  { name: "Trello", url: "https://trello.com", description: "Project boards" },
  { name: "Giphy", url: "https://giphy.com", description: "GIF search" },
  { name: "Tenor", url: "https://tenor.com", description: "Reaction GIFs" },
  { name: "Sketchpad", url: "https://sketch.io/sketchpad", description: "Draw online" },
  { name: "Miro", url: "https://miro.com", description: "Whiteboard app" },
  { name: "Soundtrap", url: "https://www.soundtrap.com", description: "Make music online" },
  { name: "Grammarly", url: "https://www.grammarly.com", description: "Writing assistant" },
  { name: "BeReal", url: "https://bereal.com", description: "Social photo app" },
  { name: "Threads", url: "https://www.threads.net", description: "Social app" },
]

const secretWebsites = [
  { name: "Bored Button", url: "https://www.boredbutton.com", description: "Random fun websites" },
  { name: "Hacker Typer", url: "https://hackertyper.net", description: "Fake hacker typing" },
  { name: "Zoom Quilt", url: "https://zoomquilt.org", description: "Infinite zoom art" },
  { name: "WeaveSilk", url: "https://weavesilk.com", description: "Interactive silk art" },
  { name: "Find the Invisible Cow", url: "https://findtheinvisiblecow.com", description: "Funny sound game" },
  { name: "MapCrunch", url: "https://www.mapcrunch.com", description: "Random street views" },
  { name: "Sandspiel", url: "https://sandspiel.club", description: "Falling sand game" },
  { name: "FutureMe", url: "https://www.futureme.org", description: "Write future letters" },
  { name: "Astronaut.io", url: "https://astronaut.io", description: "Random YouTube videos" },
  { name: "Internet Live Stats", url: "https://www.internetlivestats.com", description: "Live internet stats" },
  { name: "Mental Floss", url: "https://www.mentalfloss.com", description: "Facts and trivia" },
  { name: "Emoji Kitchen", url: "https://emoji.supply/kitchen", description: "Mix emojis" },
  { name: "Scream Into the Void", url: "https://screamintothevoid.com", description: "Type and release thoughts" },
  { name: "Radiooooo", url: "https://radiooooo.com", description: "Music by country and decade" },
  { name: "Bouncy Balls", url: "https://bouncyballs.org", description: "Noise visualizer" },
]

export default function HomePage() {
  const [username, setUsername] = useState("")
  const [tempUsername, setTempUsername] = useState("")
  const [tempPassword, setTempPassword] = useState("")
  const [showUserPopup, setShowUserPopup] = useState(true)
  const [userMessage, setUserMessage] = useState("")
  const [userList, setUserList] = useState<string[]>([])

  const [passcode, setPasscode] = useState("")
  const [adminUnlocked, setAdminUnlocked] = useState(false)
  const [adminError, setAdminError] = useState("")

  const [siteTitle, setSiteTitle] = useState(defaultTitle)
  const [titleInput, setTitleInput] = useState("")

  const [announcementInput, setAnnouncementInput] = useState("")
  const [announcement, setAnnouncement] = useState("")
  const [showAnnouncement, setShowAnnouncement] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  const [showSecretLinks, setShowSecretLinks] = useState(false)
  const [secretApp, setSecretApp] = useState<Website>(secretApps[0])
  const [secretWebsite, setSecretWebsite] = useState<Website>(secretWebsites[0])

  const [darkMode, setDarkMode] = useState(false)
  const [partyMode, setPartyMode] = useState(false)
  const [siteLocked, setSiteLocked] = useState(false)

  const [featuredGame, setFeaturedGame] = useState<Website | null>(null)
  const [featuredApp, setFeaturedApp] = useState<Website | null>(null)
  const [kickUsername, setKickUsername] = useState("")

  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])

  const [bugReports, setBugReports] = useState<BugReport[]>([])
  const [privateMessages, setPrivateMessages] = useState<PrivateMessage[]>([])
  const [reportingWebsite, setReportingWebsite] = useState<Website | null>(null)
  const [bugReason, setBugReason] = useState("")

  const allWebsites = useMemo(
    () => sections.flatMap((section) => section.websites),
    []
  )

  const favoriteWebsites = allWebsites.filter((website) =>
    favorites.includes(website.name)
  )

  const myPrivateMessages = privateMessages.filter(
    (privateMessage) => privateMessage.to === username
  )

  useEffect(() => {
    const savedUser = localStorage.getItem("generationAlphaUsername")
    const savedUsers = localStorage.getItem("generationAlphaUsers")
    const savedFavorites = localStorage.getItem("generationAlphaFavorites")
    const savedBugReports = localStorage.getItem("generationAlphaBugReports")
    const savedPrivateMessages = localStorage.getItem("generationAlphaPrivateMessages")

    if (savedUsers) setUserList(JSON.parse(savedUsers))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedBugReports) setBugReports(JSON.parse(savedBugReports))
    if (savedPrivateMessages) setPrivateMessages(JSON.parse(savedPrivateMessages))

    if (savedUser) {
      setUsername(savedUser)
      setShowUserPopup(false)
    }
  }, [])

  function createUser() {
    if (tempUsername.length < 8 || tempUsername.length > 50) {
      setUserMessage("Username must be 8-50 characters.")
      return
    }

    if (!tempPassword.trim()) {
      setUserMessage("Password is required.")
      return
    }

    const updatedUsers = userList.includes(tempUsername)
      ? userList
      : [...userList, tempUsername]

    localStorage.setItem("generationAlphaUsername", tempUsername)
    localStorage.setItem("generationAlphaPassword", tempPassword)
    localStorage.setItem("generationAlphaUsers", JSON.stringify(updatedUsers))

    setUserList(updatedUsers)
    setUsername(tempUsername)
    setShowUserPopup(false)
  }

  function unlockAdmin() {
    if (passcode === "5494") {
      setAdminUnlocked(true)
      setAdminError("")
    } else {
      setAdminError("Incorrect password.")
    }
  }

  function sendAnnouncement() {
    if (!announcementInput.trim()) return

    setAnnouncement(announcementInput)
    setAnnouncementInput("")
    setShowAnnouncement(true)
    setFadeOut(false)

    setTimeout(() => setFadeOut(true), 4000)
    setTimeout(() => setShowAnnouncement(false), 5000)
  }

  function gambleSecretLinks() {
    if (showSecretLinks) {
      setShowSecretLinks(false)
      return
    }

    setSecretApp(secretApps[Math.floor(Math.random() * secretApps.length)])
    setSecretWebsite(secretWebsites[Math.floor(Math.random() * secretWebsites.length)])
    setShowSecretLinks(true)
  }

  function randomFeaturedGame() {
    if (featuredGame) {
      setFeaturedGame(null)
      return
    }

    const games = sections.find((section) => section.title === "Games")?.websites ?? []
    setFeaturedGame(games[Math.floor(Math.random() * games.length)])
  }

  function randomFeaturedApp() {
    if (featuredApp) {
      setFeaturedApp(null)
      return
    }

    setFeaturedApp(allWebsites[Math.floor(Math.random() * allWebsites.length)])
  }

  function renameWebsite() {
    if (!titleInput.trim()) return

    setSiteTitle(titleInput)
    setTitleInput("")
  }

  function resetWebsiteName() {
    setSiteTitle(defaultTitle)
  }

  function kickUser() {
    if (!kickUsername.trim()) return

    const updatedUsers = userList.filter((user) => user !== kickUsername)

    localStorage.setItem("generationAlphaUsers", JSON.stringify(updatedUsers))
    setUserList(updatedUsers)

    if (username === kickUsername) {
      localStorage.removeItem("generationAlphaUsername")
      localStorage.removeItem("generationAlphaPassword")
      setUsername("")
      setTempUsername("")
      setTempPassword("")
      setShowUserPopup(true)
    }

    alert(`${kickUsername} was removed from the saved user list on this device.`)
    setKickUsername("")
  }

  function toggleFavorite(name: string) {
    const updatedFavorites = favorites.includes(name)
      ? favorites.filter((favorite) => favorite !== name)
      : [...favorites, name]

    localStorage.setItem("generationAlphaFavorites", JSON.stringify(updatedFavorites))
    setFavorites(updatedFavorites)
  }

  function openBugReport(website: Website) {
    setReportingWebsite(website)
    setBugReason("")
  }

  function submitBugReport() {
    if (!reportingWebsite) return

    if (!bugReason.trim()) {
      alert("Please give a reason for the bug report.")
      return
    }

    const newReport: BugReport = {
      id: Date.now(),
      websiteName: reportingWebsite.name,
      reason: bugReason,
      reporter: username || "Unknown User",
      status: "Pending",
    }

    const updatedReports = [...bugReports, newReport]

    localStorage.setItem("generationAlphaBugReports", JSON.stringify(updatedReports))
    setBugReports(updatedReports)
    setReportingWebsite(null)
    setBugReason("")
    alert("Bug report sent to admin.")
  }

  function dismissBugReport(reportId: number) {
    const updatedReports = bugReports.filter((report) => report.id !== reportId)

    localStorage.setItem("generationAlphaBugReports", JSON.stringify(updatedReports))
    setBugReports(updatedReports)
  }

  function acceptBugReport(report: BugReport) {
    const updatedReports = bugReports.map((bugReport) =>
      bugReport.id === report.id
        ? { ...bugReport, status: "Accepted" as const }
        : bugReport
    )

    const newMessage: PrivateMessage = {
      id: Date.now(),
      to: report.reporter,
      message: `Admin reviewed your bug report for ${report.websiteName}. It will be fixed.`,
    }

    const updatedMessages = [...privateMessages, newMessage]

    localStorage.setItem("generationAlphaBugReports", JSON.stringify(updatedReports))
    localStorage.setItem("generationAlphaPrivateMessages", JSON.stringify(updatedMessages))

    setBugReports(updatedReports)
    setPrivateMessages(updatedMessages)
  }

  function dismissPrivateMessage(messageId: number) {
    const updatedMessages = privateMessages.filter(
      (privateMessage) => privateMessage.id !== messageId
    )

    localStorage.setItem("generationAlphaPrivateMessages", JSON.stringify(updatedMessages))
    setPrivateMessages(updatedMessages)
  }

  function scrollToSection(title: string) {
    document
      .getElementById(title.toLowerCase().replaceAll(" ", "-"))
      ?.scrollIntoView({ behavior: "smooth" })
  }

  function matchesSearch(website: Website) {
    const value = searchTerm.toLowerCase()

    return (
      website.name.toLowerCase().includes(value) ||
      website.description.toLowerCase().includes(value)
    )
  }

  function WebsiteCard({ website }: { website: Website }) {
    return (
      <div className="rounded-2xl bg-white p-6 text-green-900 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
        <a href={website.url} target="_blank" rel="noopener noreferrer">
          <h3 className="text-2xl font-bold">{website.name}</h3>
          <p className="mt-3 text-green-700">{website.description}</p>
        </a>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => toggleFavorite(website.name)}
            className="rounded-lg bg-yellow-100 px-3 py-2 text-sm font-bold text-yellow-800"
          >
            {favorites.includes(website.name) ? "★ Favorited" : "☆ Favorite"}
          </button>

          <button
            onClick={() => openBugReport(website)}
            className="rounded-lg bg-red-100 px-3 py-2 text-sm font-bold text-red-700"
          >
            Report Bug
          </button>
        </div>
      </div>
    )
  }

  return (
    <main
      className={`min-h-screen px-4 py-8 sm:px-6 sm:py-12 ${
        partyMode
          ? "bg-gradient-to-br from-pink-300 via-yellow-200 to-blue-300"
          : darkMode
          ? "bg-black text-white"
          : "bg-gradient-to-b from-green-100 to-white"
      }`}
    >
      <section className="relative mx-auto max-w-7xl">
        {username && (
          <div className="mb-6 flex justify-center sm:absolute sm:right-0 sm:top-0 sm:mb-0">
            <div className="rounded-xl bg-white px-4 py-2 shadow-lg">
              <p className="font-bold text-green-900">@{username}</p>
            </div>
          </div>
        )}

        {myPrivateMessages.length > 0 && (
          <div className="mb-6 rounded-2xl bg-blue-100 p-4 text-blue-900 shadow-lg">
            <h2 className="text-xl font-bold">Private Messages</h2>

            <div className="mt-3 space-y-3">
              {myPrivateMessages.map((privateMessage) => (
                <div
                  key={privateMessage.id}
                  className="rounded-xl bg-white p-4 shadow"
                >
                  <p>{privateMessage.message}</p>

                  <button
                    onClick={() => dismissPrivateMessage(privateMessage.id)}
                    className="mt-3 rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white"
                  >
                    Dismiss Message
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {showUserPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-green-900 shadow-2xl">
              <h2 className="text-3xl font-black">Create Account</h2>

              <input
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="Username"
                className="mt-6 w-full rounded-lg border p-4"
              />

              <input
                type="password"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                placeholder="Password"
                className="mt-4 w-full rounded-lg border p-4"
              />

              <button
                onClick={createUser}
                className="mt-4 w-full rounded-lg bg-green-900 px-6 py-3 text-white"
              >
                Save Account
              </button>

              {userMessage && (
                <p className="mt-4 rounded-lg bg-green-100 p-3">
                  {userMessage}
                </p>
              )}
            </div>
          </div>
        )}

        {reportingWebsite && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-green-900 shadow-2xl">
              <h2 className="text-3xl font-black">Report Bug</h2>

              <p className="mt-3 text-green-700">
                What is wrong with {reportingWebsite.name}?
              </p>

              <textarea
                value={bugReason}
                onChange={(e) => setBugReason(e.target.value)}
                placeholder="Give a reason..."
                className="mt-6 h-32 w-full rounded-lg border p-4 text-black"
              />

              <button
                onClick={submitBugReport}
                className="mt-4 w-full rounded-lg bg-red-700 px-6 py-3 text-white"
              >
                Send Bug Report
              </button>

              <button
                onClick={() => setReportingWebsite(null)}
                className="mt-3 w-full rounded-lg bg-gray-700 px-6 py-3 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {announcement && showAnnouncement && (
          <div
            className={`sticky top-4 z-50 mb-8 rounded-xl bg-yellow-200 p-4 text-center font-bold text-black shadow-xl transition-opacity duration-1000 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            {announcement}
          </div>
        )}

        <h1 className="text-center text-4xl font-black text-green-900 sm:text-6xl">
          {siteTitle}
        </h1>

        <p className="mt-4 text-center text-lg text-green-800 sm:text-xl">
          Your portal to apps, games, entertainment, and fun websites.
        </p>

        <div className="sticky top-0 z-40 mt-8 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search apps, games, websites..."
            className="w-full rounded-lg border p-4 text-black"
          />

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {sections.map((section) => (
              <button
                key={section.title}
                onClick={() => scrollToSection(section.title)}
                className="rounded-full bg-green-900 px-4 py-2 text-sm font-bold text-white"
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {favoriteWebsites.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-6 text-4xl font-bold text-yellow-700">
              Favorites
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {favoriteWebsites.map((website) => (
                <WebsiteCard key={website.name} website={website} />
              ))}
            </div>
          </div>
        )}

        {featuredGame && (
          <div className="mt-10 rounded-2xl bg-white p-6 text-green-900 shadow-xl">
            <h2 className="text-3xl font-bold">Featured Game</h2>

            <a
              href={featuredGame.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-xl bg-green-100 p-4 font-bold"
            >
              {featuredGame.name} — {featuredGame.description}
            </a>
          </div>
        )}

        {featuredApp && (
          <div className="mt-10 rounded-2xl bg-white p-6 text-blue-900 shadow-xl">
            <h2 className="text-3xl font-bold">Featured App</h2>

            <a
              href={featuredApp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-xl bg-blue-100 p-4 font-bold"
            >
              {featuredApp.name} — {featuredApp.description}
            </a>
          </div>
        )}

        {siteLocked ? (
          <div className="mt-16 rounded-2xl bg-red-100 p-8 text-center text-red-900 shadow-xl">
            <h2 className="text-4xl font-black">Site Locked</h2>
            <p className="mt-3 text-xl">Admin locked the website.</p>
          </div>
        ) : (
          sections.map((section) => {
            const filteredWebsites = section.websites.filter(matchesSearch)

            if (filteredWebsites.length === 0) return null

            return (
              <div
                key={section.title}
                id={section.title.toLowerCase().replaceAll(" ", "-")}
                className="mt-16 scroll-mt-32"
              >
                <h2 className="mb-6 text-4xl font-bold text-green-900">
                  {section.title}
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredWebsites.map((website) => (
                    <WebsiteCard key={website.name} website={website} />
                  ))}
                </div>
              </div>
            )
          })
        )}

        {showSecretLinks && (
          <div className="mt-16">
            <h2 className="mb-6 text-4xl font-bold text-purple-700">
              Secret Links Gamble
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <WebsiteCard website={secretApp} />
              <WebsiteCard website={secretWebsite} />
            </div>
          </div>
        )}

        <div className="mt-20 rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="text-3xl font-bold text-green-900">Admin Panel</h2>

          {!adminUnlocked ? (
            <>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="mt-4 w-full rounded-lg border p-4 text-black"
              />

              <button
                onClick={unlockAdmin}
                className="mt-4 rounded-lg bg-green-900 px-6 py-3 text-white"
              >
                Unlock Admin
              </button>

              {adminError && (
                <p className="mt-4 rounded-lg bg-red-100 p-4 font-bold text-red-700">
                  {adminError}
                </p>
              )}
            </>
          ) : (
            <div className="mt-6">
              <p className="rounded-lg bg-green-100 p-4 font-bold text-green-900">
                Admin Access Granted
              </p>

              <p className="mt-4 text-lg font-bold text-green-900">
                Logged in as: @{username}
              </p>

              <div className="mt-6 rounded-xl bg-green-50 p-4 text-green-900">
                <h3 className="text-xl font-bold">Saved Users</h3>

                {userList.length === 0 ? (
                  <p className="mt-2">No users yet.</p>
                ) : (
                  <ul className="mt-2 list-disc pl-6">
                    {userList.map((user) => (
                      <li key={user}>@{user}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-900">
                <h3 className="text-xl font-bold">Bug Reports</h3>

                {bugReports.length === 0 ? (
                  <p className="mt-2">No bug reports yet.</p>
                ) : (
                  <div className="mt-3 space-y-4">
                    {bugReports.map((report) => (
                      <div key={report.id} className="rounded-xl bg-white p-4 shadow">
                        <p className="font-bold">Website: {report.websiteName}</p>
                        <p>Reporter: @{report.reporter}</p>
                        <p>Status: {report.status}</p>
                        <p className="mt-2">Reason: {report.reason}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={() => acceptBugReport(report)}
                            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white"
                          >
                            Agree + Notify User
                          </button>

                          <button
                            onClick={() => dismissBugReport(report.id)}
                            className="rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white"
                          >
                            Dismiss Bug
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <input
                  value={announcementInput}
                  onChange={(e) => setAnnouncementInput(e.target.value)}
                  placeholder="Announcement..."
                  className="flex-1 rounded-lg border p-4 text-black"
                />

                <button
                  onClick={sendAnnouncement}
                  className="rounded-lg bg-green-900 px-6 py-4 text-white"
                >
                  ↵
                </button>
              </div>

              <div className="mt-6 flex gap-3">
                <input
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder="Change website name..."
                  className="flex-1 rounded-lg border p-4 text-black"
                />

                <button
                  onClick={renameWebsite}
                  className="rounded-lg bg-green-900 px-6 py-4 text-white"
                >
                  Rename
                </button>

                <button
                  onClick={resetWebsiteName}
                  className="rounded-lg bg-gray-700 px-6 py-4 text-white"
                >
                  Reset
                </button>
              </div>

              <div className="mt-6 flex gap-3">
                <input
                  value={kickUsername}
                  onChange={(e) => setKickUsername(e.target.value)}
                  placeholder="Kick username..."
                  className="flex-1 rounded-lg border p-4 text-black"
                />

                <button
                  onClick={kickUser}
                  className="rounded-lg bg-red-700 px-6 py-4 text-white"
                >
                  Kick User
                </button>
              </div>

              <button
                onClick={gambleSecretLinks}
                className="mt-4 mr-3 rounded-lg bg-purple-700 px-5 py-3 text-white"
              >
                Secret Links
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="mt-4 mr-3 rounded-lg bg-black px-5 py-3 text-white"
              >
                Dark Mode
              </button>

              <button
                onClick={() => setPartyMode(!partyMode)}
                className="mt-4 mr-3 rounded-lg bg-pink-600 px-5 py-3 text-white"
              >
                Party Mode
              </button>

              <button
                onClick={() => setSiteLocked(!siteLocked)}
                className="mt-4 mr-3 rounded-lg bg-red-700 px-5 py-3 text-white"
              >
                Lock Site
              </button>

              <button
                onClick={randomFeaturedGame}
                className="mt-4 mr-3 rounded-lg bg-blue-700 px-5 py-3 text-white"
              >
                Random Featured Game
              </button>

              <button
                onClick={randomFeaturedApp}
                className="mt-4 rounded-lg bg-indigo-700 px-5 py-3 text-white"
              >
                Featured App
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
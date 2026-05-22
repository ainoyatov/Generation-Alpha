"use client"

import { useEffect, useMemo, useState } from "react"

import AdminPanel from "./components/AdminPanel"
import UserLogin from "./components/UserLogin"
import WebsiteCard from "./components/WebsiteCard"

import {
  defaultTitle,
  secretApps,
  secretWebsites,
  sections,
} from "./data"

import {
  BugReport,
  PrivateMessage,
  Website,
} from "./types"

export default function HomePage() {
  const [username, setUsername] = useState("")
  const [savedUsername, setSavedUsername] = useState("")
  const [showSavedLogin, setShowSavedLogin] = useState(false)

  const [tempUsername, setTempUsername] = useState("")
  const [tempPassword, setTempPassword] = useState("")
  const [showUserPopup, setShowUserPopup] = useState(false)
  const [userMessage, setUserMessage] = useState("")
  const [userList, setUserList] = useState<string[]>([])

  const [passcode, setPasscode] = useState("")
  const [adminUnlocked, setAdminUnlocked] = useState(false)
  const [adminError, setAdminError] = useState("")

  const [announcementInput, setAnnouncementInput] = useState("")
  const [announcement, setAnnouncement] = useState("")

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
  const [showSuggestions, setShowSuggestions] = useState(true)

  const [favorites, setFavorites] = useState<string[]>([])
  const [bugReports, setBugReports] = useState<BugReport[]>([])
  const [privateMessages, setPrivateMessages] = useState<PrivateMessage[]>([])
  const [reportingWebsite, setReportingWebsite] = useState<Website | null>(null)
  const [bugReason, setBugReason] = useState("")

  const [showProfile, setShowProfile] = useState(false)
  const [showAdminBadge, setShowAdminBadge] = useState(false)
  const [showUserStatus, setShowUserStatus] = useState(false)
  const [showTrendingApps, setShowTrendingApps] = useState(false)
  const [themeMode, setThemeMode] = useState("default")
  const [showComments, setShowComments] = useState(false)
  const [showRecentlyVisited, setShowRecentlyVisited] = useState(false)

  const [recentlyVisited, setRecentlyVisited] = useState<string[]>([])
  const [comments, setComments] = useState<string[]>([])
  const [commentInput, setCommentInput] = useState("")

  const allWebsites = useMemo(
    () => sections.flatMap((section) => section.websites),
    []
  )

  const filteredSuggestions = allWebsites.filter((website) =>
    website.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const myPrivateMessages = privateMessages.filter(
    (message) => message.to === username
  )

  const trendingApps = allWebsites.filter((website) =>
    favorites.includes(website.name)
  )

  useEffect(() => {
    const savedUser = localStorage.getItem("generationAlphaUsername")
    const savedUsers = localStorage.getItem("generationAlphaUsers")
    const savedFavorites = localStorage.getItem("generationAlphaFavorites")
    const savedBugReports = localStorage.getItem("generationAlphaBugReports")
    const savedPrivateMessages = localStorage.getItem("generationAlphaPrivateMessages")
    const savedRecentlyVisited = localStorage.getItem("generationAlphaRecentlyVisited")
    const savedComments = localStorage.getItem("generationAlphaComments")

    if (savedUsers) setUserList(JSON.parse(savedUsers))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedBugReports) setBugReports(JSON.parse(savedBugReports))
    if (savedPrivateMessages) setPrivateMessages(JSON.parse(savedPrivateMessages))
    if (savedRecentlyVisited) setRecentlyVisited(JSON.parse(savedRecentlyVisited))
    if (savedComments) setComments(JSON.parse(savedComments))

    if (savedUser) {
      setSavedUsername(savedUser)
      setShowSavedLogin(true)
    } else {
      setShowUserPopup(true)
    }
  }, [])

  function continueSavedLogin() {
    setUsername(savedUsername)
    setShowSavedLogin(false)
  }

  function createDifferentUser() {
    localStorage.removeItem("generationAlphaUsername")
    localStorage.removeItem("generationAlphaPassword")

    setUsername("")
    setSavedUsername("")
    setTempUsername("")
    setTempPassword("")
    setShowSavedLogin(false)
    setShowUserPopup(true)
  }

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

    setTimeout(() => {
      setAnnouncement("")
    }, 5000)
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

  function kickUser() {
    if (!kickUsername.trim()) return

    const updatedUsers = userList.filter((user) => user !== kickUsername)

    localStorage.setItem("generationAlphaUsers", JSON.stringify(updatedUsers))
    setUserList(updatedUsers)

    if (username === kickUsername) {
      localStorage.removeItem("generationAlphaUsername")
      localStorage.removeItem("generationAlphaPassword")
      setUsername("")
      setShowUserPopup(true)
    }

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
      alert("Please give a reason.")
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

  function dismissBugReport(reportId: number) {
    const updatedReports = bugReports.filter((report) => report.id !== reportId)

    localStorage.setItem("generationAlphaBugReports", JSON.stringify(updatedReports))
    setBugReports(updatedReports)
  }

  function dismissPrivateMessage(messageId: number) {
    const updatedMessages = privateMessages.filter(
      (message) => message.id !== messageId
    )

    localStorage.setItem("generationAlphaPrivateMessages", JSON.stringify(updatedMessages))
    setPrivateMessages(updatedMessages)
  }

  function cycleTheme() {
    if (themeMode === "default") setThemeMode("neon")
    else if (themeMode === "neon") setThemeMode("galaxy")
    else if (themeMode === "galaxy") setThemeMode("matrix")
    else setThemeMode("default")
  }

  function visitWebsite(website: Website) {
    const updatedVisited = [
      website.name,
      ...recentlyVisited.filter((item) => item !== website.name),
    ].slice(0, 8)

    localStorage.setItem("generationAlphaRecentlyVisited", JSON.stringify(updatedVisited))
    setRecentlyVisited(updatedVisited)
  }

  function addComment() {
    if (!commentInput.trim()) return

    const newComment = `@${username || "Unknown"}: ${commentInput}`
    const updatedComments = [newComment, ...comments]

    localStorage.setItem("generationAlphaComments", JSON.stringify(updatedComments))
    setComments(updatedComments)
    setCommentInput("")
  }

  const backgroundClass =
    themeMode === "neon"
      ? "bg-gradient-to-br from-black via-purple-950 to-black text-white"
      : themeMode === "galaxy"
      ? "bg-gradient-to-br from-indigo-950 via-black to-purple-950 text-white"
      : themeMode === "matrix"
      ? "bg-black text-green-400"
      : darkMode
      ? "bg-black text-white"
      : partyMode
      ? "bg-gradient-to-br from-pink-300 via-yellow-200 to-blue-300"
      : "bg-gradient-to-b from-green-100 to-white"

  return (
    <main className={`min-h-screen px-6 py-12 ${backgroundClass}`}>
      <section className="mx-auto max-w-7xl">
        <UserLogin
          username={username}
          savedUsername={savedUsername}
          tempUsername={tempUsername}
          tempPassword={tempPassword}
          showSavedLogin={showSavedLogin}
          showUserPopup={showUserPopup}
          userMessage={userMessage}
          setTempUsername={setTempUsername}
          setTempPassword={setTempPassword}
          continueSavedLogin={continueSavedLogin}
          createDifferentUser={createDifferentUser}
          createUser={createUser}
        />

        {myPrivateMessages.length > 0 && (
          <div className="fixed right-4 top-4 z-[90] w-[90%] max-w-sm rounded-2xl bg-blue-100 p-4 text-blue-900 shadow-2xl">
            <h2 className="text-xl font-black">Private Messages</h2>

            <div className="mt-3 space-y-3">
              {myPrivateMessages.map((message) => (
                <div key={message.id} className="rounded-xl bg-white p-4 shadow">
                  <p>{message.message}</p>

                  <button
                    onClick={() => dismissPrivateMessage(message.id)}
                    className="mt-3 rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white"
                  >
                    Delete Message
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <h1 className="text-center text-5xl font-black text-green-900 sm:text-6xl">
          {showAdminBadge && adminUnlocked ? "👑 " : ""}
          {defaultTitle}
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-center text-lg font-medium text-green-800">
          Generation Alpha is your custom portal for games, apps, school tools,
          editing tools, fun websites, favorites, bug reports, and admin-powered features.
        </p>

        {announcement && (
          <div className="fixed left-1/2 top-6 z-[80] w-[90%] max-w-4xl -translate-x-1/2 text-center text-3xl font-black text-red-700 drop-shadow-lg">
            {announcement}
          </div>
        )}

        <div className="relative mt-10">
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setShowSuggestions(true)
            }}
            placeholder="Search apps, games, websites..."
            className="w-full rounded-xl border p-4 text-black"
          />

          {showSuggestions && searchTerm && (
            <div className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-xl bg-white shadow-2xl">
              {filteredSuggestions.slice(0, 8).map((website) => (
                <button
                  key={website.name}
                  onClick={() => {
                    setSearchTerm(website.name)
                    setShowSuggestions(false)
                  }}
                  className="block w-full border-b px-4 py-3 text-left text-black hover:bg-green-100"
                >
                  {website.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {siteLocked ? (
          <div className="mt-16 rounded-2xl bg-red-100 p-8 text-center text-red-900 shadow-xl">
            <h2 className="text-4xl font-black">Site Locked</h2>
            <p className="mt-3 text-xl">Admin locked the website.</p>
          </div>
        ) : (
          sections.map((section) => (
            <div key={section.title} className="mt-16">
              <h2 className="mb-6 text-4xl font-bold text-green-900">
                {section.title}
              </h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {section.websites
                  .filter((website) =>
                    website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    website.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((website) => (
                    <WebsiteCard
                      key={website.name}
                      website={website}
                      favorites={favorites}
                      onToggleFavorite={toggleFavorite}
                      onReportBug={openBugReport}
                      onVisit={visitWebsite}
                    />
                  ))}
              </div>
            </div>
          ))
        )}

        <div className="mt-20 space-y-10">
          {showProfile && (
            <div className="rounded-2xl bg-white p-6 text-green-900 shadow-xl">
              <h2 className="text-3xl font-bold">User Profile</h2>
              <p className="mt-3">Username: @{username || "Not logged in"}</p>
              <p>Favorites: {favorites.length}</p>
              <p>
                Reports sent:{" "}
                {bugReports.filter((report) => report.reporter === username).length}
              </p>
            </div>
          )}

          {showUserStatus && adminUnlocked && (
            <div className="rounded-2xl bg-white p-6 text-green-900 shadow-xl">
              <h2 className="text-3xl font-bold">Admin-Only User Status</h2>
              <p className="mt-3">@{username || "Unknown"} is Online</p>
              <p>Idle status: Active now</p>
            </div>
          )}

          {showTrendingApps && (
            <div className="rounded-2xl bg-white p-6 text-green-900 shadow-xl">
              <h2 className="text-3xl font-bold">Trending Apps</h2>
              {trendingApps.length === 0 ? (
                <p className="mt-3">Favorite apps to make them trend.</p>
              ) : (
                <ul className="mt-3 list-disc pl-6">
                  {trendingApps.map((app) => (
                    <li key={app.name}>{app.name}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {showRecentlyVisited && (
            <div className="rounded-2xl bg-white p-6 text-green-900 shadow-xl">
              <h2 className="text-3xl font-bold">Recently Visited</h2>
              {recentlyVisited.length === 0 ? (
                <p className="mt-3">No visits yet.</p>
              ) : (
                <ul className="mt-3 list-disc pl-6">
                  {recentlyVisited.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {featuredGame && (
            <div className="rounded-2xl bg-white p-6 text-green-900 shadow-xl">
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
            <div className="rounded-2xl bg-white p-6 text-blue-900 shadow-xl">
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

          {showComments && (
            <div className="rounded-2xl bg-white p-6 text-green-900 shadow-xl">
              <h2 className="text-3xl font-bold">Comments</h2>

              <div className="mt-4 flex gap-3">
                <input
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 rounded-lg border p-4 text-black"
                />

                <button
                  onClick={addComment}
                  className="rounded-lg bg-green-900 px-6 py-4 text-white"
                >
                  Post
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {comments.map((comment, index) => (
                  <p key={index} className="rounded-lg bg-green-100 p-3">
                    {comment}
                  </p>
                ))}
              </div>
            </div>
          )}

          {showSecretLinks && (
            <div>
              <h2 className="mb-6 text-4xl font-bold text-purple-700">
                Secret Links
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                <WebsiteCard
                  website={secretApp}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  onReportBug={openBugReport}
                  onVisit={visitWebsite}
                />

                <WebsiteCard
                  website={secretWebsite}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  onReportBug={openBugReport}
                  onVisit={visitWebsite}
                />
              </div>
            </div>
          )}
        </div>

        {reportingWebsite && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-black">
              <h2 className="text-3xl font-black">Report Bug</h2>

              <p className="mt-3">
                What is wrong with {reportingWebsite.name}?
              </p>

              <textarea
                value={bugReason}
                onChange={(e) => setBugReason(e.target.value)}
                placeholder="Give a reason..."
                className="mt-6 h-32 w-full rounded-lg border p-4"
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

        <AdminPanel
          username={username}
          passcode={passcode}
          adminUnlocked={adminUnlocked}
          adminError={adminError}
          userList={userList}
          bugReports={bugReports}
          announcementInput={announcementInput}
          kickUsername={kickUsername}
          setPasscode={setPasscode}
          setAnnouncementInput={setAnnouncementInput}
          setKickUsername={setKickUsername}
          unlockAdmin={unlockAdmin}
          sendAnnouncement={sendAnnouncement}
          kickUser={kickUser}
          gambleSecretLinks={gambleSecretLinks}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          togglePartyMode={() => setPartyMode(!partyMode)}
          toggleSiteLocked={() => setSiteLocked(!siteLocked)}
          randomFeaturedGame={randomFeaturedGame}
          randomFeaturedApp={randomFeaturedApp}
          acceptBugReport={acceptBugReport}
          dismissBugReport={dismissBugReport}
          toggleProfile={() => setShowProfile(!showProfile)}
          toggleAdminBadge={() => setShowAdminBadge(!showAdminBadge)}
          toggleUserStatus={() => setShowUserStatus(!showUserStatus)}
          toggleTrendingApps={() => setShowTrendingApps(!showTrendingApps)}
          cycleTheme={cycleTheme}
          toggleComments={() => setShowComments(!showComments)}
          toggleRecentlyVisited={() => setShowRecentlyVisited(!showRecentlyVisited)}
          toggleSearchSuggestions={() => setShowSuggestions(!showSuggestions)}
        />
      </section>
    </main>
  )
}
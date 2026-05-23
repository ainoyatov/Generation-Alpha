"use client"

import { useEffect, useMemo, useState } from "react"

import AdminPanel from "./components/AdminPanel"
import MiniGames from "./components/MiniGames"
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

  const [kickUsername, setKickUsername] = useState("")
  const [creditUsername, setCreditUsername] = useState("")
  const [creditAmount, setCreditAmount] = useState("")
  const [removeUsername, setRemoveUsername] = useState("")
  const [removeAmount, setRemoveAmount] = useState("")
  const [unlockAllUsername, setUnlockAllUsername] = useState("")

  const [favorites, setFavorites] = useState<string[]>([])
  const [unlockedItems, setUnlockedItems] = useState<string[]>([])
  const [bugReports, setBugReports] = useState<BugReport[]>([])
  const [privateMessages, setPrivateMessages] = useState<PrivateMessage[]>([])

  const [reportingWebsite, setReportingWebsite] = useState<Website | null>(null)
  const [bugReason, setBugReason] = useState("")

  const [showMiniGames, setShowMiniGames] = useState(true)
  const [userPoints, setUserPoints] = useState(0)

  const [searchTerm, setSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)

  const [darkMode, setDarkMode] = useState(false)
  const [partyMode, setPartyMode] = useState(false)
  const [siteLocked, setSiteLocked] = useState(false)

  const [showProfile, setShowProfile] = useState(false)
  const [showAdminBadge, setShowAdminBadge] = useState(false)
  const [showUserStatus, setShowUserStatus] = useState(false)
  const [showTrendingApps, setShowTrendingApps] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showRecentlyVisited, setShowRecentlyVisited] = useState(false)

  const [showActivity, setShowActivity] = useState(false)
  const [activityLog, setActivityLog] = useState<string[]>([])
  const [globalChatCommands, setGlobalChatCommands] = useState(false)

  const [themeMode, setThemeMode] = useState("default")

  const [featuredGame, setFeaturedGame] = useState<Website | null>(null)
  const [featuredApp, setFeaturedApp] = useState<Website | null>(null)

  const [showSecretLinks, setShowSecretLinks] = useState(false)
  const [secretApp, setSecretApp] = useState<Website>(secretApps[0])
  const [secretWebsite, setSecretWebsite] = useState<Website>(secretWebsites[0])

  const allWebsites = useMemo(
    () => sections.flatMap((section) => section.websites),
    []
  )

  const filteredSuggestions = allWebsites.filter((website) =>
    website.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const savedUser = localStorage.getItem("generationAlphaUsername")
    const savedUsers = localStorage.getItem("generationAlphaUsers")
    const savedFavorites = localStorage.getItem("generationAlphaFavorites")
    const savedUnlocked = localStorage.getItem("generationAlphaUnlockedItems")
    const savedBugReports = localStorage.getItem("generationAlphaBugReports")
    const savedPrivateMessages = localStorage.getItem("generationAlphaPrivateMessages")
    const savedPoints = localStorage.getItem("generationAlphaUserPoints")

    if (savedUsers) setUserList(JSON.parse(savedUsers))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedUnlocked) setUnlockedItems(JSON.parse(savedUnlocked))
    if (savedBugReports) setBugReports(JSON.parse(savedBugReports))
    if (savedPrivateMessages) setPrivateMessages(JSON.parse(savedPrivateMessages))
    if (savedPoints) setUserPoints(Number(savedPoints))

    if (savedUser) {
      setSavedUsername(savedUser)
      setShowSavedLogin(true)
    } else {
      setShowUserPopup(true)
    }
  }, [])

  function addActivity(text: string) {
    setActivityLog((prev) => [
      `${new Date().toLocaleTimeString()} - ${text}`,
      ...prev,
    ])
  }

  function continueSavedLogin() {
    const userSpecificUnlocked = localStorage.getItem(
      `generationAlphaUnlockedItems_${savedUsername}`
    )

    if (userSpecificUnlocked) {
      setUnlockedItems(JSON.parse(userSpecificUnlocked))
      localStorage.setItem("generationAlphaUnlockedItems", userSpecificUnlocked)
    }

    setUsername(savedUsername)
    setShowSavedLogin(false)
    addActivity(`${savedUsername} logged in`)
  }

  function createDifferentUser() {
    localStorage.removeItem("generationAlphaUsername")
    setShowSavedLogin(false)
    setShowUserPopup(true)
  }

  function createUser() {
    if (!tempUsername.trim()) return
    if (!tempPassword.trim()) return

    const updatedUsers = [...new Set([...userList, tempUsername])]

    localStorage.setItem("generationAlphaUsername", tempUsername)
    localStorage.setItem("generationAlphaUsers", JSON.stringify(updatedUsers))

    setUserList(updatedUsers)
    setUsername(tempUsername)
    setShowUserPopup(false)
    addActivity(`${tempUsername} created account`)
  }

  function unlockAdmin() {
    if (passcode === "5494") {
      setAdminUnlocked(true)
      setAdminError("")
      addActivity(`${username || "Unknown"} unlocked admin`)
    } else {
      setAdminError("Wrong password")
    }
  }

  function addUserPoints(points: number) {
    const updatedPoints = userPoints + points

    localStorage.setItem("generationAlphaUserPoints", String(updatedPoints))
    setUserPoints(updatedPoints)
  }

  function giveCredits() {
    const amount = Number(creditAmount)

    if (!creditUsername.trim()) {
      alert("Enter username")
      return
    }

    if (!amount || amount <= 0) {
      alert("Invalid amount")
      return
    }

    const updatedPoints = userPoints + amount

    localStorage.setItem("generationAlphaUserPoints", String(updatedPoints))
    setUserPoints(updatedPoints)

    addActivity(`Admin gave ${amount} UserPoints to ${creditUsername}`)

    setCreditUsername("")
    setCreditAmount("")
  }

  function removeCredits() {
    const amount = Number(removeAmount)

    if (!removeUsername.trim()) {
      alert("Enter username")
      return
    }

    if (!amount || amount <= 0) {
      alert("Invalid amount")
      return
    }

    const updatedPoints = Math.max(0, userPoints - amount)

    localStorage.setItem("generationAlphaUserPoints", String(updatedPoints))
    setUserPoints(updatedPoints)

    addActivity(`Admin removed ${amount} UserPoints from ${removeUsername}`)

    setRemoveUsername("")
    setRemoveAmount("")
  }

  function unlockEverythingForUser() {
    const targetUsername = unlockAllUsername.trim()

    if (!targetUsername) {
      alert("Enter username")
      return
    }

    const allUnlockNames = [
      ...sections.flatMap((section) =>
        section.websites.map((website) => website.name)
      ),
      ...secretApps.map((website) => website.name),
      ...secretWebsites.map((website) => website.name),
    ]

    localStorage.setItem(
      `generationAlphaUnlockedItems_${targetUsername}`,
      JSON.stringify(allUnlockNames)
    )

    if (targetUsername === username) {
      localStorage.setItem(
        "generationAlphaUnlockedItems",
        JSON.stringify(allUnlockNames)
      )

      setUnlockedItems(allUnlockNames)
    }

    addActivity(`Admin unlocked everything for ${targetUsername}`)
    alert(`Unlocked every app and website for @${targetUsername}`)

    setUnlockAllUsername("")
  }

  function unlockWebsite(website: Website) {
    const cost = website.cost ?? 0

    if (unlockedItems.includes(website.name)) return

    if (userPoints < cost) {
      alert(`You need ${cost.toLocaleString()} UserPoints`)
      return
    }

    const updatedPoints = userPoints - cost
    const updatedUnlocked = [...unlockedItems, website.name]

    localStorage.setItem("generationAlphaUserPoints", String(updatedPoints))
    localStorage.setItem("generationAlphaUnlockedItems", JSON.stringify(updatedUnlocked))

    setUserPoints(updatedPoints)
    setUnlockedItems(updatedUnlocked)

    addActivity(`${username} unlocked ${website.name}`)
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

    const newReport: BugReport = {
      id: Date.now(),
      websiteName: reportingWebsite.name,
      reporter: username,
      reason: bugReason,
      status: "Pending",
    }

    const updatedReports = [...bugReports, newReport]

    localStorage.setItem("generationAlphaBugReports", JSON.stringify(updatedReports))
    setBugReports(updatedReports)

    setReportingWebsite(null)
    setBugReason("")
  }

  function acceptBugReport(report: BugReport) {
    const updatedMessages = [
      ...privateMessages,
      {
        id: Date.now(),
        to: report.reporter,
        message: `Bug for ${report.websiteName} accepted.`,
      },
    ]

    localStorage.setItem("generationAlphaPrivateMessages", JSON.stringify(updatedMessages))
    setPrivateMessages(updatedMessages)
    addActivity(`Admin accepted bug report for ${report.websiteName}`)
  }

  function dismissBugReport(reportId: number) {
    const updated = bugReports.filter((report) => report.id !== reportId)

    localStorage.setItem("generationAlphaBugReports", JSON.stringify(updated))
    setBugReports(updated)
  }

  function sendAnnouncement() {
    setAnnouncement(announcementInput)
    addActivity(`Admin sent announcement: ${announcementInput}`)

    setTimeout(() => {
      setAnnouncement("")
    }, 5000)
  }

  function kickUser() {
    addActivity(`Admin kicked ${kickUsername}`)
    alert(`Kicked ${kickUsername}`)
  }

  function gambleSecretLinks() {
    const randomApp = secretApps[Math.floor(Math.random() * secretApps.length)]
    const randomWebsite = secretWebsites[Math.floor(Math.random() * secretWebsites.length)]

    setSecretApp(randomApp)
    setSecretWebsite(randomWebsite)
    setShowSecretLinks(!showSecretLinks)
  }

  function cycleTheme() {
    setThemeMode(themeMode === "default" ? "dark" : "default")
  }

  const backgroundClass =
    darkMode || themeMode === "dark"
      ? "bg-black text-white"
      : partyMode
      ? "bg-gradient-to-br from-pink-300 via-yellow-200 to-blue-300"
      : "bg-gradient-to-b from-green-100 to-white"

  return (
    <main className={`min-h-screen px-6 py-12 ${backgroundClass}`}>
      <div className="fixed left-4 top-4 z-50 rounded-lg bg-white px-5 py-3 font-black text-green-900 shadow-xl">
        UserPoints: {userPoints.toLocaleString()}
      </div>

      <div className="fixed right-4 top-4 z-50">
        <button
          onClick={() => setShowMiniGames(!showMiniGames)}
          className="rounded-lg bg-green-900 px-5 py-3 font-bold text-white"
        >
          {showMiniGames ? "Close Mini Games" : "Open Mini Games"}
        </button>
      </div>

      {showMiniGames && <MiniGames onAddPoints={addUserPoints} />}

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

        <h1 className="text-center text-6xl font-black text-green-900">
          {showAdminBadge ? "👑 " : ""}
          {defaultTitle}
        </h1>

        {announcement && (
          <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 text-3xl font-black text-red-700">
            {announcement}
          </div>
        )}

        <div className="relative mt-10">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-xl border p-4 text-black"
          />

          {showSuggestions && searchTerm && (
            <div className="absolute z-50 mt-2 w-full rounded-xl bg-white shadow-2xl">
              {filteredSuggestions.map((website) => (
                <button
                  key={website.name}
                  onClick={() => setSearchTerm(website.name)}
                  className="block w-full border-b px-4 py-3 text-left text-black hover:bg-green-100"
                >
                  {website.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {!siteLocked &&
          sections.map((section) => (
            <div key={section.title} className="mt-16">
              <h2 className="mb-6 text-4xl font-bold text-green-900">
                {section.title}
              </h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {section.websites.map((website) => (
                  <WebsiteCard
                    key={website.name}
                    website={website}
                    favorites={favorites}
                    unlockedItems={unlockedItems}
                    userPoints={userPoints}
                    onToggleFavorite={toggleFavorite}
                    onReportBug={openBugReport}
                    onVisit={() => {}}
                    onUnlock={unlockWebsite}
                  />
                ))}
              </div>
            </div>
          ))}

        {showSecretLinks && (
          <div className="mt-16">
            <h2 className="mb-6 text-4xl font-bold text-purple-700">
              Secret Apps & Websites
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <WebsiteCard
                website={secretApp}
                favorites={favorites}
                unlockedItems={unlockedItems}
                userPoints={userPoints}
                onToggleFavorite={toggleFavorite}
                onReportBug={openBugReport}
                onVisit={() => {}}
                onUnlock={unlockWebsite}
              />

              <WebsiteCard
                website={secretWebsite}
                favorites={favorites}
                unlockedItems={unlockedItems}
                userPoints={userPoints}
                onToggleFavorite={toggleFavorite}
                onReportBug={openBugReport}
                onVisit={() => {}}
                onUnlock={unlockWebsite}
              />
            </div>
          </div>
        )}

        {showActivity && (
          <div className="mt-16 rounded-2xl bg-white p-6 text-black shadow-xl">
            <h2 className="text-3xl font-black">Active User Activity</h2>

            <div className="mt-4 space-y-2">
              {activityLog.map((activity, index) => (
                <div key={index} className="rounded-lg bg-green-100 p-3">
                  {activity}
                </div>
              ))}
            </div>
          </div>
        )}

        {globalChatCommands && (
          <div className="mt-16 rounded-2xl bg-white p-6 text-black shadow-xl">
            <h2 className="text-3xl font-black">Global Chat Commands</h2>

            <div className="mt-4 space-y-3 font-bold">
              <div>/help</div>
              <div>/admin</div>
              <div>/credits</div>
              <div>/unlock</div>
              <div>/online</div>
              <div>/report</div>
            </div>
          </div>
        )}

        {reportingWebsite && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-black">
              <h2 className="text-3xl font-black">Report Bug</h2>

              <p className="mt-3">Report issue for {reportingWebsite.name}</p>

              <textarea
                value={bugReason}
                onChange={(e) => setBugReason(e.target.value)}
                placeholder="Describe the bug..."
                className="mt-6 h-32 w-full rounded-lg border p-4"
              />

              <button
                onClick={submitBugReport}
                className="mt-4 w-full rounded-lg bg-red-700 px-6 py-3 text-white"
              >
                Submit Report
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
          creditUsername={creditUsername}
          creditAmount={creditAmount}
          removeUsername={removeUsername}
          removeAmount={removeAmount}
          unlockAllUsername={unlockAllUsername}
          setPasscode={setPasscode}
          setAnnouncementInput={setAnnouncementInput}
          setKickUsername={setKickUsername}
          setCreditUsername={setCreditUsername}
          setCreditAmount={setCreditAmount}
          setRemoveUsername={setRemoveUsername}
          setRemoveAmount={setRemoveAmount}
          setUnlockAllUsername={setUnlockAllUsername}
          unlockAdmin={unlockAdmin}
          sendAnnouncement={sendAnnouncement}
          kickUser={kickUser}
          giveCredits={giveCredits}
          removeCredits={removeCredits}
          unlockEverythingForUser={unlockEverythingForUser}
          gambleSecretLinks={gambleSecretLinks}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          togglePartyMode={() => setPartyMode(!partyMode)}
          toggleSiteLocked={() => setSiteLocked(!siteLocked)}
          randomFeaturedGame={() => setShowActivity(!showActivity)}
          randomFeaturedApp={() => setGlobalChatCommands(!globalChatCommands)}
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
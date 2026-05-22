"use client"

import { BugReport } from "../types"

type Props = {
  username: string
  passcode: string
  adminUnlocked: boolean
  adminError: string
  userList: string[]
  bugReports: BugReport[]
  announcementInput: string
  kickUsername: string
  setPasscode: (value: string) => void
  setAnnouncementInput: (value: string) => void
  setKickUsername: (value: string) => void
  unlockAdmin: () => void
  sendAnnouncement: () => void
  kickUser: () => void
  gambleSecretLinks: () => void
  toggleDarkMode: () => void
  togglePartyMode: () => void
  toggleSiteLocked: () => void
  randomFeaturedGame: () => void
  randomFeaturedApp: () => void
  acceptBugReport: (report: BugReport) => void
  dismissBugReport: (reportId: number) => void
  toggleProfile: () => void
  toggleAdminBadge: () => void
  toggleUserStatus: () => void
  toggleTrendingApps: () => void
  cycleTheme: () => void
  toggleComments: () => void
  toggleRecentlyVisited: () => void
  toggleSearchSuggestions: () => void
}

export default function AdminPanel({
  username,
  passcode,
  adminUnlocked,
  adminError,
  userList,
  bugReports,
  announcementInput,
  kickUsername,
  setPasscode,
  setAnnouncementInput,
  setKickUsername,
  unlockAdmin,
  sendAnnouncement,
  kickUser,
  gambleSecretLinks,
  toggleDarkMode,
  togglePartyMode,
  toggleSiteLocked,
  randomFeaturedGame,
  randomFeaturedApp,
  acceptBugReport,
  dismissBugReport,
  toggleProfile,
  toggleAdminBadge,
  toggleUserStatus,
  toggleTrendingApps,
  cycleTheme,
  toggleComments,
  toggleRecentlyVisited,
  toggleSearchSuggestions,
}: Props) {
  return (
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
            Logged in as: @{username || "admin"}
          </p>

          <div className="mt-6 rounded-xl bg-purple-50 p-4 text-purple-900">
            <h3 className="text-xl font-bold">Admin Perks</h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <button onClick={toggleProfile} className="rounded-lg bg-purple-700 px-4 py-3 font-bold text-white">
                User Profile
              </button>

              <button onClick={toggleAdminBadge} className="rounded-lg bg-yellow-600 px-4 py-3 font-bold text-white">
                Admin Badge
              </button>

              <button onClick={toggleUserStatus} className="rounded-lg bg-green-700 px-4 py-3 font-bold text-white">
                Online / Idle Status
              </button>

              <button onClick={toggleTrendingApps} className="rounded-lg bg-blue-700 px-4 py-3 font-bold text-white">
                Trending Apps
              </button>

              <button onClick={cycleTheme} className="rounded-lg bg-black px-4 py-3 font-bold text-white">
                Change Theme
              </button>

              <button onClick={toggleComments} className="rounded-lg bg-pink-700 px-4 py-3 font-bold text-white">
                Comments
              </button>

              <button onClick={randomFeaturedApp} className="rounded-lg bg-indigo-700 px-4 py-3 font-bold text-white">
                Featured App
              </button>

              <button onClick={randomFeaturedGame} className="rounded-lg bg-blue-900 px-4 py-3 font-bold text-white">
                Featured Game
              </button>

              <button onClick={toggleRecentlyVisited} className="rounded-lg bg-orange-700 px-4 py-3 font-bold text-white">
                Recently Visited
              </button>

              <button onClick={toggleSearchSuggestions} className="rounded-lg bg-teal-700 px-4 py-3 font-bold text-white">
                Search Suggestions
              </button>

              <button onClick={gambleSecretLinks} className="rounded-lg bg-purple-900 px-4 py-3 font-bold text-white">
                Secret Links
              </button>

              <button onClick={toggleDarkMode} className="rounded-lg bg-gray-900 px-4 py-3 font-bold text-white">
                Dark Mode
              </button>

              <button onClick={togglePartyMode} className="rounded-lg bg-pink-500 px-4 py-3 font-bold text-white">
                Party Mode
              </button>

              <button onClick={toggleSiteLocked} className="rounded-lg bg-red-700 px-4 py-3 font-bold text-white">
                Lock Site
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <input
              value={announcementInput}
              onChange={(e) => setAnnouncementInput(e.target.value)}
              placeholder="Global message..."
              className="flex-1 rounded-lg border p-4 text-black"
            />

            <button
              onClick={sendAnnouncement}
              className="rounded-lg bg-green-900 px-6 py-4 text-white"
            >
              Send
            </button>
          </div>

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
        </div>
      )}
    </div>
  )
}
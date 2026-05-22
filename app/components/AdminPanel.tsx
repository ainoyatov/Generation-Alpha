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

  creditUsername: string
  creditAmount: string

  removeUsername: string
  removeAmount: string

  setPasscode: (value: string) => void
  setAnnouncementInput: (value: string) => void
  setKickUsername: (value: string) => void

  setCreditUsername: (value: string) => void
  setCreditAmount: (value: string) => void

  setRemoveUsername: (value: string) => void
  setRemoveAmount: (value: string) => void

  unlockAdmin: () => void
  sendAnnouncement: () => void
  kickUser: () => void
  giveCredits: () => void
  removeCredits: () => void

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

  creditUsername,
  creditAmount,

  removeUsername,
  removeAmount,

  setPasscode,
  setAnnouncementInput,
  setKickUsername,

  setCreditUsername,
  setCreditAmount,

  setRemoveUsername,
  setRemoveAmount,

  unlockAdmin,
  sendAnnouncement,
  kickUser,
  giveCredits,
  removeCredits,

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
      <h2 className="text-3xl font-black text-green-900">
        Admin Panel
      </h2>

      {!adminUnlocked ? (
        <>
          <input
            type="password"
            value={passcode}
            onChange={(e) =>
              setPasscode(e.target.value)
            }
            placeholder="Enter admin password"
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
            Logged in as @{username}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <button
              onClick={toggleProfile}
              className="rounded-lg bg-purple-700 px-4 py-3 font-bold text-white"
            >
              Toggle Profile
            </button>

            <button
              onClick={toggleAdminBadge}
              className="rounded-lg bg-yellow-600 px-4 py-3 font-bold text-white"
            >
              Toggle Admin Badge
            </button>

            <button
              onClick={toggleUserStatus}
              className="rounded-lg bg-green-700 px-4 py-3 font-bold text-white"
            >
              User Status
            </button>

            <button
              onClick={toggleTrendingApps}
              className="rounded-lg bg-blue-700 px-4 py-3 font-bold text-white"
            >
              Trending Apps
            </button>

            <button
              onClick={cycleTheme}
              className="rounded-lg bg-black px-4 py-3 font-bold text-white"
            >
              Change Theme
            </button>

            <button
              onClick={toggleComments}
              className="rounded-lg bg-pink-700 px-4 py-3 font-bold text-white"
            >
              Comments
            </button>

            <button
              onClick={randomFeaturedApp}
              className="rounded-lg bg-indigo-700 px-4 py-3 font-bold text-white"
            >
              Featured App
            </button>

            <button
              onClick={randomFeaturedGame}
              className="rounded-lg bg-blue-900 px-4 py-3 font-bold text-white"
            >
              Featured Game
            </button>

            <button
              onClick={toggleRecentlyVisited}
              className="rounded-lg bg-orange-700 px-4 py-3 font-bold text-white"
            >
              Recently Visited
            </button>

            <button
              onClick={toggleSearchSuggestions}
              className="rounded-lg bg-teal-700 px-4 py-3 font-bold text-white"
            >
              Search Suggestions
            </button>

            <button
              onClick={gambleSecretLinks}
              className="rounded-lg bg-purple-900 px-4 py-3 font-bold text-white"
            >
              Secret Links
            </button>

            <button
              onClick={toggleDarkMode}
              className="rounded-lg bg-gray-900 px-4 py-3 font-bold text-white"
            >
              Dark Mode
            </button>

            <button
              onClick={togglePartyMode}
              className="rounded-lg bg-pink-500 px-4 py-3 font-bold text-white"
            >
              Party Mode
            </button>

            <button
              onClick={toggleSiteLocked}
              className="rounded-lg bg-red-700 px-4 py-3 font-bold text-white"
            >
              Lock Site
            </button>
          </div>

          <div className="mt-8 rounded-xl bg-yellow-50 p-4">
            <h3 className="text-2xl font-bold text-yellow-900">
              Give UserPoints
            </h3>

            <input
              value={creditUsername}
              onChange={(e) =>
                setCreditUsername(e.target.value)
              }
              placeholder="Username"
              className="mt-4 w-full rounded-lg border p-4 text-black"
            />

            <input
              value={creditAmount}
              onChange={(e) =>
                setCreditAmount(e.target.value)
              }
              placeholder="Amount"
              type="number"
              className="mt-4 w-full rounded-lg border p-4 text-black"
            />

            <button
              onClick={giveCredits}
              className="mt-4 w-full rounded-lg bg-yellow-600 px-6 py-4 font-bold text-white"
            >
              Give Credits
            </button>
          </div>

          <div className="mt-8 rounded-xl bg-red-50 p-4">
            <h3 className="text-2xl font-bold text-red-900">
              Remove UserPoints
            </h3>

            <input
              value={removeUsername}
              onChange={(e) =>
                setRemoveUsername(e.target.value)
              }
              placeholder="Username"
              className="mt-4 w-full rounded-lg border p-4 text-black"
            />

            <input
              value={removeAmount}
              onChange={(e) =>
                setRemoveAmount(e.target.value)
              }
              placeholder="Amount"
              type="number"
              className="mt-4 w-full rounded-lg border p-4 text-black"
            />

            <button
              onClick={removeCredits}
              className="mt-4 w-full rounded-lg bg-red-700 px-6 py-4 font-bold text-white"
            >
              Remove Credits
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
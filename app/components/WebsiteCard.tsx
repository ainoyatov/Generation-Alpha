"use client"

import { Website } from "../types"

type Props = {
  website: Website
  favorites: string[]
  unlockedItems: string[]
  userPoints: number
  onToggleFavorite: (name: string) => void
  onReportBug: (website: Website) => void
  onVisit: (website: Website) => void
  onUnlock: (website: Website) => void
}

export default function WebsiteCard({
  website,
  favorites,
  unlockedItems,
  userPoints,
  onToggleFavorite,
  onReportBug,
  onVisit,
  onUnlock,
}: Props) {
  const isFavorite = favorites.includes(website.name)
  const isUnlocked = unlockedItems.includes(website.name)
  const cost = website.cost ?? 0
  const canAfford = userPoints >= cost

  return (
    <div className="rounded-2xl bg-white p-6 text-green-900 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">
      <h3 className="text-3xl font-black">{website.name}</h3>

      <p className="mt-3 text-green-700">{website.description}</p>

      <div className="mt-4 rounded-lg bg-green-100 px-4 py-3 font-black">
        Cost: {cost.toLocaleString()} UserPoints
      </div>

      {isUnlocked ? (
        <a
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onVisit(website)}
          className="mt-4 block rounded-lg bg-green-900 px-6 py-3 text-center font-bold text-white"
        >
          Open
        </a>
      ) : (
        <button
          onClick={() => onUnlock(website)}
          disabled={!canAfford}
          className={`mt-4 w-full rounded-lg px-6 py-3 font-bold text-white ${
            canAfford ? "bg-blue-700 hover:bg-blue-800" : "cursor-not-allowed bg-gray-400"
          }`}
        >
          {canAfford ? `Unlock for ${cost.toLocaleString()}` : "Not Enough UserPoints"}
        </button>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onToggleFavorite(website.name)}
          className="rounded-lg bg-yellow-100 px-4 py-2 font-bold text-yellow-800"
        >
          {isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>

        <button
          onClick={() => onReportBug(website)}
          className="rounded-lg bg-red-100 px-4 py-2 font-bold text-red-700"
        >
          Report Bug
        </button>
      </div>
    </div>
  )
}
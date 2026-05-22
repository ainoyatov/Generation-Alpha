export type Website = {
  name: string
  url: string
  description: string
  cost?: number
}

export type BugReport = {
  id: number
  websiteName: string
  reason: string
  reporter: string
  status: "Pending" | "Accepted"
}

export type PrivateMessage = {
  id: number
  to: string
  message: string
}
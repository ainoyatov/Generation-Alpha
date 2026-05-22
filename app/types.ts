export type Website = {
  name: string
  url: string
  description: string
}

export type Section = {
  title: string
  websites: Website[]
}
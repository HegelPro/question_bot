export type LineCommands = 'weather' | 'help' | 'bot'

export const lineCommands: Record<LineCommands, string> = {
  help: '/help',
  bot: '/bot',
  weather: '/weather'
}

export const lineCommandKeys = Object.keys(lineCommands) as LineCommands[]

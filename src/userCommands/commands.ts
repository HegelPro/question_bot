export type UserCommands = 'quote' | 'bite'
export const userCommands: Record<UserCommands, string> = {
  quote: 'цитата',
  bite: 'кусь',
}
export const userCommandKeys = Object.keys(userCommands) as UserCommands[]
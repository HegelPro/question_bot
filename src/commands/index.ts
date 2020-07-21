type Commands = '/start' | '/help' | '/commands'

const commands: Record<Commands, Commands> = {
  '/start': '/start',
  '/help': '/help',
  '/commands': '/commands',
}

export default commands

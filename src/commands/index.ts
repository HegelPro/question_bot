type Commands = '/start' | '/help' | '/commands' | 'Начать' | '/photo'

const commands: Record<Commands, Commands> = {
  '/start': '/start',
  'Начать': 'Начать',
  '/help': '/help',
  '/commands': '/commands',
  '/photo': '/photo'
}

export default commands

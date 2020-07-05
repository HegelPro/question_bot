import * as Markup  from 'node-vk-bot-api/lib/markup';
import { LineCommands, lineCommands } from "./commands";
import { userCommands } from '../userCommands/commands';
import weatherCallback from './weater';

const commandsCallbacks: Record<LineCommands, ((ctx: any) => void)> = {
  help: (ctx) => {
    ctx.reply(`Список команд: \n${Object.keys(lineCommands).map(key => lineCommands[key]).join(', \n')}`)
  },
  bot: (ctx) => {
    ctx.reply('Выбирая команду', null, Markup.keyboard(Object.keys(userCommands).map(key => lineCommands[key])).oneTime());
  },
  weather: weatherCallback,
}

export default commandsCallbacks;

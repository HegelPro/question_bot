import randomArrayElement from "../../utils/randomArrayElement"

const users = [
  'Hegel Pro',
  'Виктор Соболев',
  'Павел Бугаенко',
]

const biteCallback = (ctx) => {
  ctx.reply(`${randomArrayElement(users)} был укушен сортирным змеем.`)
}

export default biteCallback;

import randomArrayElement from "../../utils/randomArrayElement"
import quotes from "./quotes"

const quoteCallback = (ctx) => {
  ctx.reply(randomArrayElement(quotes))
}

export default quoteCallback;

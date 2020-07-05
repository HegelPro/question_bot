import { UserCommands } from "./commands";
import quoteCallback from "./quote";
import biteCallback from "./bite";

const userCommandsCallbacks: Record<UserCommands, ((ctx) => void)> = {
  quote: quoteCallback,
  bite: biteCallback,
}

export default userCommandsCallbacks;

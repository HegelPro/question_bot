import {ConnectionState, VKBotState} from './types';
import {createConnect} from './connection'
import {createOn, createCommand, createAddEvent} from './events/messageEvents';

export default class Bot {
  private connectionState: ConnectionState = {
    server: undefined,
    key: undefined,
  }
  
  private eventState: VKBotState = {
    eventsHandlers: [],
  }

  private configState: {} = {}
  
  connect = createConnect(this.connectionState, this.eventState)

  on = createOn(this.eventState)

  command = createCommand(this.eventState)

  addEvent = createAddEvent(this.eventState)
}

export interface Payload<D> {
  type: string
  data: D
}

interface MetaData {
  payload?: Payload<any>
}

export type MessageParams = [number, number, number, number, string, MetaData, number]

export interface MessageEvent {
  message_id: number,
  unnoun_id: number,
  peer_id: number,
  date: number,
  text: string,
  metaData: MetaData,
  random_id: number,
}
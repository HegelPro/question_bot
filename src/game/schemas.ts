export interface SchemaMap {
  answer: string | null;
  text: string;
  photoUrl: string;
  routes: Record<number, SchemaMap>;
}

export interface SchemaRoute {
  answer: string | null;
  text: string;
  photoUrl: string;
  routes: string[];
}

export interface SchemaMap {
  id: string;
  answer: string | null;
  text: string;
  photoUrl: string;
  routes: Record<number, SchemaMap>;
}

export interface SchemaRoute {
  id: string;
  answer: string | null;
  text: string;
  photoUrl: string;
  routes: string[];
}

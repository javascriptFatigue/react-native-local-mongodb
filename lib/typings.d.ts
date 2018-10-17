declare module 'react-native-local-mongodb' {
  export interface Options {
    filename?: string;
    inMemoryOnly?: boolean;
    timestampData?: boolean;
    autoload?: boolean;
    onload?: Function;
    afterSerialization?: Function;
    beforeDeserialization?: Function;
    corruptAlertThreshold?: number;
    compareStrings?: Function;
  }

  export interface IndexOptions {
    fieldName: string;
    unique?: boolean;
    sparse?: boolean;
    expireAfterSeconds?: number;
  }

  export interface UpdateOptions {
    multi?: boolean;
    upsert?: boolean;
    returnUpdatedDocs?: boolean;
  }

  export interface RemoveOptions {
    multi?: boolean;
  }

  export interface Document {
    [key: string]: any;
  }

  export interface Cursor<T> {
    exec(): Promise<T>;
    exec(cb: Callback<T>): void;
    skip(value: number): Cursor<T>;
    limit(value: number): Cursor<T>;
    sort(doc: Document): Cursor<T>;
  }

  export type Query = any;
  export type Projection = any;
  export type Callback<T = void> = (err: Error | null, value: T) => void;
  export type InsertCallback = (err: Error | null, doc: Document) => void;
  export type CountCallback = (err: Error | null, count: number) => void;
  export type FindCallback = (err: Error | null, docs: Document[]) => void;
  export type FindOneCallback = (err: Error | null, doc: Document) => void;
  export type UpdateCallback = (
    err: Error | null,
    numAffected: number,
    affectedDocuments: Document | Document[] | null,
    upsert: boolean,
  ) => void;
  export type RemoveCallback = (err: Error | null, numAffected: number) => void;

  class Datastore {
    constructor(options?: Options);
    public loadDatabase(): void;
    public getAllData(): any[];
    public resetIndexes(newData: any): void;
    public ensureIndex(options: IndexOptions, callback?: Callback): void;
    public removeIndex(fieldName: string, callback?: Callback): void;
    public addToIndexes(doc: Document): void;
    public removeFromIndexes(doc: Document): void;
    public updateIndexes(oldDoc: Document, newDoc: Document): void;
    public getCandidates(query: Query, dontExpireStaleDocs: boolean, callback?: Callback): void;
    public insert(newDoc: Document, cb: InsertCallback): void;
    public createNewId(): number;
    public count(query: Query): Cursor<number>;
    public count(query: Query, callback: Callback<number>): void;
    public find(query: Query): Cursor<Document[]>;
    public find(query: Query, projection: Projection): Cursor<Document[]>;
    public find(query: Query, projection: Projection, callback: Callback<Document[]>): void;
    public findOne(query: Query): Cursor<Document>;
    public findOne(query: Query, projection: Projection): Cursor<Document>;
    public findOne(query: Query, projection: Projection, callback: Callback<Document>): void;
    public update(query: Query, doc: Document, options?: UpdateOptions, callback?: UpdateCallback): void;
    public remove(query: Query, options?: RemoveOptions, callback?: RemoveCallback): void;
    public loadDatabaseAsync(): Promise<void>;
    public findAsync(): Promise<Document[]>;
    public findOneAsync(): Promise<Document>;
    public insertAsync(): Promise<Document>;
    public updateAsync(): Promise<Document>;
    public removeAsync(): Promise<number>;
  }

  export default Datastore;
}

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
    unique: boolean;
    sparse: boolean;
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

  export type Query = any;
  export type Projection = any;
  export type Callback = (err: Error | null) => void;
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
    public count(query: Query, callback?: CountCallback): void;
    public find(query: Query, projection?: Projection, callback?: FindCallback): void;
    public findOne(query: Query, projection?: Projection, callback?: FindOneCallback): void;
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

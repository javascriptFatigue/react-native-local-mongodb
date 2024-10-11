declare module "react-native-local-mongodb" {
  export interface StorageStatic {
    getItem(
      key: string,
      callback?: (error?: Error, result?: string) => void
    ): Promise<string | null>;

    setItem(
      key: string,
      value: string,
      callback?: (error?: Error) => void
    ): Promise<void>;

    removeItem(key: string, callback?: (error?: Error) => void): Promise<void>;
  }

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
    storage: StorageStatic | AsyncStorageStatic;
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

  export interface MongoDocument {
    [key: string]: any;
  }

  export interface Cursor<T> {
    exec(): Promise<T>;

    exec(cb: Callback<T>): void;

    skip(value: number): Cursor<T>;

    limit(value: number): Cursor<T>;

    sort(doc: MongoDocument): Cursor<T>;
  }

  export type Query = object;
  export type Projection = any;
  export type Callback<T = void> = (err: Error | null, value: T) => void;
  export type InsertCallback = (err: Error | null, doc: MongoDocument) => void;
  export type CountCallback = (err: Error | null, count: number) => void;
  export type FindCallback = (err: Error | null, docs: MongoDocument[]) => void;
  export type FindOneCallback = (err: Error | null, doc: MongoDocument) => void;
  export type UpdateCallback = (
    err: Error | null,
    numAffected: number,
    affectedDocuments: MongoDocument | MongoDocument[] | null,
    upsert: boolean
  ) => void;
  export type RemoveCallback = (err: Error | null, numAffected: number) => void;

  export default class Datastore<T = MongoDocument> {
    constructor(options?: Options);
  
    public loadDatabase(): void;
  
    public getAllData(): T[];
  
    public resetIndexes(newData: T[]): void;
  
    public ensureIndex(options: IndexOptions, callback?: Callback): void;
  
    public removeIndex(fieldName: string, callback?: Callback): void;
  
    public addToIndexes(doc: T): void;
  
    public removeFromIndexes(doc: T): void;
  
    public updateIndexes(oldDoc: T, newDoc: T): void;
  
    public getCandidates(
      query: Query,
      dontExpireStaleDocs: boolean,
      callback?: Callback
    ): void;
  
    public insert(newDoc: T, cb: InsertCallback): void;
  
    public createNewId(): number;
  
    public count(query: Query): Cursor<number>;
    public count(query: Query, callback: Callback<number>): void;
  
    public find(query: Query): Cursor<T[]>;
    public find(query: Query, projection: Projection): Cursor<T[]>;
    public find(
      query: Query,
      projection: Projection,
      callback: Callback<T[]>
    ): void;
  
    public findOne(query: Query): Cursor<T>;
    public findOne(query: Query, projection: Projection): Cursor<T>;
    public findOne(
      query: Query,
      projection: Projection,
      callback: Callback<T>
    ): void;
  
    public update(
      query: Query,
      doc: T,
      options?: UpdateOptions,
      callback?: UpdateCallback
    ): void;
  
    public remove(
      query: Query,
      options?: RemoveOptions,
      callback?: RemoveCallback
    ): void;
  
    public loadDatabaseAsync(): Promise<void>;
  
    public findAsync(query: Query): Promise<T[]>;
  
    public findOneAsync(query: Query): Promise<T>;
  
    public insertAsync(newDoc: T): Promise<T>;
  
    public updateAsync(
      query: Query,
      doc: T,
      options?: UpdateOptions
    ): Promise<number>;
  
    public removeAsync(query: Query, options?: RemoveOptions): Promise<number>;
  }  
}

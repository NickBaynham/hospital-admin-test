import { MongoClient, ObjectId, type Db, type Document } from 'mongodb';

/**
 * Direct MongoDB access for database-layer assertions — confirming that values
 * written through the UI/API actually landed in the store with the right shape
 * and relationships.
 *
 * The compose file maps Mongo to host 27017; override with MONGO_URL when your
 * local container remapped (e.g. mongodb://localhost:27018).
 */
const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB ?? 'hospital_testing_target';

/** IDs (`_id`, and the relationship fields patient_id/doctor_id/department_id)
 *  are stored as ObjectId in Mongo but returned as strings by the API. */
export class DbClient {
  private constructor(
    private readonly client: MongoClient,
    readonly db: Db,
  ) {}

  static async connect(): Promise<DbClient> {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    return new DbClient(client, client.db(MONGO_DB));
  }

  async close(): Promise<void> {
    await this.client.close();
  }

  /** Find a document by its API id (string) in the given collection. */
  findById(collection: string, id: string): Promise<Document | null> {
    return this.db.collection(collection).findOne({ _id: new ObjectId(id) });
  }

  findOne(collection: string, query: Document): Promise<Document | null> {
    return this.db.collection(collection).findOne(query);
  }

  count(collection: string, query: Document = {}): Promise<number> {
    return this.db.collection(collection).countDocuments(query);
  }
}

/** Compare a stored ObjectId field to an API string id. */
export function idEquals(stored: unknown, apiId: string): boolean {
  return stored instanceof ObjectId && stored.toString() === apiId;
}

export { ObjectId };

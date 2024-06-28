// Utility type for MongoDB-style logical operators
type LogicalOperators<T> = {
  $and?: Array<QueryCondition<T>>;
  $or?: Array<QueryCondition<T>>;
  $nor?: Array<QueryCondition<T>>;
  $not?: QueryCondition<T>;
};

// Type for where conditions
type QueryCondition<T> = {
  [P in keyof T]?: T[P] | { [operator: string]: any };
} & LogicalOperators<T>;

// Recursive type for populate fields
type PopulateFields<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? true | {
        where?: QueryCondition<U>;
        populate?: PopulateFields<U>;
      }
    : true | {
        where?: QueryCondition<T[P]>;
        populate?: PopulateFields<T[P]>;
      };
};

// Define the generic QueryParams interface
export interface QueryParams<T> {
  sort?: string | string[];
  filters?: QueryCondition<T>;
  where?: QueryCondition<T>;
  populate?: PopulateFields<T>;
  fields?: (keyof T)[]; // Fields specific to T
  pagination?: {
    page?: number;
    pageSize: number;
  };
}

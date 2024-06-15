export interface QueryParams {
  sort?: string | string[];
  where?: {
    [key: string]: any;
  };
  filters?: {
    [key: string]: any;
  };
  populate?: string | string[];
  fields?: string | string[];
  pagination?: {
    page?: number;
    pageSize: number;
  };
}

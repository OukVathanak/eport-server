export interface QueryParams {
  sort?: string | string[];
  where?: {
    [key: string]: any;
  };
  filters?: {
    [key: string]: any;
  };
  populate?: any;
  fields?: string | string[];
  pagination?: {
    page?: number;
    pageSize: number;
  };
}

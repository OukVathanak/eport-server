import { Schema } from "joi";
import { Context } from "koa";

export class RequestHelper {
  context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  public getBody(schema: Schema): any {
    const requestBody = this.context.request.body;

    const { error } = schema.validate(requestBody);
    if (error) {
      this.context.throw(
        400,
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    }

    return requestBody;
  }

  public getParam(field: string): string {
    const param: string = this.context.params[field];
    return param;
  }

  public getQuery(field: string): string | null {
    const query: string | undefined = this.context.query[field];
    return query || null;
  }

  public getCurrentUser(): any {
    return this.context.state.user || null;
  }
}

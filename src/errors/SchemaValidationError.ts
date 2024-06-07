import { SchemaError } from "@/types/response";

class SchemaValidationError extends Error {
  public errors: SchemaError[];

  constructor(errors: SchemaError[]) {
    super("Schema validation error");
    this.errors = errors;
    // Set the prototype explicitly to maintain the instanceof functionality
    Object.setPrototypeOf(this, SchemaValidationError.prototype);
  }
}

export default SchemaValidationError;

import { GenericField } from "./campo-generico";

interface ConfigParams {
  page?: number;
  limit?: number;
  search?: string;
  field?: GenericField;
}

export { ConfigParams };

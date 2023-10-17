/** The default-exported function must have this type */
export type RawPolicy<Input, Data, Result> = (
  input: Input,
  data: Data,
) => { result: Result };

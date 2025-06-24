export type CountContext = { count: number }
export type NameContext = { name: string }
export type ErrorContext = { error?: string }
export type CounterContext = CountContext & NameContext & ErrorContext

export const initialContext: CounterContext = { count: 0, name: '' };


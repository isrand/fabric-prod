export class APITransactionResponse {
  public constructor(
    public status: number,
    public message: string,
    public payload?: any,
    public error?: string,
  ) {}
}
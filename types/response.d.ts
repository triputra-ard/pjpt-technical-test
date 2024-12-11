declare global {
  interface InfResponsePaginationServer {
    total: number;
    pageStart: number;
    perPage: number;
    page: number;
    order: string;
    sortBy?: string;
  }
  interface InfResponseStandard {
    data: any[] | object;
    success: boolean;
    message: string | InfMessageStandardResponse;
    pagination?: InfResponsePaginationServer;
  }
  interface InfMessageStandardResponse {
    message: string;
    serverValidation: boolean | string;
  }
}
export {};

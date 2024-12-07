import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

interface RequestOptions extends AxiosRequestConfig {}
interface ApiResponse<T = any> extends AxiosResponse<T> {}

export interface IApiClient {
  get<TResponse>(path: string): Promise<TResponse>;
  post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    isFormData?: boolean
  ): Promise<TResponse>;
  delete<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    isFormData?: boolean
  ): Promise<TResponse>;
}

export default class ApiClient implements IApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(baseURL: string): AxiosInstance {
    return axios.create({
      baseURL,
      timeout: 3 * 60 * 1000,
    });
  }
  constructor(baseURL: string) {
    this.client = this.createAxiosClient(baseURL);
  }

  async get<TResponse>(path: string): Promise<TResponse> {
    const response = await this.client.get<TResponse>(path);
    console.log(`GET request: Response contains: `, response.data);
    return response.data as TResponse;
  }

  async post<TResponse>(path, payload, isFormData = true): Promise<TResponse> {
    let data: any = payload;

    if (isFormData) {
      const formData = new FormData();
      Object.entries(payload as Record<string, any>).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      data = formData;
    }

    const response = await this.client.post<TResponse>(path, data);
    console.log(`POST request: Response contains: `, response.data);
    return response.data;
  }

  async delete<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    isFormData: boolean = true
  ): Promise<TResponse> {
    let data: any = payload;

    if (isFormData) {
      const formData = new FormData();
      Object.entries(payload as Record<string, any>).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      data = formData;
    }

    const response = await this.client.delete<TResponse>(path, { data });
    console.log(` DELETE request: Response contains: `, response.data);
    return response.data;
  }
}

export { ApiClient, RequestOptions, ApiResponse };

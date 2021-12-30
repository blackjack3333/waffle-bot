import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

/*
declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}
*/

class HttpClient {
  readonly axios: AxiosInstance

  public constructor(baseURL: string = process.env['API_SERVER_URL'] ?? 'https://api.waffly.ga', config: AxiosRequestConfig = {}) {
    this.axios = axios.create({ baseURL, ...config })
    // this._initializeResponseInterceptor()
  }

  protected readonly _initializeResponseInterceptor = () => {
    this.axios.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  protected _handleResponse = ({ data }: AxiosResponse) => data
  protected _handleError = async (error: any) => Promise.reject(error)
}

export const Api = new HttpClient()
export { default as axios } from 'axios'

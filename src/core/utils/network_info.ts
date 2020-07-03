export interface NetworkInfo {
  isConnected(): Promise<boolean>
}

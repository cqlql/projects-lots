export interface UploadResult {
  url: string
}
export interface UploadOptions {
  file: File,
  onProgress: (p: number) => void,
  cancelToken: (abortUpload: () => void) => void
}
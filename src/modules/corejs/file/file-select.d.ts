interface Options {
  // 文件类型
  accept?: string
  // 方式：拍照或者文件选择
  capture?: string
  // 大小限制
  sizeLimit?: number
}

interface FileSelect {
  file (options?: Options): Promise<File>
  files (options?: Options): Promise<File[]>
}
declare const fileSelect: FileSelect

export default fileSelect

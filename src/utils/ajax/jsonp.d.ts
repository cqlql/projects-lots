
interface Options {
  url: string
  data: any
}

declare function jsonp(options: Options): Promise<any>;

export default jsonp

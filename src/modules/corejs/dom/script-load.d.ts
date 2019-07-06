interface Options {
  charset?: string
}
declare function scriptLoad(src: string, options?: Options): Promise<HTMLScriptElement>
export default scriptLoad

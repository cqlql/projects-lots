interface DragOptions {
  elem: HTMLElement
  onDown (e: TouchEvent|MouseEvent): void
  onStart (e: TouchEvent|MouseEvent): void
  onMove (e: TouchEvent|MouseEvent): void
  onEnd (): void
}

declare function drag(options: DragOptions): void;

export default drag

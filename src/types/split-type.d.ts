declare module 'split-type' {
  export default class SplitType {
    constructor(element: HTMLElement, options?: { types: string });
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
  }
}
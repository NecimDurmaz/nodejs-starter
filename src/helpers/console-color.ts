type ColorName =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'pink';

type StyleName = 'bold' | 'underline' | 'italic' | 'inverse';

export class ConsoleColor {
  private static readonly codes = {
    // Text colors
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
    pink: '\x1b[95m',

    // Background colors
    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m',
    bgGray: '\x1b[100m',
    bgPink: '\x1b[105m',

    // Styles
    bold: '\x1b[1m',
    underline: '\x1b[4m',
    italic: '\x1b[3m',
    inverse: '\x1b[7m',

    reset: '\x1b[0m',
  };

  private styles: string[] = [];
  private content: string;

  constructor(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ) {
    this.content = this.processContent(content, ...rest);
  }

  private processContent(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    const parts = [content, ...rest].map(part =>
      part instanceof ConsoleColor ? part.toString() : part
    );
    return parts.join('');
  }

  // Text colors
  color(colorName: ColorName): string {
    this.styles.push(ConsoleColor.codes[colorName]);
    return this.toString();
  }

  // Background colors
  bg(colorName: ColorName): string {
    const bgKey =
      `bg${colorName.charAt(0).toUpperCase()}${colorName.slice(1)}` as keyof typeof ConsoleColor.codes;
    this.styles.push(ConsoleColor.codes[bgKey]);
    return this.toString();
  }

  // Text styles
  style(styleName: StyleName): string {
    this.styles.push(ConsoleColor.codes[styleName]);
    return this.toString();
  }

  // Apply all styles and reset at the end
  toString(reset = true): string {
    return `${this.styles.join('')}${this.content}${reset ? ConsoleColor.codes.reset : ''}`;
  }

  // Static color methods
  static black(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).color('black');
  }
  static reset(): string {
    return ConsoleColor.codes.reset;
  }
  static red(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).color('red');
  }
  static green(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).color('green');
  }
  static yellow(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).color('yellow');
  }
  static blue(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).color('blue');
  }
  static magenta(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).color('magenta');
  }
  static cyan(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).color('cyan');
  }
  static white(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).color('white');
  }
  static gray(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).color('gray');
  }
  static pink(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).color('pink');
  }

  // Static background methods
  static bgBlack(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).bg('black');
  }
  static bgRed(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).bg('red');
  }
  static bgGreen(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).bg('green');
  }
  static bgYellow(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).bg('yellow');
  }
  static bgBlue(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).bg('blue');
  }
  static bgMagenta(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).bg('magenta');
  }
  static bgCyan(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).bg('cyan');
  }
  static bgWhite(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).bg('white');
  }
  static bgGray(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).bg('gray');
  }
  static bgPink(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).bg('pink');
  }

  // Static style methods
  static bold(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).style('bold');
  }
  static underline(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).style('underline');
  }
  static italic(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).style('italic');
  }
  static inverse(
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    return new ConsoleColor(content, ...rest).style('inverse');
  }
  static custom(
    options: {
      backgroundColor?: ColorName;
      color?: ColorName;
      styles?: StyleName[];
      reset?: boolean;
    },
    content: string | ConsoleColor,
    ...rest: Array<string | ConsoleColor>
  ): string {
    const instance = new ConsoleColor(content, ...rest);

    // Renk uygula
    if (options.color) {
      instance.styles.push(ConsoleColor.codes[options.color]);
    }

    // Arkaplan rengi uygula
    if (options.backgroundColor) {
      const bgKey =
        `bg${options.backgroundColor.charAt(0).toUpperCase()}${options.backgroundColor.slice(1)}` as keyof typeof ConsoleColor.codes;
      instance.styles.push(ConsoleColor.codes[bgKey]);
    }

    // Stiller uygula
    if (options.styles) {
      options.styles.forEach(styleName => {
        instance.styles.push(ConsoleColor.codes[styleName]);
      });
    }

    return instance.toString(options.reset);
  }
}

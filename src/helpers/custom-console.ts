import moment from 'moment';
import { ConsoleColor } from './console-color';

export const customConsole = (source: string, ...args) => {
  console.log(
    `${ConsoleColor.custom(
      {
        styles: ['underline'],
        backgroundColor: 'gray',
        reset: false,
      },
      `[ ${moment().format('YYYY-MM-DD HH:mm:ss')}`,
      ConsoleColor.custom(
        {
          styles: ['bold'],
          reset: false,
        },
        ` - ${source}`
      ),
      ` ]`,
      ConsoleColor.reset()
    )}`,
    ...args
  );
};

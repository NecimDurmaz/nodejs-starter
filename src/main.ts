import { createServer } from './create-server';
import { env } from '../env';
import { ConsoleColor } from './helpers/console-color';
import { customConsole } from './helpers/custom-console';
const PORT = env('PORT');
createServer().listen(PORT, () =>
  customConsole(
    'main.ts createServer listen',
    ConsoleColor.bgGreen(
      `port: ${ConsoleColor.custom(
        { backgroundColor: 'black', styles: ['bold', 'underline'] },
        PORT.toString()
      )}`
    )
  )
);

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection', err);
});
process.on('uncaughtException', err => {
  console.error('Uncaught Exception', err);
});

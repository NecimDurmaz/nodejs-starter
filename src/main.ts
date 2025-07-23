import { createServer } from './create-server';
import { env } from '../env';
import { ConsoleColor } from './helpers/console-color';
const PORT = env('PORT');
createServer().listen(PORT, () =>
  console.log(
    ConsoleColor.bgGreen(
      `Main Server Started at port ${ConsoleColor.custom(
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

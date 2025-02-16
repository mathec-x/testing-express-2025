import winston from 'winston';
import { env } from './env.config';

winston.addColors({
  alert: 'cyan',
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'magenta',
  verbose: 'gray'
});

export const logger = (context: string) => {
  return winston.createLogger({
    level: env.LOG_LEVEL,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'DD/MM/YYYY, HH:mm:ss' }),
      winston.format.colorize({ message: true }),
      winston.format.label({ label: context.toUpperCase(), message: true }),
      winston.format.printf(({ level, message, timestamp, correlationId }) => {
        const pid = correlationId ? String(correlationId).slice(-5) : process.pid;
        const lv = level.toUpperCase().padStart(7);

        return `\x1b[33m[${timestamp}] ${pid}\x1b[0m ${lv} ${message}`;
      })
    ),
    transports: [new winston.transports.Console()]
  });
};

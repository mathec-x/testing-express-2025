import winston from 'winston';
import { env } from './env.config';
import { inspect } from 'util';

winston.addColors({
  alert: 'cyan',
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'magenta',
  verbose: 'gray'
});

const parsePascalCase = (label?: string) => {
  return label
    ? label
      .replace(/[_\-\s]+/g, ' ')
      .replace(/(^\w|\b\w)/g, (match) => match.toUpperCase())
      .replace(/\s+/g, '')
    : undefined
}

export const logger = (context: string) => {
  return winston.createLogger({
    level: env.LOG_LEVEL,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'DD/MM/YYYY, HH:mm:ss' }),
      winston.format.colorize({ message: true }),
      winston.format.label({ label: parsePascalCase(context), message: true }),
      winston.format.printf(({ level, message, timestamp, correlationId, [Symbol.for("splat")]: data }) => {
        const pid = correlationId ? String(correlationId).slice(-5) : process.pid;
        const lv = level.toUpperCase().padStart(7);
        let output = `\x1b[33m[${timestamp}] ${pid}\x1b[0m ${lv} ${message}`;

        if(data && level === 'debug') {
          output += ` ${inspect(data, { colors: true, depth: 5, maxStringLength: 100 })}`;
        }

        return output
      })
    ),
    transports: [new winston.transports.Console()]
  });
};

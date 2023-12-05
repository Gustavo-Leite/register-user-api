import { Logger } from '@nestjs/common';
import { App } from './app';

const PORT = process.env.PORT || 3333;
const logger = new Logger('NestApplication');

async function bootstrap() {
  const app = await App.get();
  await app.listen(PORT, () => {
    logger.log(`API listening on port ${PORT}`);
  });
}
bootstrap();

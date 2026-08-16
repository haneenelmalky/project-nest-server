import { TypeOrmModule } from '@nestjs/typeorm';
import {MiddlewareConsumer,Module} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { LoggerMiddleware } from './common/logger.middleware';

@Module({
  imports: [MoviesModule, TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // applies the LoggerMiddleware to all routes in the application
  }
}
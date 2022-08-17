import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        ssl: {
          rejectUnauthorized: false,
        },
        url: configService.get('DATABASE_URL'),
        entities: [
          process.env.NODE_ENV === 'test' ||
          process.env.NODE_ENV === 'development'
            ? `${__dirname + '/**/*.entity.ts'}`
            : 'dist/**/*.entity.js',
        ],
        synchronize:
          process.env.NODE_ENV === 'test' ||
          process.env.NODE_ENV === 'development'
            ? true
            : false,
        autoLoadEntities: true,
        dropSchema:
          process.env.NODE_ENV === 'test' ||
          process.env.NODE_ENV === 'development'
            ? true
            : false,
      }),
    }),
  ],
})
export class DatabaseModule {}

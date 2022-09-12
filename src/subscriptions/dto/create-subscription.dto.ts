import { ApiProperty } from '@nestjs/swagger';
import { subscriptionNameEnum } from '../enums/subscriptionName.enum';
import { subscriptionStatusEnum } from '../enums/subscriptionStatus.enum';
import { User } from '../../users/entities/user.entity';

export class CreateSubscriptionDto {
  @ApiProperty({ enum: subscriptionNameEnum })
  name: subscriptionNameEnum;

  @ApiProperty()
  periodStart: Date;

  @ApiProperty()
  periodEnd: Date;

  @ApiProperty({ enum: subscriptionStatusEnum })
  status: subscriptionStatusEnum;

  @ApiProperty()
  user: User;
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

import CreateChargeDto from '../stripe/createCharge.dto';
import { User } from '../users/entities/user.entity';
import StripeService from '../stripe/stripe.service';
import AddCreditCardDto from '../stripe/creditCards.dto';
import SetDefaultCreditCardDto from '../stripe/setDefaultCreditCard.dto';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService,
    private readonly stripeService: StripeService
    
    ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }
  @Post('/charge')
  async createCharge(@Body() charge: CreateChargeDto,@Body() user: User ) {
    return this.stripeService.charge(charge.amount, charge.paymentMethodId, user.stripeCustomerId);
  }

  @Post('/credit-cards')
  async addCreditCard(@Body() user: User, @Body() creditCard: AddCreditCardDto) {
//   console.log(creditCard.paymentMethodId)
//   console.log(user.stripeCustomerId)
    return this.stripeService.attachCreditCard( creditCard.paymentMethodId,user.stripeCustomerId);
  }
  @Post('default')
  async setDefaultCard(@Body() user: User, @Body() creditCard: SetDefaultCreditCardDto) {
//     console.log(creditCard.paymentMethodId)
//     console.log(user.stripeCustomerId)
    await this.stripeService.setDefaultCreditCard(creditCard.paymentMethodId, user.stripeCustomerId);
  }

  @Get('/credit-cards')
  async getCreditCards(@Body() user: User) {
    return this.stripeService.listCreditCards(user.stripeCustomerId);
  }

  @Post('/portal')
  async customerPortal(@Body() user: User ) {
    return this.stripeService.customerPortal( user.stripeCustomerId);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}

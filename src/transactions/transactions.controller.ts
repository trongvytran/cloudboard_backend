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
  async createCharge(@Body() charge: CreateChargeDto, @Req() request: User ) {
    return this.stripeService.charge(charge.amount, charge.paymentMethodId, request.stripeCustomerId);
  }

  @Post('/credit-cards')
  async addCreditCard(@Body() creditCard: AddCreditCardDto, @Req() request: User) {
    return this.stripeService.attachCreditCard(creditCard.paymentMethodId, request.stripeCustomerId);
  }
  @Post('default')
  @HttpCode(200)
  async setDefaultCard(@Body() creditCard: SetDefaultCreditCardDto, @Req() request: User) {
    await this.stripeService.setDefaultCreditCard(creditCard.paymentMethodId, request.stripeCustomerId);
  }
  
  @Get('/credit-cards')
  async getCreditCards(@Req() request: User) {
    return this.stripeService.listCreditCards(request.stripeCustomerId);
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

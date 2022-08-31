import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import Stripe from 'stripe';
@Injectable()
export class TransactionsService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  )  {
    this.stripe = new Stripe(process.env.API_SECRET_KEY, {
      apiVersion: '2022-08-01',
    });
  }
  
  create(createTransactionDto: CreateTransactionDto) {
    return this.transactionRepository.save(createTransactionDto);
  }

  findAll() {
    return this.transactionRepository.find();
  }

  findOne(id: number) {
    return this.transactionRepository.findOneBy({ id });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionRepository.update(id, updateTransactionDto);
  }

  remove(id: number) {
    return this.transactionRepository.delete(id);
  }
}

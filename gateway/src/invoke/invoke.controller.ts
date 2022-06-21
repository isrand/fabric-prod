import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Response } from 'express';
import { APITransactionResponse } from '../common/api-transaction.response';
import { InvokeDto } from './dto/invoke.dto';
import { InvokeService } from './invoke.service';

@Controller('invoke')
export class InvokeController {
  constructor(private readonly invokeService: InvokeService) {}

  @Post()
  @ApiOperation({
    summary: 'Performs an invoke transaction on the ledger',
    description:
      'The Invoke endpoint performs an invoke transaction on the ledger.',
  })
  @ApiCreatedResponse({
    description:
      'The invoke endpoint returns a 201 response if the transaction is executed correctly.',
  })
  @ApiInternalServerErrorResponse({
    description:
      'The invoke endpoint returns a 500 error response if the transaction fails to be executed correctly.',
  })
  async invoke(@Body() invokeDto: InvokeDto, @Res() response: Response) {
    try {
      const result = await this.invokeService.invoke(invokeDto);
      response
        .status(HttpStatus.CREATED)
        .send(
          new APITransactionResponse(
            HttpStatus.CREATED,
            'Invoke performed successfully',
            result,
            undefined,
          ),
        );
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(
          new APITransactionResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            'Error performing invoke',
            undefined,
            error.message,
          ),
        );
    }
  }
}
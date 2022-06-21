import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Response } from 'express';
import { APITransactionResponse } from '../common/api-transaction.response';
import { QueryDto } from './dto/query.dto';
import { QueryService } from './query.service';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Post()
  @ApiOperation({
    summary: 'Performs a query transaction on the ledger',
    description:
      'The Query endpoint performs a query transaction on the ledger.',
  })
  @ApiOkResponse({
    description:
      'The query endpoint returns a 200 response and the payload if the transaction was evaluated correctly.',
  })
  @ApiInternalServerErrorResponse({
    description:
      'The query endpoint returns a 500 error response if the transaction fails to be evaluated correctly.',
  })
  async query(@Body() queryDto: QueryDto, @Res() response: Response) {
    try {
      const result = await this.queryService.query(queryDto);
      response
        .status(HttpStatus.OK)
        .send(
          new APITransactionResponse(
            HttpStatus.OK,
            'Query performed successfully',
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
            'Error performing query',
            undefined,
            error.message,
          ),
        );
    }
  }
}
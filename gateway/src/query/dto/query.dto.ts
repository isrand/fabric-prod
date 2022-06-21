import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QueryDto {
  @ApiProperty({
    example: 'admin',
    description: 'Enrolled user performing the transaction',
    required: true,
    type: String,
  })
  userEnrollmentId: string;

  @ApiProperty({
    example: 'mychannel',
    description: 'Name of the channel where the transaction will be executed',
    required: true,
    type: String,
  })
  channelName: string;

  @ApiProperty({
    example: 'asset-transfer-chaincode',
    description: 'Id of the Chaincode to be queried',
    required: true,
    type: String,
  })
  chaincodeId: string;

  @ApiProperty({
    example: 'GetAllAssets',
    description: 'Name of the Chaincode function to be ran',
    required: true,
    type: String,
  })
  functionName: string;

  @ApiPropertyOptional({
    example: '[]',
    description: 'Parameters sent to the Chaincode function',
    required: false,
    type: [String],
  })
  params?: string[];
}
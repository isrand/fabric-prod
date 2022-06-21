import { ApiProperty } from '@nestjs/swagger';

export class InvokeDto {
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
    description: 'Id of the Chaincode to be invoked',
    required: true,
    type: String,
  })
  chaincodeId: string;

  @ApiProperty({
    example: 'initLedger',
    description: 'Name of the Chaincode function to be ran',
    required: true,
    type: String,
  })
  functionName: string;

  @ApiProperty({
    example: '[]',
    description: 'Parameters sent to the Chaincode function',
    required: true,
    type: [String],
  })
  params: string[];
}
import { ApiProperty } from '@nestjs/swagger';

export class authtoken {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiYmFsdUAxMjNnYW1pbC5jb20iLCJpYXQiOjE3NTU2MjEzNDQsImV4cCI6MTc1NTY1NzM0NH0.9Gdp5y8xz7zpgoqQd6kiHNAGchelVCv4mQPcDrZvVsY' })
  access_token: string;

}
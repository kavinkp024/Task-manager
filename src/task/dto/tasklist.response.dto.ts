import { ApiProperty } from '@nestjs/swagger';
import { list } from './userid.response.dto';

export class TaskList {
      @ApiProperty({ example: 'number' })
      id: number;

      @ApiProperty()
      title: string;

      @ApiProperty()
      description: string;

      @ApiProperty()
      due_date: string;

      @ApiProperty()
      priority: string;

      @ApiProperty()
      status: string;

      @ApiProperty()
      tags: string[];

      @ApiProperty({ example: list })
      userId: list;

      @ApiProperty({ example: 'date' })
      created_at: Date;

      @ApiProperty({ example: 'date' })
      updated_at: Date;
}


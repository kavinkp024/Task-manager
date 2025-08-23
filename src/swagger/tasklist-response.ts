import { ApiProperty } from '@nestjs/swagger';
import { List } from './userid-response';

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

      @ApiProperty({ example: List })
      userId: List;

      @ApiProperty({ example: 'date' })
      created_at: Date;

      @ApiProperty({ example: 'date' })
      updated_at: Date;
}


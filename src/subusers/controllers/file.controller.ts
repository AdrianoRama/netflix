import { Controller, Get, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  @Get()
  getFile(@Res() res: any) {
    const file = createReadStream(join(process.cwd(), 'defaultUser.jpg'));
    file.pipe(res);
  }
}

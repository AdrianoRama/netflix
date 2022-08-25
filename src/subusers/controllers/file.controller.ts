import { Controller, Get, Param, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('images')
export class FileController {
  @Get('/:image')
  getFile(@Res() res: any, @Param('image') image: string) {
    const file = createReadStream(
      join(process.cwd() + '/src/subusers/images/', image),
    );
    file.pipe(res);
  }
}

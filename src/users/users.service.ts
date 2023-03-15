import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<UsersEntity>{

    constructor(@InjectRepository(UsersEntity) repo) {
        super(repo);
    }

}

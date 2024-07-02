import { FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

type IBaseEntity = {
    id: string;
};

interface IBaseRepository<T extends IBaseEntity> {
    create(): T;
    save(data: T): Promise<T>;
    exitsById(id: string): Promise<boolean>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    updateById(id: string, data: QueryDeepPartialEntity<T>): Promise<T | null>;
    deleteById(id: string): Promise<void>;
}

export abstract class BaseRepository<T extends IBaseEntity>
    implements IBaseRepository<T>
{
    protected constructor(protected readonly repository: Repository<T>) {}

    public create(): T {
        return this.repository.create();
    }

    public async save(data: T): Promise<T> {
        return this.repository.save(data);
    }

    public async exitsById(id: string): Promise<boolean> {
        return this.repository.existsBy({ id } as FindOptionsWhere<T>);
    }

    public async findById(id: string): Promise<T | null> {
        return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
    }

    public async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    public async updateById(
        id: string,
        data: QueryDeepPartialEntity<T>,
    ): Promise<T | null> {
        await this.repository.update(id, data);
        return this.findById(id);
    }

    public async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

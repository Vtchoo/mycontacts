declare interface Repository<T> {
    find(): Promise<T[]>
    findAll(): Promise<T[]>
    // findOne(): Promise<T>
    findById(id: string | number): Promise<T | undefined>
}

declare interface QueryOptions<T> {
    where?: Partial<T>
    orderBy?: any
}

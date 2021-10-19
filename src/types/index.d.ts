declare interface Repository<T> {
    find(): Promise<T[]>
    findAll(): Promise<T[]>
    // findOne(): Promise<T>
    findById(id: string | number): Promise<T | undefined>
}

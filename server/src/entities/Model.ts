import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from 'uuid'


@Entity()
abstract class Model extends BaseEntity {


    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'uuid' })
    uuid!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @BeforeInsert()
    createduuid() {
        this.uuid = uuid()
    }

    toJSON() {
        return {
            ...this, password: undefined, id: undefined,
            infouserId: undefined, infopostId: undefined
        }
    }
}

export default Model
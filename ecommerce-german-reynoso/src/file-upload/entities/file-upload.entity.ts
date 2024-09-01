import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class FileUploadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column('bytea')
  buffer: Buffer; // Guarda el archivo en un formato binario

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

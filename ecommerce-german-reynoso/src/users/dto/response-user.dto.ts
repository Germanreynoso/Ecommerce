import { ApiProperty } from "@nestjs/swagger";

export class OrderDTO {
    @ApiProperty({
        type: String,
        description: 'The id of the order',
        required: true,
    })
    id: string;

    @ApiProperty({
        type: String,
        description: 'The date of the order',
        required: true,
    })
    date: Date;
}

export class userResponseDTO {
    @ApiProperty({
        type: String,
        description: 'The uuid of the user, assigned by the database',
        required: true,
    })
    id: string;

    @ApiProperty({
        type: String,
        description: 'The name of the user',
        required: true,
    })
    name: string;

    @ApiProperty({
        type: String,
        description: 'The email of the user',
        required: true,
    })
    email: string;

    @ApiProperty({
        type: String,
        description: 'The address of the user',
        required: true,
    })
    address: string;

    @ApiProperty({
        type: String,
        description: 'The phone of the user',
        required: true,
    })
    phone: string;

    @ApiProperty({
        type: String,
        description: 'The country of the user',
        required: false,
    })
    country: string;

    @ApiProperty({
        type: String,
        description: 'The city of the user',
        required: false,
    })
    city?: string;

    @ApiProperty({
        type: [OrderDTO],
        description: 'The list of orders associated with the user',
        required: false,
    })
    orders: OrderDTO[];

    @ApiProperty({
        type: String,
        description: 'The role of the user',
        required: true,
    })
    role: string;

    constructor(partial: Partial<userResponseDTO>) {
        this.id = partial.id;
        this.name = partial.name;
        this.email = partial.email;
        this.address = partial.address;
        this.phone = partial.phone;
        this.country = partial.country;
        this.city = partial.city;
        this.orders = partial.orders ?? [];
        this.role = partial.role;
    }
}

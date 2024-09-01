import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';  // Asegúrate de que la ruta sea correcta

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

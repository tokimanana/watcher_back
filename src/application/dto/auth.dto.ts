import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Veuillez fournir une adresse e-mail valide' })
  email!: string;

  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  password!: string;
}
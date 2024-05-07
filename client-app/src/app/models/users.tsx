


//UserDto.cs
export interface User {
  username: string;
  displayName: string;
  token: string;
  image?: string;
}


//RegisterDto.cs
export interface UserFormValues {
  username?: string;
  displayName?: string;
  email: string;
  password: string;

}
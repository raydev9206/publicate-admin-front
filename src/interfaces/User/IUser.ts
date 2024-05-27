export default interface IUser {
  username: string,
  email: string,
  phone: string,
  password: string,
  roles: Array<string>,
  business_id: string,
}

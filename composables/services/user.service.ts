import { User } from "@/models/user.model";
import BaseService from "./base.service";


const UserService = BaseService<User>('users');


export default UserService
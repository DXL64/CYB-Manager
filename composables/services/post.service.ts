import BaseService from "./base.service";
import { Post } from "@/models/post.model";

const PostService = BaseService<Post>("posts")

export default PostService;

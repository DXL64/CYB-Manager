'use client'
import { Post } from "@/models/post.model"
import PostList from "./post.list"
import { PostService } from "@/composables/services";
import { useEffect, useState } from "react";



const PostTable = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetch = async () => {
        await PostService.List().then(ls => {
            setPosts(ls.results)
        })
    }

    useEffect(() => {
        fetch()
    }, [setPosts])

    return (
        <>
            <PostList models={posts} searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetch={fetch}></PostList>
        </>
    )
}

export default PostTable
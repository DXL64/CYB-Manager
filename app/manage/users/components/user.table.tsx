'use client'
import List from "./user.list";
import { useEffect, useState } from "react";
import { UserService } from "@/composables/services";
import { User } from "@/models/user.model";

const Table = () => {
  const [list, setList] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetch = () => {
    UserService.List().then(ls => {
      setList(ls.results)
    })
  }

  useEffect(() => {
    fetch()
  }, [setList])

  return (
    <>
      <List models={list} searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetch={fetch} />
    </>
  );
};

export default Table;

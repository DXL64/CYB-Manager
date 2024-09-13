"use client"
import { useState } from "react"
import UsersTable from "@/components/users-manager/list"

interface User {
  id: number
  name: string
  date: string
  active: boolean
}

const users: User[] = [
  { id: 1, name: "Jssa Jas", date: "09 Apr 2021", active: true },
  { id: 2, name: "Pauline Jas", date: "26 Jan 2021", active: false },
  { id: 3, name: "Thedric Romans", date: "12 Jan 2019", active: false },
  { id: 4, name: "Haily Carthew", date: "27 Jan 2018", active: true },
  { id: 5, name: "Dorothea Joicey", date: "12 Dec 2017", active: true },
]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!dateFrom || new Date(user.date) >= new Date(dateFrom)) &&
    (!dateTo || new Date(user.date) <= new Date(dateTo))
  )

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsNewUserModalOpen(true)
  }

  return (
    <>
      <UsersTable/>
    </>
  )
}

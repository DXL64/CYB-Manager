"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import {
    ChevronLeft,
    ChevronRight,
    Edit,
    Image,
    MoreHorizontal,
    Plus
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Paginate } from "../ui/paginate"
import { Student } from "@/models/student"

// interface Student {
//     id: number
//     name: string
//     date: string
//     active: boolean
// }

const users: Student[] = [
    { id: 1, name: "Jssa Jas", email: "@email.com", phone: '+84123456789', imgSrc: 'D:\\Download\\Rug-Pull.png', schoolYear: 'k28', major: 'Ly', dob: "09 Apr 2021", gender: 'female', active: true },
    { id: 2, name: "Pauline Jas", email: "@email.com", phone: '+84123456789', imgSrc: 'D:/', schoolYear: 'k28', major: 'Ly', dob: "26 Jan 2021", gender: 'female', active: false },
    { id: 3, name: "Thedric Romans", email: "@email.com", phone: '+84123456789', imgSrc: 'D:/', schoolYear: 'k28', major: 'Ly', dob: "12 Jan 2019", gender: 'female', active: false },
    { id: 4, name: "Haily Carthew", email: "@email.com", phone: '+84123456789', imgSrc: 'D:/', schoolYear: 'k28', major: 'Ly', dob: "27 Jan 2018", gender: 'female', active: true },
    { id: 5, name: "Dorothea Joicey", email: "@email.com", phone: '+84123456789', imgSrc: 'D:/', schoolYear: 'k28', major: 'Ly', dob: "12 Dec 2017", gender: 'female', active: true },
]

export default function StudentsTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<Student | null>(null)

    const filteredUsers = users.filter(user => {
        const userDob = user?.dob ? new Date(user.dob) : null;
        const isValidDate = userDob instanceof Date && !isNaN(userDob.getTime()); // Check if the date is valid

        return user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!dateFrom || (isValidDate && userDob >= new Date(dateFrom))) &&
            (!dateTo || (isValidDate && userDob <= new Date(dateTo)));
    });
    const handleEditUser = (user: Student) => {
        setEditingUser(user)
        setIsNewUserModalOpen(true)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Users</h2>
                <Dialog open={isNewUserModalOpen} onOpenChange={setIsNewUserModalOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingUser(null)}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Student
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingUser ? 'Edit User' : 'Create User'}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fullName" className="text-right">
                                    Full Name
                                </Label>
                                <Input id="fullName" defaultValue={editingUser?.name || ""} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input id="username" defaultValue="" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input id="email" defaultValue="" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="about" className="text-right">
                                    About
                                </Label>
                                <Textarea id="about" defaultValue="" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="currentPassword" className="text-right">
                                    Current Password
                                </Label>
                                <Input id="currentPassword" type="password" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="newPassword" className="text-right">
                                    New Password
                                </Label>
                                <Input id="newPassword" type="password" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="confirmPassword" className="text-right">
                                    Confirm Password
                                </Label>
                                <Input id="confirmPassword" type="password" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">
                                    Email Notifications
                                </Label>
                                <div className="col-span-3 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="blogPosts" />
                                        <label htmlFor="blogPosts">Blog posts</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="newsletter" />
                                        <label htmlFor="newsletter">Newsletter</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="personalOffers" />
                                        <label htmlFor="personalOffers">Personal Offers</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button type="submit">Save Changes</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="mb-4 flex flex-wrap gap-4 items-center">
                <Input
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <div className="flex items-center space-x-2">
                    <Input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="max-w-[150px]"
                    />
                    <span>to</span>
                    <Input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="max-w-[150px]"
                    />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">
                            <input type="checkbox" className="rounded border-gray-300" />
                        </TableHead>
                        <TableHead>Photo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>School Year</TableHead>
                        <TableHead>DoB</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <input type="checkbox" className="rounded border-gray-300" />
                            </TableCell>
                            <TableCell>
                                {/* <Image  className="h-8 w-8 rounded-full" /> */}
                                <img src={user.imgSrc} alt="Rug Pull" />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.schoolYear}</TableCell>
                            <TableCell>{user?.dob}</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <Switch checked={user.active} />
                                    <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Paginate />
        </>
    )
}

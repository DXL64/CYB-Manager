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

interface Teacher {
    id: number
    name: string
    date: string
    active: boolean
}

const teachers: Teacher[] = [
    { id: 1, name: "Jssa Jas", date: "09 Apr 2021", active: true },
    { id: 2, name: "Pauline Jas", date: "26 Jan 2021", active: false },
    { id: 3, name: "Thedric Romans", date: "12 Jan 2019", active: false },
    { id: 4, name: "Haily Carthew", date: "27 Jan 2018", active: true },
    { id: 5, name: "Dorothea Joicey", date: "12 Dec 2017", active: true },
]

export default function TeachersTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [isNewTeacherModalOpen, setIsNewTeacherModalOpen] = useState(false)
    const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)

    const filtered = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!dateFrom || new Date(teacher.date) >= new Date(dateFrom)) &&
        (!dateTo || new Date(teacher.date) <= new Date(dateTo))
    )

    const handleEditTeacher = (teacher: Teacher) => {
        setEditingTeacher(teacher)
        setIsNewTeacherModalOpen(true)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Teacher</h2>
                <Dialog open={isNewTeacherModalOpen} onOpenChange={setIsNewTeacherModalOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingTeacher(null)}>
                            <Plus className="mr-2 h-4 w-4" />
                            New teacher
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingTeacher ? 'Edit Teacher' : 'Create Teacher'}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fullName" className="text-right">
                                    Full Name
                                </Label>
                                <Input id="fullName" defaultValue={editingTeacher?.name || ""} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    username
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
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filtered.map((teacher) => (
                        <TableRow key={teacher.id}>
                            <TableCell>
                                <input type="checkbox" className="rounded border-gray-300" />
                            </TableCell>
                            <TableCell>
                                <Image className="h-8 w-8 rounded-full" />
                            </TableCell>
                            <TableCell>{teacher.name}</TableCell>
                            <TableCell>{teacher.date}</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <Switch checked={teacher.active} />
                                    <Button variant="ghost" size="icon" onClick={() => handleEditTeacher(teacher)}>
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

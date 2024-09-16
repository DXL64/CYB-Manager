"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Student } from "@/models/student";
import { Plus } from "lucide-react";
import { useState } from "react";

export function InputForm() {
  // hook phai nam ben trong component, dung useState phai co 'use client'

  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Student | null>(null);

  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">Users</h2>
    <Dialog
      open={isNewUserModalOpen}
      onOpenChange={setIsNewUserModalOpen}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setEditingUser(null)}>
          <Plus className="mr-2 h-4 w-4" />
          New Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingUser ? "Edit User" : "Create User"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="fullName"
              className="text-right"
            >
              Full Name
            </Label>
            <Input
              id="fullName"
              defaultValue={editingUser?.name || ""}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="username"
              className="text-right"
            >
              Username
            </Label>
            <Input
              id="username"
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="email"
              className="text-right"
            >
              Email
            </Label>
            <Input
              id="email"
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="about"
              className="text-right"
            >
              About
            </Label>
            <Textarea
              id="about"
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="currentPassword"
              className="text-right"
            >
              Current Password
            </Label>
            <Input
              id="currentPassword"
              type="password"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="newPassword"
              className="text-right"
            >
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="confirmPassword"
              className="text-right"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Email Notifications</Label>
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
  </div>;
}

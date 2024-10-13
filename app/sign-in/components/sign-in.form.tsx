"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"
import { AuthService } from "@/composables/services"
import { useRouter } from "next/navigation"
import CookieStore from "@/composables/cookies.store"
// import { toast } from "react-toastify"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    AuthService.SignIn({
      email: email,
      password: password,
    }).then(res => {
      console.log(res)
      CookieStore.setAuth(res.tokens.access.token.toString())
      router.push('/manage')
    })
    setLoading(false)
    // Here you would typically handle the sign-in logic
    console.log("Sign in attempted with:", { email, password, rememberMe })
  }

  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">Sign In</h2>
        {error && (
          <div className="flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={() => setRememberMe(!rememberMe)}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          {
            !loading ? (
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
            ):(
                <Button type="submit" disabled className="w-full">
                  Loading
                </Button>
            )
          }
        </form>
        <div className="text-sm text-center text-gray-500">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}
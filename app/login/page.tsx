"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useFirebase()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await signIn(email, password)
      toast({
        title: "Login realizado com sucesso",
        description: "Você foi autenticado com sucesso.",
      })
      router.push("/")
    } catch (error: any) {
      console.error("Erro ao fazer login:", error)

      let errorMessage = "Ocorreu um erro ao fazer login. Tente novamente."

      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        errorMessage = "E-mail ou senha incorretos."
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Muitas tentativas de login. Tente novamente mais tarde."
      }

      setError(errorMessage)

      toast({
        title: "Erro de autenticação",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Entrar</h1>
            <p className="text-muted-foreground mt-2">Faça login para acessar sua conta</p>
          </div>

          <div className="border rounded-lg p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{error}</div>}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p>
                Não tem uma conta?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


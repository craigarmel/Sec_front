import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Register() {
  return (
    <div className="bg-linear-to-r from-gray-300 via-gray-500 to-gray-700">
        <div className="pl-3 pt-3">
            <Link href="/" className="text-2xl font-semibold tracking-tight">
            SecureBlog
            </Link>
        </div>
        <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
            <CardTitle className="text-center">Créer un compte</CardTitle>
            <CardDescription>
                Remplissez les informations ci-dessous pour créer votre compte
            </CardDescription>
            </CardHeader>
            <CardContent>
            <RegisterForm />
            </CardContent>
            <CardAction className="text-center">
            <LoginLink />
            </CardAction>
            <CardFooter className="flex-col gap-2">
            <RegisterButtons />
            </CardFooter>
        </Card>
        </div>
    </div>
  )

function RegisterForm() {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <FormField
          label="Nom"
          htmlFor="name"
          type="text"
          placeholder="Votre nom"
          id="name"
        />
        <FormField
          label="E-mail"
          htmlFor="email"
          type="email"
          placeholder="m@exemple.com"
          id="email"
        />
        <FormField
          label="Mot de passe"
          htmlFor="password"
          type="password"
          placeholder="Votre mot de passe"
          id="password"
        />
        <FormField
          label="Confirmez le mot de passe"
          htmlFor="confirm-password"
          type="password"
          placeholder="Confirmez votre mot de passe"
          id="confirm-password"
        />
      </div>
    </form>
  )
}

function FormField({ label, htmlFor, type, placeholder, id }: { label: string, htmlFor: string, type: string, placeholder: string, id: string }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required
      />
    </div>
  )
}

function LoginLink() {
  return (
    <Button variant="link">
      <Link href="/auth/login">Vous avez déjà un compte ? Se connecter</Link>
    </Button>
  )
}

function RegisterButtons() {
  return (
    <>
      <Button type="submit" className="w-full">
        Créer mon compte
      </Button>
      <Button variant="outline" className="w-full">
        S&apos;inscrire avec Google
      </Button>
    </>
  )
}
}
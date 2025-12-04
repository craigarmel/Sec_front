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

export default function Login() {
  return (
    <div className="bg-linear-to-r from-gray-300 via-gray-500 to-gray-700">
        <div className="pl-3 pt-3">
            <Link href="/" className="text-2xl font-semibold tracking-tight">
            SecureBlog
            </Link>
        </div>
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Connexion à votre compte</CardTitle>
                <CardDescription>
                Entrez votre e-mail ci-dessous pour vous connecter à votre compte
                </CardDescription>
                <CardAction>
                    <Button variant="link">
                        <Link href="/auth/register"> S&apos;inscrire</Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@exemple.com"
                        required
                    />
                    </div>
                    <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Mot de passe</Label>
                        <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                        Mot de passe oublié&nbsp;?
                        </a>
                    </div>
                    <Input id="password" type="password" required />
                    </div>
                </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                Se connecter
                </Button>
                <Button variant="outline" className="w-full">
                Se connecter avec Google
                </Button>
            </CardFooter>
            </Card>
        </div>
    </div>
  )
}
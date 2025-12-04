import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children, user }) => {
const router = useRouter();

useEffect(() => {
if (!user) router.push("/login");
}, [user, router]);

if (!user) return null;

return children;
};

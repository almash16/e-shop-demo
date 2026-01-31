import { ReactNode, Suspense } from "react";
import LoadingCart from "./loading";

interface CartLayoutProps {
  children: ReactNode;
}

export default function CartLayout({ children }: CartLayoutProps) {
  return <Suspense fallback={<LoadingCart />}>{children}</Suspense>;
}

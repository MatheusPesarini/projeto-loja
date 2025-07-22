"use client";

import Link from "next/link";
import Image from "next/image";
import { LogOut, User, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "../forms/LogoutButton";

interface UserActionsProps {
  isAuthenticated: boolean;
}

const auth = {
  login: { url: "/login", title: "Entrar" },
  signup: { url: "/signup", title: "Registrar" },
};

export function UserActions({ isAuthenticated }: UserActionsProps) {
  return isAuthenticated ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src="https://avatar.vercel.sh/default"
          alt="Avatar"
          width={36}
          height={36}
          className="rounded-full cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48"
        align="end"
        sideOffset={5}
        avoidCollisions={true}
        side="bottom"
        sticky="always"
      >
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/orders" className="flex items-center cursor-pointer">
              <Store className="mr-2 h-4 w-4" />
              <span>Meus Pedidos</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer ">
            <LogOut className="mr-2 h-4 w-4" />
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <Button asChild variant="outline" size="sm">
        <Link href={auth.login.url}>{auth.login.title}</Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href={auth.signup.url}>{auth.signup.title}</Link>
      </Button>
    </>
  );
}

"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Heart,
  HelpCircle,
  ListChecks,
  ListOrdered,
  LogOut,
  Package,
  User,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import UserAvatar from "./UserAvatar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface AccountPopoverProps {
  user: {
    email: string;
    family_name: string;
    given_name: string;
    name: string;
    nickname: string;
    picture: string;
    sub: string;
  };
}

const AccountPopover: React.FC<AccountPopoverProps> = ({ user }) => {
  const pathname = usePathname();

  const userLinks = [
    {
      link: "/my-account",
      label: "Mi cuenta",
      icon: <User />,
      isActive: pathname.includes("/my-account"),
    },
    {
      link: "/wishlist",
      label: "Mi lista",
      icon: <Heart />,
      isActive: pathname.includes("/wishlist"),
    },
    {
      link: "/my-orders",
      label: "Mis ordenes",
      icon: <ListOrdered />,
      isActive: pathname.includes("/my-orders"),
    },
    {
      link: "/seller",
      label: "Ingresa como vendedor",
      icon: <Package />,
      isActive: pathname.includes("/seller"),
    },
    {
      link: "/help",
      label: "Ayuda",
      icon: <HelpCircle />,
      isActive: pathname.includes("/help"),
    },
  ];

  return (
    <div className="hidden lg:block">
      <Popover>
        <PopoverTrigger className="flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 duration-200 p-2 rounded-md">
          <User size={25} />
        </PopoverTrigger>
        <PopoverContent
          className=" rounded-2xl 
      "
        >
          <ul className="space-y-1 text-center ">
            <UserAvatar user={user} />
            <Separator className="!my-2" />
            {userLinks.map((link) => (
              <Link
                key={link.link}
                href={link.link}
                className={cn(
                  "flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-md",
                  link.isActive && "bg-gray-200  dark:bg-gray-800"
                )}
              >
                {link.icon} {link.label}
              </Link>
            ))}
            <Separator className="!my-2" />
            <button
              className="flex items-start justify-start gap-2 p-2 bg-transparent hover:opacity-50"
              onClick={() => (window.location.href = "/auth/logout")}
            >
              <LogOut />
              Cerrar sesión
            </button>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccountPopover;

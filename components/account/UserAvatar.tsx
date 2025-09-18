import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const UserAvatar: React.FC<AccountPopoverProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user?.picture || "https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="font-semibold text-lg">Bienvenido,</h2>
        <p className="-mt-1">{user.name}</p>
      </div>
    </div>
  );
};

export default UserAvatar;

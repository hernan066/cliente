"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";
/* import { useMobileSearchModal } from "@/store/mobileSearchStore"; */
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/slices/mobileSearchSlice";

const MobileSearch = () => {
  /* const { closeModal, isOpen } = useMobileSearchModal(); */
  const { isOpen } = useSelector((state: any) => state.mobileSearch);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (params.get("query")) {
      params.delete("query");
      params.set("query", searchTerm);
    } else {
      params.set("query", searchTerm);
    }

    router.push(`/search?${params}`);
    dispatch(closeModal());
    setSearchTerm("");
  };

  useEffect(() => {
    if (pathname !== "/search") {
      setSearchTerm("");
    }
  }, [pathname]);

  if (isOpen) {
    return (
      <div className="fixed top-0 h-[5rem] bg-white dark:bg-slate-950 w-full flex items-center justify-center z-50">
        <div className="flex items-center gap-4 w-full mx-4">
          <form
            onSubmit={onFormSubmit}
            className="flex items-center w-full gap-2 px-4 rounded-lg border focus-visible:ring-2"
          >
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Product..."
              className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            />
            <button className="bg-transparent border-none" type="submit">
              <Search />
            </button>
          </form>
          <Button
            variant={"destructive"}
            onClick={() => dispatch(closeModal())}
          >
            <X />
          </Button>
        </div>
      </div>
    );
  }
};

export default MobileSearch;

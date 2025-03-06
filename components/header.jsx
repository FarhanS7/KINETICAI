"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from "lucide-react";

import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-black">
      <nav className="container flex items-center justify-between mx-auto">
        <Link href="/">
          <Image
            src="/logo.png"
            width={200}
            height={60}
            alt="logo"
            className="w-auto h-12 object-contain py-1"
          />
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant={"outline"}>
                <LayoutDashboard className="h-4" />
                <span className="hidden md:block">Insights</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>
                  <StarsIcon className="h-4" />
                  <span className="hidden md:block">Tools</span>
                  <ChevronDown className="h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  {" "}
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4" />
                    <span className="hidden md:block">Build Resume </span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  {" "}
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2"
                  >
                    <PenBox className="h-4" />
                    <span className="hidden md:block">Cover Letter </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4" />
                    <span className="hidden md:block"> Interview Prep </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant={"outline"}>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn></SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;

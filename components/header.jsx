import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import {
  Brain,
  Briefcase,
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Map,
  MessageSquareText,
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
import { checkUser } from "@lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <header className="fixed top-0 w-full border-b border-cyan-500/20 bg-gray-950/80 backdrop-blur-xl z-50 supports-[backdrop-filter]:bg-transparent">
      {/* Subtle gradient line at bottom of header */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500/10 via-blue-500/30 to-purple-500/10"></div>

      {/* Animated light effects */}
      <div className="absolute top-0 left-1/4 w-64 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 blur-sm animate-pulse"></div>

      <nav className="container flex items-center justify-between mx-auto py-2">
        <Link href="/" className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          <Image
            src="/logo.png"
            width={200}
            height={60}
            alt="logo"
            className="w-auto h-12 object-contain py-1 relative"
          />
        </Link>

        <div className="flex items-center gap-2">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-cyan-600/30 text-gray-200 hover:bg-cyan-600/10 hover:text-white transition-all duration-300 group"
              >
                <LayoutDashboard className="h-4 mr-2 group-hover:text-cyan-400 transition-colors" />
                <span className="hidden md:block">Insights</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white transition-all duration-300 border-0 shadow-lg hover:shadow-cyan-500/30">
                  <StarsIcon className="h-4 mr-2" />
                  <span className="hidden md:block">Tools</span>
                  <ChevronDown className="h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border border-cyan-600/20 shadow-xl shadow-cyan-500/10">
                <DropdownMenuItem className="hover:bg-cyan-600/10 focus:bg-cyan-600/20 text-gray-200 hover:text-white">
                  <Link
                    href="/resume"
                    className="flex items-center gap-2 w-full"
                  >
                    <FileText className="h-4 text-cyan-400" />
                    <span>Build Resume</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-cyan-600/10 focus:bg-cyan-600/20 text-gray-200 hover:text-white">
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2 w-full"
                  >
                    <PenBox className="h-4 text-blue-400" />
                    <span>Cover Letter</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-cyan-600/10 focus:bg-cyan-600/20 text-gray-200 hover:text-white">
                  <Link
                    href="/interview"
                    className="flex items-center gap-2 w-full"
                  >
                    <GraduationCap className="h-4 text-indigo-400" />
                    <span>Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* New Career Paths Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white transition-all duration-300 border-0 shadow-lg hover:shadow-blue-500/30">
                  <Brain className="h-4 mr-2" />
                  <span className="hidden md:block">Career Paths</span>
                  <ChevronDown className="h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border border-blue-600/20 shadow-xl shadow-blue-500/10">
                <DropdownMenuItem className="hover:bg-blue-600/10 focus:bg-blue-600/20 text-gray-200 hover:text-white">
                  <Link
                    href="/roadmap"
                    className="flex items-center gap-2 w-full"
                  >
                    <Map className="h-4 text-purple-400" />
                    <span>Roadmap</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-blue-600/10 focus:bg-blue-600/20 text-gray-200 hover:text-white">
                  <Link
                    href="/ai-qa-bot"
                    className="flex items-center gap-2 w-full"
                  >
                    <MessageSquareText className="h-4 text-indigo-400" />
                    <span>AI Q&A Bot</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-blue-600/10 focus:bg-blue-600/20 text-gray-200 hover:text-white">
                  <Link
                    href="/job-track"
                    className="flex items-center gap-2 w-full"
                  >
                    <Briefcase className="h-4 text-blue-400" />
                    <span>Job Track</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "h-10 w-10 border-2 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300",
                  userButtonPopoverCard:
                    "shadow-xl bg-gray-900 border border-cyan-600/20",
                  userPreviewMainIdentifier: "font-semibold text-gray-100",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button
                variant="outline"
                className="border-cyan-600/30 text-gray-200 hover:bg-cyan-600/10 hover:text-white transition-all duration-300"
              >
                <span className="relative">
                  Sign In
                  <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 blur-sm animate-pulse opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                </span>
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>

      {/* Animated particle */}
      <div className="absolute top-1/2 right-4 w-1 h-1 bg-cyan-400/70 rounded-full animate-ping"></div>
    </header>
  );
};

export default Header;

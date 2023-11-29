import {
    BookMarkedIcon,
    CreditCard,
    FolderKanban,
    GraduationCapIcon,
    LogOut,
    PlusCircle,
    Settings,
    User,
    Users2
} from "lucide-react"


import { Button } from "../registry/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "../registry/ui/dropdown-menu"
import {AvatarFallback} from "../registry/ui/avatar";
import {Avatar} from "@radix-ui/react-avatar";
import React, {useState} from "react";
import Api from "../utils/Api";
import {Link} from "react-router-dom";

export function UserNav() {
    const [currentUser, setCurrentUser] = React.useState<string>('1')
    const [currentUserCappitalLetters, setCurrentUserCappitalLetter] = React.useState<string>('1')
    const [currentUserEmail, setCurrentUserEmail] = React.useState<string>('1')
    const [currentUserColor, setCurrentUserColor] = React.useState<string>('1')
    const [currentUserloaded, setCurrentUserloaded] = React.useState<boolean>(false)


    if(!currentUserloaded) {
        getUserData()
    }
    else {
        console.log('currentUser',currentUser)
        console.log('currentUserCappitalLetters',currentUserCappitalLetters)
    }
    async function getUserData() {
        setCurrentUserloaded(true)
        Api.get('/auth/self').then((res) => {
            console.log(res)
            setCurrentUser(res.username)
            setCurrentUserCappitalLetter(res.capitalLetters)
            setCurrentUserEmail(res.email)
            setCurrentUserColor(res.color)
        }).catch((err) => {})
        return;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-accent text-accent-foreground" style={{backgroundColor: currentUserColor}}>
                    <Avatar className="h-8 w-8">
                        <AvatarFallback  style={{backgroundColor: currentUserColor}}>{currentUserCappitalLetters}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{currentUser}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {currentUserEmail}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>
                            <Link to="/settings/profile" >
                                Perfil
                            </Link>
                        </span>
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Users2 className="mr-2 h-4 w-4" />
                        <span>
                            <Link to="/settings/users" >
                                Usuaris
                            </Link>
                        </span>
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FolderKanban className="mr-2 h-4 w-4" />
                        <span>
                            <Link to="/settings/projects" >
                                Projectes
                            </Link>
                        </span>
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <BookMarkedIcon className="mr-2 h-4 w-4" />
                        <span>
                            <Link to="/settings/courses" >
                                Cursos
                            </Link>
                        </span>
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <GraduationCapIcon className="mr-2 h-4 w-4" />
                        <span>
                            <Link to="/settings/subjects" >
                                Assignatures
                            </Link>
                        </span>
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Tancar Sessió</span>
                    <DropdownMenuShortcut></DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

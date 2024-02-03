import { Logo } from "./logo"

import { Actions } from "./actions"

export const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-[49] h-20 bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm" >
            <Logo />
        
            <Actions />
        </nav>
    )
}
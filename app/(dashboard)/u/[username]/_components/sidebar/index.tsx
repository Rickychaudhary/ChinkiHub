import { Wrapper } from "./wrapper"
import { Toggle } from "./toggle"
import { Navigation } from "./navigation"


export const Sidebar = () => {
    return (
        <Wrapper>
            <Toggle />
            <Navigation />
        </Wrapper>
    )
}

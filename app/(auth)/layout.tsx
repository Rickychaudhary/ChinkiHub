import { Logo } from "./_components/logo";


const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full flex flex-col sapce-y-6 items-center justify-center">
            <Logo />
            {children}
        </div>
    );
};

export default AuthLayout;
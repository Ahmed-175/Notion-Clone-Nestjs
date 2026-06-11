import { endpoints } from "@/api/endpoints";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface Props {
    url?: string;
    username: string;
    size?: Size;
}

const sizeClasses: Record<Size, string> = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
};

const UserPicture = ({ url, username, size = "md" }: Props) => {
    const initial = username?.charAt(0).toUpperCase();

    if (url) {
        return (
            <img
                src={`${endpoints.user.picture}/${url}`}
                alt={username}
                className={`${sizeClasses[size]} rounded-full object-cover`}
            />
        );
    }

    return (
        <div
            className={`
        ${sizeClasses[size]}
        rounded-full bg-black text-white
        flex items-center justify-center font-semibold
      `}
        >
            {initial}
        </div>
    );
};

export default UserPicture;
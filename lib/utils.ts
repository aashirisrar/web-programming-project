import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

interface ThemeStyles {
    container: React.CSSProperties;
    text: React.CSSProperties;
    card: React.CSSProperties;
}

export function getThemeStyles(
    theme: string,
    backgroundColor: string,
    textColor: string
): ThemeStyles {
    switch (theme) {
        case "dark":
            return {
                container: {
                    backgroundColor: "#121212",
                },
                text: {
                    color: "#ffffff",
                },
                card: {
                    backgroundColor: "#2d2d2d",
                }
            };
        case "gradient-blue":
            return {
                container: {
                    background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
                },
                text: {
                    color: "#ffffff",
                },
                card: {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                }
            };
        case "gradient-purple":
            return {
                container: {
                    background: "linear-gradient(135deg, #8b5cf6, #4c1d95)",
                },
                text: {
                    color: "#ffffff",
                },
                card: {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                }
            };
        case "minimal":
            return {
                container: {
                    backgroundColor: "#f8f9fa",
                },
                text: {
                    color: "#333333",
                },
                card: {
                    backgroundColor: "#ffffff",
                }
            };
        case "light":
        default:
            return {
                container: {
                    backgroundColor: backgroundColor || "#ffffff",
                },
                text: {
                    color: textColor || "#000000",
                },
                card: {
                    backgroundColor: "#ffffff",
                }
            };
    }
}
export interface userSchema {
    name: string;
    email?: string;
    provider: string;
    usesIP?: boolean;
    IP?: string;
    isBlocked?: boolean;
    reputation: number;
    removedPosts?: number;
}
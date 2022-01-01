export interface Users {
    username: string;
    password: string;
    email: string;
    role: string;
    photo: string;
    posts: posts[];
    suspended: boolean;
    pSuspended: boolean;
}

export interface posts {
    name: string;
    description: string;
    photo: string;
}
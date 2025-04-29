export interface ICheckProfileByEmail {
    check: (email: string) => Promise<boolean>
}
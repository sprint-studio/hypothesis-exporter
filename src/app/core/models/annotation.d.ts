export interface Annotation {
    id: string;
    created: Date;
    user: string;
    uri: string;
    text: string;
    tags: string[];
    target: object;
    document: object;
    links: string[];
    hidden: boolean;
    flagged: boolean;
}
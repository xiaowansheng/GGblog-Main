export type Result<T>={
    code:number;
    message:string;
    data:T|T[]
}


export type PageData<T>={
    total:number;
    list:T[]
}
export interface Job {
    jobName: string;
    opts?: any;
    handle(data: any): Promise<void>;
}

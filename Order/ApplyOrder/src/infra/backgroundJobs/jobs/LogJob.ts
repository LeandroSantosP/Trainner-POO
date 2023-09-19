import { Job } from "./Job";

export class LogJob implements Job {
    jobName: string = "LogJob";
    opts?: any;
    constructor() {}

    async handle(data: any): Promise<void> {
        console.log(data);
    }
}

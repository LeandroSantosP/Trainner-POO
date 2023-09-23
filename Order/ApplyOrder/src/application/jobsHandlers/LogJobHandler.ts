import { Job } from "@/infra/backgroundJobs/jobs/Job";

export class LogJobHandler implements Job {
    jobName: string = "LogJob";
    opts?: any;
    constructor() {}

    async handle(data: any): Promise<void> {
        console.log(data);
    }
}

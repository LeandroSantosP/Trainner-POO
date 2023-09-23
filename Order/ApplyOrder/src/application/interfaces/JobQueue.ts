import { Job } from "@/infra/backgroundJobs/jobs/Job";
import { Queue, Worker } from "bullmq";

export interface JobQueue {
    postOnQueue(jobName: string, data: any): Promise<void>;
    getJobs(): { job: Job; queue: Queue; worker: Worker }[];
}

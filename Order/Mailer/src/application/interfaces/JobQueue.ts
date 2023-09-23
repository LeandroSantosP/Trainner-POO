import { Job } from "@/infra/backgroundJobs/jobs/Job";
import { Queue, Worker } from "bullmq";

export interface JobQueue {
    postOnQueue<D>(jobName: string, data: D, opts?: O): Promise<void>;
    process(): void;
    getJobs(): { job: Job; queue: Queue; worker: Worker }[];
}

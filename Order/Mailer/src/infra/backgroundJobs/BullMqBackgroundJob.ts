import { Queue, Worker, JobsOptions } from "bullmq";
import { Job } from "./jobs/Job";
import { RedisConnection } from "./RedisConnection";
import { JobQueue } from "../../application/interfaces/JobQueue";

export class BullMqBackgroundJob implements JobQueue {
    private readonly jobs: { job: Job; queue: Queue; worker: Worker }[] = [];

    constructor(readonly connection: RedisConnection) {}

    addJobs(job: Job): void {
        const queue = new Queue(job.jobName, { ...job.opts, connection: this.connection });
        const worker = new Worker(
            job.jobName,
            async (context) => {
                const input = context.data;
                await job.handle(input);
            },
            { connection: this.connection }
        );

        this.jobs.push({ job, queue, worker });
    }

    async postOnQueue<D>(jobName: string, data: D, opts?: JobsOptions): Promise<void> {
        const job = this.jobs.find((job) => job.job.jobName === jobName);
        if (!job) {
            throw new Error(`Job ${jobName} not found`);
        }
        const response = await job.queue.add(jobName, data, opts);
    }

    process() {
        for (const job of this.jobs) {
            const worker = job.worker;
            worker.on("failed", (currentJob, error) => {
                console.log("failed", error.message, currentJob?.data);
            });

            worker.on("completed", (currentJob, error) => {
                console.log("completed", error, currentJob.data);
            });
        }
    }

    getJobs() {
        return this.jobs;
    }
}

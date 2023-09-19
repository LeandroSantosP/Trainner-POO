import { JobQueue } from "@/application/interfaces/JobQueue";

export class JobQueueController {
    constructor(readonly jobs: JobQueue) {}

    process() {
        for (const jobForProcess of this.jobs.getJobs()) {
            const worker = jobForProcess.worker;
            worker.on("completed", (job) => {
                console.log(`${job.id} has completed!`);
            });

            worker.on("failed", function (job, err) {
                console.log(`${job?.id} has failed with ${err.message}`);
            });
        }
    }
}

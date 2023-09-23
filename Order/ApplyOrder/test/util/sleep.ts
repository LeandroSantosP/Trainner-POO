export async function sleep(time: number = 300) {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined);
        }, time);
    });
}

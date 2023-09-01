test("testando o jest js", () => {
    expect(1).toBe(1);
});

// function GetPercentage(percentage: number) {
//     let start = Math.ceil(percentage * 10);
//     if (start < 1 || start > 10) start = 10;

//     const possibleStars = {
//         1: "*---------",
//         2: "**--------",
//         3: "***-------",
//         4: "****------",
//         5: "*****-----",
//         6: "******----",
//         7: "*******---",
//         8: "********--",
//         9: "*********-",
//         10: "**********",
//     } as { [key: number]: string };
//     return possibleStars[start];
// }

// function GetPercentage(percentage: number) {
//     let start = Math.ceil(percentage * 10);
//     if (start < 0 || start > 10) start = 10;
//     return "".padStart(start, "*") + "".padStart(10 - start, "-");
// }

function GetPercentage(percentage: number) {
    const disc = new Map();
    let start = Math.ceil(percentage * 10);
    if (start < 0 || start > 10) start = 10;
    if (!disc.has(start)) {
        disc.set(start, "".padStart(start, "*") + "".padStart(10 - start, "-"));
    }
    return disc.get(start);
}

test("test", function () {
    const res = GetPercentage(0.7);
    console.log(res);
});

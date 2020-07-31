const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be positive');
            }
            resolve(a + b);
        }, 2000);
    });
};

const doWork = async () => {
    // throw new Error('Derp');

    const sum = await add(1, 3);
    const sum2 = await add(sum, 50);
    const sum3 = await add(sum2, -3);

    return `Robin has ${sum3} apples.`;
};

doWork()
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

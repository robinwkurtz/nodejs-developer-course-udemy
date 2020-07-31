require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5f245ba388e1f397ffc22e71')
//     .then((task) => {
//         console.log(task);
//         return Task.countDocuments({ completed: false })
//     })
//     .then((result) => console.log(result))
//     .catch((error) => console.log(error));

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });

    return count;
};

deleteTaskAndCount('5f245ba93670439834e19956')
    .then((count) => console.log(count))
    .catch((e) => console.log(e));

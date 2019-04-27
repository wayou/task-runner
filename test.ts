import { TaskRunner } from "./taskRunner";

const runner = new TaskRunner(3, true);

function taskGenerator(taskName: string, time: number) {
  return {
    name: taskName,
    fn: () =>
      new Promise<string>((resolve, _reject) => {
        setTimeout(() => {
          resolve(`result for task ${taskName}`);
        }, time);
      })
  };
}

const errorTask = {
  name: "errroTask",
  fn: () =>
    new Promise<string>((_resolve, reject) => {
      setTimeout(() => {
        reject("errorTask failed");
      }, 3000);
    })
};

[errorTask]
  .concat(
    [...new Array(5).keys()].map((_value, index) =>
      taskGenerator(String(index), Math.random() * 10000 + 1000)
    )
  )
  .forEach(task => runner.addTask(task));

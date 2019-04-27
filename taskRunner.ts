type Task<T> = {
  name?: string;
  fn: () => Promise<T>;
};

export class TaskRunner {
  private queue: Task<any>[] = [];
  private activeTaskNum: number = 0;

  constructor(private limit = 5, public debug = false) {
    if (limit < 1) {
      throw new Error("limit must be interger greater then 1");
    }
  }

  public addTask<T>(task: Task<T>) {
    task.name ? task.name : task.fn.name || this.queue.length || "";
    this.queue.push(task);
    this.runTask();
  }

  private execute<T>(task: Task<T>) {
    this.log(`running ${task.name}`);
    return task
      .fn()
      .then(ressult => {
        this.log(`task ${task.name} finished`);
        return ressult;
      })
      .catch(error => {
        this.log(`${task.name} failed`);
        throw error;
      })
      .finally(() => {
        this.activeTaskNum--;
        this.runTask();
      });
  }

  private runTask() {
    while (this.activeTaskNum < this.limit && this.queue.length > 0) {
      const task = this.queue.shift();
      this.activeTaskNum++;
      this.execute(task!);
    }
  }

  private log(msg: string) {
    if (this.debug) {
      console.info(`[TaskRunner] ${msg}`);
    }
  }
}

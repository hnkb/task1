
export class Person {
    constructor(name, age, gender, world) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.row = 0;
        this.col = 0;

        this.world = world;
        this.task = null;
    }

    tick(elapsed) {
        if (!this.task)
            this.task = this.world.taskList.pickTask();

        if (this.task) {
            this.task.person = this;
            this.task.tick(elapsed);
            if (this.task.state === 'done')
                this.task = null;
        }
    }
}

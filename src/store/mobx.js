import { makeObservable, observable, action } from 'mobx'

class TodoList {
  constructor() {
    // 使用 makeObservable mobx6.0 才会更新视图
    makeObservable(this);
  }
  @observable num = 0;
  @action add = () => {
    this.num++
  }
  @action del = () => {
    this.num--
  }
}

export default new TodoList()

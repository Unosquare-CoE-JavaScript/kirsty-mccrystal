let Action = Object.freeze({
  deposit: 0,
  withdraw: 1,
});

class Command {
  constructor(action, amount) {
    this.action = action;
    this.amount = amount;
    this.success = false;
  }
}

class Account {
  constructor() {
    this.balance = 0;
  }

  process(cmd) {
    // todo
    switch (cmd.action) {
      case Action.deposit:
        this.balance += cmd.amount;
        cmd.success = true;
        break;
      case Action.withdraw:
        cmd.success = this.balance >= cmd.amount;
        if (cmd.success) {
          this.balance -= cmd.amount;
        }
        break;
    }
  }
}

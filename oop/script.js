// "use strict";

const Person = function (firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Do not create method inside constructir
  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
};

const cyrus = new Person("Cyrus", 1998);
const joyce = new Person("Joyce", 2001);

// 1. New empty object {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically returns {}

Person.hey = function () {
  console.log("Hey there");
  console.log(this);
};

// Person.hey();

//PROTOTYPES
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// cyrus.calcAge();

// Person.prototype.species = "Homo Sapiens";
// console.log(cyrus.species, joyce.species);

// console.log(cyrus.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9];
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__);

// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// console.log(arr.unique());

// const h1 = document.querySelector("h1");

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed = this.speed + 10;
//   console.log(this.speed);
// };

// Car.prototype.brake = function () {
//   this.speed = this.speed - 5;
//   console.log(this.speed);
// };

// const bmw = new Car("BMW", 120);
// const mercedes = new Car("Mercedes", 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.accelerate();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();

// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }
//   greet() {
//     console.log(`Hey ${this.firstName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     console.log(name);
//     if (name.includes(" ")) {
//       this._fullName = name;
//     } else {
//       alert(`${name} is not a full name`);
//     }
//   }

//   get fullName() {
//     return this._fullName;
//   }
//   //static method
//   static hey() {
//     console.log("Hey there");
//     console.log(this);
//   }
// }

// const jessica = new PersonCl("Jessica Davis", 2001);
// console.log(jessica);
// jessica.calcAge();
// jessica.greet();
// console.log(jessica.age);

// const max = new PersonCl("Max Verstappen", 2000);

// const account = {
//   owner: "Cyrus",
//   movements: [200, 350, 120, 300],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(movement) {
//     return this.movements.push(movement);
//   },
// };

// console.log(account.latest);

// account.latest = 50;
// console.log(account.movements);
// // PersonCl.hey();

// // const PersonProto = {
// //   calcAge() {
// //     console.log(2037 - this.birthYear);
// //   },

// //   init(firstName, birthYear) {
// //     this.firstName = firstName;
// //     this.birthYear = birthYear;
// //   },
// // };

// // const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = "Steven";
// steven.birthYear = 2002;
// steven.calcAge();

// const pepe = Object.create(PersonProto);
// pepe.init("Pepe", 2000);
// pepe.calcAge();

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed = this.speed + 10;
//     console.log(this.speed);
//   }
//   brake() {
//     this.speed = this.speed - 5;
//     console.log(this.speed);
//   }
//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new CarCl("Ford", 120);
// // console.log(ford.speedUS);
// // ford.accelerate();
// // console.log(ford.speedUS);
// ford.speedUS = 50;
// console.log(ford);

// const Person = function (firstName, birthYear) {
//   //Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// Student.prototype = Object.create(Person.prototype);

// Student.prototype.indroduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const mike = new Student("Mike", 2000, "CS");
// console.log(mike);
// mike.indroduce();
// mike.calcAge();

// //Question 3
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed = this.speed + 10;
//   console.log(this.speed);
// };

// Car.prototype.brake = function () {
//   this.speed = this.speed - 5;
//   console.log(this.speed);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
//   console.log(`Charge is now at ${this.charge}%`);
// };

// EV.prototype.accelerate = function () {
//   this.speed = this.speed + 20;
//   this.charge = this.charge - 1;
//   console.log(
//     `${this.make} is going at ${this.speed}km/h with a charge of ${this.charge}`
//   );
// };

// const tesla = new EV("Tesla", 120, 23);
// tesla.chargeBattery(90);
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.chargeBattery(90);

// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }
//   greet() {
//     console.log(`Hey ${this.firstName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     console.log(name);
//     if (name.includes(" ")) {
//       this._fullName = name;
//     } else {
//       alert(`${name} is not a full name`);
//     }
//   }

//   get fullName() {
//     return this._fullName;
//   }
//   //static method
//   static hey() {
//     console.log("Hey there");
//     console.log(this);
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     //always needs to happen first
//     super(fullName, birthYear);
//     this.course = course;
//   }
//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}`);
//   }
//   calcAge() {
//     console.log(
//       `I am ${2037 - this.birthYear} years, but as a student I feel more like ${
//         2037 - this.birthYear + 10
//       }`
//     );
//   }
// }

// const citrus = new StudentCl("Citrus Mak", 2000, "CS");
// citrus.introduce();
// citrus.calcAge();

//INHERTIANCE WITH OBJECT CREATE
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2000, "CS");
jay.introduce();

class Account {
  //public field
  locale = navigator.language;

  //private field
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    //protected property
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log("Loan Approved");
      return this;
    }
  }
  //private methods
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account("Pepe", "EUR", 1111);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1.pin);

//console.log(acc1.#movements);

//chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);

//const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
//   console.log(`Charge is now at ${this.charge}%`);
// };

// EV.prototype.accelerate = function () {
//   this.speed = this.speed + 20;
//   this.charge = this.charge - 1;
//   console.log(
//     `${this.make} is going at ${this.speed}km/h with a charge of ${this.charge}`
//   );
// };

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed = this.speed + 10;
    console.log(this.speed);
  }
  brake() {
    this.speed = this.speed - 5;
    console.log(this.speed);
    return this;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`Charge is now at ${this.#charge}%`);
    return this;
  }
  accelerate() {
    this.speed = this.speed + 20;
    this.#charge = this.#charge - 1;
    console.log(
      `${this.make} is going at ${this.speed}km/h with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl("Rivian", 120, 23);
rivian.accelerate().chargeBattery(90);

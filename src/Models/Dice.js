export class Dice {
  constructor() {
    this.value = 1;
    this.isRolling = false;
    this.lastRoll = null;
  }
  roll() {
    this.isRolling = true;
    // Simulate rolling animation
    // return new Promise((resolve) => {
    // const rolls = Array.from({ length: 10 }, () => Math.floor(Math.random() * 6) +
    // 1);
    // })
    // Animate dice
    // let rollCount = 0;
    // const animate = () => {
    //   if (rollCount < rolls.length) {
    //     this.value = rolls[rollCount];
    //     rollCount++;
    //     setTimeout(animate, 100);
    //   } else {
    //     this.finishRoll(resolve);
    //   }
    // };
    // animate();
    this.finishRoll()
    return this.value;
  }
  finishRoll() {
    const finalValue = Math.floor(Math.random() * 6) + 1;
    this.value = finalValue;
    this.lastRoll = finalValue;
    this.isRolling = false;
  }
  getValue() {
    return this.value;
  }
  isSix() {
    return this.value === 6;
  }
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promisify =
  fn =>
  (...args) =>
    new Promise((resolve, reject) => {
      args.push((data, err) => {
        if (err) reject(err);
        resolve(data);
      });
      fn(...args);
    });

const rlQuestion = promisify(rl.question.bind(rl));

async function readLine(question) {
  const answer = await rlQuestion(question);
  return answer;
}

module.exports = {
  readLine,
  rl,
};

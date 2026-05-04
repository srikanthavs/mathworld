function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDistractors(correct, count, skillId) {
  const wrongs = new Set();
  const isLarge = skillId === 'addition_two_digit';
  const pool = isLarge
    ? [-11, -9, -5, -3, -2, -1, 1, 2, 3, 5, 9, 11]
    : [-3, -2, -1, 1, 2, 3];

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  for (const off of shuffled) {
    const w = correct + off;
    if (w > 0 && w !== correct && !wrongs.has(w)) {
      wrongs.add(w);
      if (wrongs.size === count) break;
    }
  }
  // Fallback if pool exhausted
  let f = correct + 4;
  while (wrongs.size < count) {
    if (f !== correct && !wrongs.has(f)) wrongs.add(f);
    f++;
  }
  return [...wrongs];
}

export function generateQuestion(skillId) {
  let a, b, answer, text;

  if (skillId === 'addition_single_digit') {
    a = randInt(1, 9);
    b = randInt(1, 9);
    answer = a + b;
    text = `${a} + ${b}`;
  } else if (skillId === 'subtraction_single_digit') {
    a = randInt(3, 9);
    b = randInt(1, a);
    answer = a - b;
    text = `${a} − ${b}`;
  } else if (skillId === 'addition_two_digit') {
    do {
      a = randInt(10, 50);
      b = randInt(5, 30);
    } while (a + b >= 100);
    answer = a + b;
    text = `${a} + ${b}`;
  } else {
    a = randInt(1, 9); b = randInt(1, 9);
    answer = a + b;
    text = `${a} + ${b}`;
  }

  const distractors = generateDistractors(answer, 3, skillId);
  const options = [answer, ...distractors].sort(() => Math.random() - 0.5);

  return { text, answer, options };
}

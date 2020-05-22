/* eslint-disable import/prefer-default-export */
export const shortenHeaderTitle = (name) => {
  const oldName = name.split(' ');
  const newName = [];

  oldName.reduce((acc, cur) => {
    if (acc + cur.length <= 20) {
      newName.push(cur);
    }
    return acc + cur.length;
  }, 0);

  if (newName.length < oldName.length && newName.length !== 0) {
    newName.push(' ...');
  }

  return newName.join(' ');
};

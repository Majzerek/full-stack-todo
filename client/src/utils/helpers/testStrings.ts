export const longString = "a".repeat(100);

// not existing acc
export const passwordNotExist = "test2@TEST";
export const emailNotExist = "testest@gmail.com";
export const emailShort = "a@wp.com";
export const emailLong = `${longString}@gmail.com`;
// admin acc
export const emailAdmin = "admin@gmail.com";
export const correctPass = "qw123QW!@#";

// waiting user
export const emailWaiting = "waiting@gmail.com";

//blocked user
export const emailBlock = "blocked@gmail.com";

// no name
export const name = "noName";
export const surname = "noSurname";

const getTomorow = () => {
  const today = new Date().getTime();
  const day = 1000 * 60 * 60 * 24;
  const tomorrow = new Date(today + day).getDate().toString();
  return tomorrow;
};

export const today = new Date().getDate().toString();
export const tomorrow = getTomorow();

// new task

export const taskTitle = "New one";
export const taskDesc200 =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, dolore eum! Ut cumque consequuntur unde.";
export const hashTag = "Home";

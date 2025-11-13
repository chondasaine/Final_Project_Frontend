const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fakeUsers = [
  {
    email: "test.user1@gmail.com",
    password: "Test1@1234",
    username: "testuser1",
  },
  {
    email: "test.user2@gmail.com",
    password: "Test2@1234",
    username: "testuser2",
  },
  {
    email: "test.user3@gmail.com",
    password: "Test3@1234",
    username: "testuser3",
  },

  {
    email: "chonda.saine@gmail.com",
    password: "Test@1234",
    username: "Chonda",
  },
];

let bookmarks = [];

//Register
export const fakeRegisterUser = async ({ username, email, password }) => {
  await delay(500);

  const emailExists = fakeUsers.some((user) => user.email === email);
  if (emailExists) throw new Error("This email is not available");

  fakeUsers.push({ email, password, username });
  return {
    message: "Registration successfully completed!",
    token: "fake-token",
  };
};

//Login
export const fakeLoginUser = async ({ email, password }) => {
  await delay(500);

  const user = fakeUsers.find(
    (users) => users.email === email && users.password === password
  );
  if (!user) throw new Error("Invalid email or password");

  return {
    message: "Login successful",
    token: "fake-token",
    username: user.username,
  };
};

export const fakeSaveBookmark = async (article) => {
  await delay(200);

  const saved = { ...article, _id: Date.now().toString() };

  bookmarks.push(saved);

  return { message: "Bookmark saved", saved };
};

export const removeFakeSaveBookmark = async (articleId) => {
  await delay(200);

  bookmarks = bookmarks.filter((article) => article._id !== articleId);

  return { message: "Bookmark removed", removedId: articleId };
};

export const getFakeBookmarks = async () => {
  await delay(200);
  return bookmarks;
};

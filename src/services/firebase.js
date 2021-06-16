import { firebase, FieldValue } from "../lib/firebase";
export async function doesUserNameExists(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  // console.log(result.docs.length);
  return result.docs.length;
}

export async function getUserById(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();
  const user = result.docs.map((item) => {
    return {
      ...item.data(),
      docId: item.id,
    };
  });
  return user;
}

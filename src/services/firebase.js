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

export async function getUserSuggestions(following = [], userId) {
  const result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function updateFollower(uid, userId, followerId) {
  const ans = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", uid)
    .get();
  const followers = ans.docs[0].data().followers;
  console.log("followers ", followers);
  const result = await firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .update({
      followers: [...followers, followerId],
    });
}
export async function updateFollowing(uid, userId, followId) {
  const ans = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", uid)
    .get();
  const following = ans.docs[0].data().following;
  console.log("following ", following);
  const result = await firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .update({
      following: [...following, followId],
    });
  return;
}

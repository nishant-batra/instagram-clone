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

export async function updateFollower(idToFollow, docIdToFollow, followerId) {
  const ans = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", idToFollow)
    .get();
  let followers = ans.docs[0].data().followers;
  if (followers.includes(followerId)) {
    followers = followers
      .map((follower) => follower)
      .filter((id) => id !== followerId);
  } else followers = [...followers, followerId];
  console.log("followers ", followers);
  const result = await firebase
    .firestore()
    .collection("users")
    .doc(docIdToFollow)
    .update({
      followers: followers,
    });
}
export async function updateFollowing(userId, userDocID, followedId) {
  const ans = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();
  let following = ans.docs[0].data().following;
  if (following.includes(followedId)) {
    following = following
      .map((follow) => follow)
      .filter((id) => id !== followedId);
  } else following = [...following, followedId];
  console.log("following ", following);
  const result = await firebase
    .firestore()
    .collection("users")
    .doc(userDocID)
    .update({
      following: following,
    });
  return;
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();
  const userFollowedPhotos = result.docs.map((photo) => {
    return {
      ...photo.data(),
      docId: photo.id,
    };
  });
  const photosWithUSerDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserById(photo.userId);
      const { username } = user[0];
      photo = { ...photo, userLikedPhoto, username };
      //  console.log("photo", photo);
      return photo;
    })
  );
  return photosWithUSerDetails;
}
export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  return result.docs.map((item) => {
    return {
      ...item.data(),
      docId: item.id,
    };
  });
}

export async function getPhotosByUsername(username) {
  const [{ userId }] = await getUserByUsername(username);
 // console.log("userid", userId);
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();
  return result.docs.map((item) => {
    return {
      ...item.data(),
      docId: item.id,
    };
  });
}

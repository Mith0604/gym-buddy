
// user.js

// USER MODULE FUNCTIONS

// User login using Firebase Authentication
function userLogin(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      logAction("User Login", { email: email, uid: userCredential.user.uid });
      // Redirect to user dashboard after login (adjust URL as needed)
      window.location.href = "user_dashboard.html";
    })
    .catch((error) => {
      logAction("User Login Error", error);
      alert("Login failed: " + error.message);
    });
}

// View user details (for example, user profile or gym details)
function viewDetails(userId) {
  db.collection('users').doc(userId).get()
    .then((doc) => {
      if (doc.exists) {
        logAction("View Details", { userId: userId, details: doc.data() });
        console.log("User Details:", doc.data());
        // Render user details in the UI as needed.
      } else {
        logAction("View Details", { userId: userId, error: "User not found" });
        alert("User not found.");
      }
    })
    .catch((error) => {
      logAction("View Details Error", error);
      alert("Error fetching details: " + error.message);
    });
}

// Search records across a collection (for example, search members by name)
function searchRecords(collectionName, field, queryValue) {
  db.collection(collectionName).where(field, '==', queryValue).get()
    .then((querySnapshot) => {
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      logAction("Search Records", { collection: collectionName, field: field, query: queryValue, results: results });
      console.log("Search Results:", results);
      // Render search results in the UI as needed.
    })
    .catch((error) => {
      logAction("Search Records Error", error);
      alert("Error searching records: " + error.message);
    });
}

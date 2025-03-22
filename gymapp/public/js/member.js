// member.js

// MEMBER MODULE FUNCTIONS

// Member login using Firebase Authentication
function memberLogin(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      logAction("Member Login", { email: email, uid: userCredential.user.uid });
      // Redirect to member dashboard after login (adjust URL as needed)
      window.location.href = "member_dashboard.html";
    })
    .catch((error) => {
      logAction("Member Login Error", error);
      alert("Login failed: " + error.message);
    });
}

// View bill receipts for the logged in member
function viewBillReceipts(memberId) {
  db.collection('bills').where('memberId', '==', memberId).get()
    .then((querySnapshot) => {
      const bills = [];
      querySnapshot.forEach((doc) => {
        bills.push({ id: doc.id, ...doc.data() });
      });
      logAction("View Bill Receipts", { memberId: memberId, bills: bills });
      console.log("Bill Receipts:", bills);
      // Render the bills data in the member dashboard as needed.
    })
    .catch((error) => {
      logAction("View Bill Receipts Error", error);
      alert("Error fetching bill receipts: " + error.message);
    });
}

// View bill notifications for the logged in member
function viewBillNotifications(memberId) {
  db.collection('members').doc(memberId).get()
    .then((doc) => {
      if (doc.exists) {
        const notifications = doc.data().notifications || [];
        logAction("View Bill Notifications", { memberId: memberId, notifications: notifications });
        console.log("Bill Notifications:", notifications);
        // Render notifications in the UI as needed.
      } else {
        logAction("View Bill Notifications", { memberId: memberId, error: "Member not found" });
        alert("Member record not found.");
      }
    })
    .catch((error) => {
      logAction("View Bill Notifications Error", error);
      alert("Error fetching notifications: " + error.message);
    });
}

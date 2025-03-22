// admin.js

// ADMIN MODULE FUNCTIONS

// Admin login using Firebase Authentication
function adminLogin(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      logAction("Admin Login", { email: email, uid: userCredential.user.uid });
      // Redirect to admin dashboard after login (adjust URL as needed)
      window.location.href = "admin_dashboard.html";
    })
    .catch((error) => {
      logAction("Admin Login Error", error);
      alert("Login failed: " + error.message);
    });
}

// Add a new member to the "members" collection
function addMember(memberData) {
  db.collection('members').add(memberData)
    .then((docRef) => {
      logAction("Add Member", { memberId: docRef.id, data: memberData });
      alert("Member added successfully!");
    })
    .catch((error) => {
      logAction("Add Member Error", error);
      alert("Error adding member: " + error.message);
    });
}

// Update an existing member's details
function updateMember(memberId, updatedData) {
  db.collection('members').doc(memberId).update(updatedData)
    .then(() => {
      logAction("Update Member", { memberId: memberId, updatedData: updatedData });
      alert("Member updated successfully!");
    })
    .catch((error) => {
      logAction("Update Member Error", error);
      alert("Error updating member: " + error.message);
    });
}

// Delete a member record
function deleteMember(memberId) {
  db.collection('members').doc(memberId).delete()
    .then(() => {
      logAction("Delete Member", { memberId: memberId });
      alert("Member deleted successfully!");
    })
    .catch((error) => {
      logAction("Delete Member Error", error);
      alert("Error deleting member: " + error.message);
    });
}

// Create a bill record
function createBill(billData) {
  db.collection('bills').add(billData)
    .then((docRef) => {
      logAction("Create Bill", { billId: docRef.id, billData: billData });
      alert("Bill created successfully!");
    })
    .catch((error) => {
      logAction("Create Bill Error", error);
      alert("Error creating bill: " + error.message);
    });
}

// Assign a fee package to a member by updating their document
function assignFeePackage(memberId, feePackage) {
  db.collection('members').doc(memberId).update({ feePackage: feePackage })
    .then(() => {
      logAction("Assign Fee Package", { memberId: memberId, feePackage: feePackage });
      alert("Fee package assigned!");
    })
    .catch((error) => {
      logAction("Assign Fee Package Error", error);
      alert("Error assigning fee package: " + error.message);
    });
}

// Assign monthly notifications (e.g., add to notifications array)
function assignNotification(memberId, notification) {
  db.collection('members').doc(memberId).update({
    notifications: firebase.firestore.FieldValue.arrayUnion(notification)
  })
    .then(() => {
      logAction("Assign Notification", { memberId: memberId, notification: notification });
      alert("Notification assigned!");
    })
    .catch((error) => {
      logAction("Assign Notification Error", error);
      alert("Error assigning notification: " + error.message);
    });
}

// Export report of a given collection (e.g., members, bills)
function exportReport(collectionName) {
  db.collection(collectionName).get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      // Simple CSV conversion
      const csvContent = data.map(row => Object.values(row).join(",")).join("\n");
      logAction("Export Report", { collection: collectionName, csvContent: csvContent });
      console.log("CSV Report:\n", csvContent);
      alert("Report exported! Check console for CSV output.");
    })
    .catch((error) => {
      logAction("Export Report Error", error);
      alert("Error exporting report: " + error.message);
    });
}

// (Optional) Additional admin functions for supplement store or diet details can be added here.

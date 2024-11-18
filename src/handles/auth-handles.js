import { showError, showAlert } from '../utils/validation.js';
import { registerUser, loginUser, logoutUser,  auth, database } from '../config/firebaseConfig.js';
import { ref, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";


  $(document).ready(function () {

  // Register Form Handler
  $('#register').on('submit', async function(e) {
    e.preventDefault();
    console.log('hanlde');
    
    $('.is-invalid').removeClass('is-invalid');
    
    const fullname = $('#fullname').val().trim();
    const username = $('#username').val().trim();
    const email = $('#registerEmail').val().trim();
    const password = $('#registerPassword').val();
    const confirmPassword = $('#confirmPassword').val();

    // Validation
    let isValid = true;

    if (!fullname) {
      showError('#fullname', 'Full name is required');
      isValid = false;
    }

    if (!username) {
      showError('#username', 'Username is required');
      isValid = false;
    }

    if (!email) {
      showError('#registerEmail', 'Email is required');
      isValid = false;
    }

    if (!password) {
      showError('#registerPassword', 'Password is required');
      isValid = false;
    }

    if (password !== confirmPassword) {
      showError('#confirmPassword', "Passwords don't match!");
      isValid = false;
    }

    if (!isValid) return;

    try {
     const req = await registerUser(email, password, { fullname, username, email });
      req && showAlert('success', 'Registration successful!', '#register');
      this.reset();
    } catch (error) {
      showAlert('danger', error.message, '#register');
    }
  });

  // Login Form Handler
  $('#login').on('submit', async function(e) {
    e.preventDefault();
    
    $('.is-invalid').removeClass('is-invalid');
    
    const email = $('#loginEmail').val().trim();
    const password = $('#loginPassword').val();

    // Validation
    let isValid = true;

    if (!email) {
      showError('#loginEmail', 'Email is required');
      isValid = false;
    }

    if (!password) {
      showError('#loginPassword', 'Password is required');
      isValid = false;
    }

    if (!isValid) return;

    try {
      const req = await loginUser(email, password);
      console.log(req);
      if (auth.currentUser) {
        console.log("User is logged in:", auth.currentUser);
    } else {
        console.log("No user is logged in.");
    }
    window.location.href = '/';
      showAlert('success', 'Login successful!', '#login');
      this.reset();
    } catch (error) {
      showAlert('danger', error.message, '#login');
    }
  });


  $('.signout-btn').on('click', function () {
    logoutUser();
    window.location.href = '/login.html';
  });




$('#name').on('input', function () {
  sendDataToFirebase('name', $(this).val());
});

$('#phone').on('input', function () {
  sendDataToFirebase('phone', $(this).val());
});

$('#address').on('input', function () {
  sendDataToFirebase('address', $(this).val());
});

$('#payment').on('change', function () {
  sendDataToFirebase('payment_method', $(this).val());
});
});

export function sendDataToFirebase(fieldId, value) {
  const user = auth.currentUser; // Kiểm tra người dùng hiện tại
  console.log(user);
  
  if (user) {
      const uid = user.uid; // Lấy UID của người dùng
      const userRef = ref(database, 'users/' + uid); // Tham chiếu đến dữ liệu người dùng theo UID
      
      update(userRef, { [fieldId]: value })
          .then(() => console.log(`${fieldId} updated successfully.`))
          .catch((error) => console.error("Error updating data:", error));
  } else {
      console.error("No user is logged in.");
  }
}
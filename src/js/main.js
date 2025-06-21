// API'den veri çeken fonksiyon
import { fetchImages } from './api';
// Görsel kartları HTML'e dönüştüren fonksiyon
import { createGalleryMarkup } from './markup';

// Işık kutusu (lightbox) ile büyük görsel gösterimi için eklenti
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Uyarı ve bilgi mesajları için iziToast kütüphanesi
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// DOM öğelerini seçiyoruz
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

// Uygulama durumu için değişkenler
let searchQuery = '';
let currentPage = 1;
let totalHits = 0;
let lightbox;

// Form gönderildiğinde çalışacak olay
form.addEventListener('submit', async event => {
  event.preventDefault(); // Sayfa yenilenmesini engelle

  // Kullanıcının yazdığı arama terimini al
  searchQuery = form.elements.searchQuery.value.trim();

  // Eğer boşsa uyarı göster
  if (!searchQuery) {
    iziToast.warning({
      title: 'Oops!',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  // Input'u geçici olarak devre dışı bırak ve görsel olarak pasifleştir
  form.elements.searchQuery.disabled = true;
  form.elements.searchQuery.style.opacity = '0.5';

  // Önceki sonuçları temizle, sayfayı sıfırla, butonu ve loader'ı ayarla
  gallery.innerHTML = '';
  currentPage = 1;
  loadMoreBtn.classList.add('hidden');
  loader.classList.remove('hidden');

  try {
    // API'den sonuçları çek
    const data = await fetchImages(searchQuery, currentPage);
    totalHits = data.totalHits;

    // Eğer hiç sonuç yoksa uyarı göster
    if (data.hits.length === 0) {
      iziToast.error({
        message: 'No images found. Try another keyword.',
        position: 'topRight',
      });
      return;
    }

    // Galeri HTML'ini oluşturup ekle
    const markup = createGalleryMarkup(data.hits);
    gallery.innerHTML = markup;

    // Lightbox başlat veya yenile
    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a');
    } else {
      lightbox.refresh();
    }

    // Eğer toplam sonuç sayısı 40'tan fazlaysa "Load More" butonunu göster
    if (totalHits > 40) {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    // API'den veri alınamadıysa uyarı ver
    iziToast.error({
      message: 'Error fetching images',
      position: 'topRight',
    });
  } finally {
    // Loader'ı gizle ve input'u tekrar aktif hale getir
    loader.classList.add('hidden');
    form.elements.searchQuery.disabled = false;
    form.elements.searchQuery.style.opacity = '1';
    form.reset(); // Input'u temizle
  }
});

// "Load More" butonuna tıklandığında
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1; // Sayfayı artır
  loader.classList.remove('hidden'); // Yükleniyor göstergesi

  try {
    // Yeni sayfa verilerini al
    const data = await fetchImages(searchQuery, currentPage);
    const markup = createGalleryMarkup(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup); // Yeni görselleri ekle

    lightbox.refresh(); // Yeni öğeler için lightbox güncelle

    // Son sayfaya ulaşıldıysa "Load More" butonunu gizle ve bilgi ver
    const totalPages = Math.ceil(totalHits / 40);
    if (currentPage >= totalPages) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        message: "You've reached the end of the results.",
        position: 'topRight',
      });
    }

    scrollToNewContent(); // Sayfa aşağı kaydırılsın
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images',
      position: 'topRight',
    });
  } finally {
    loader.classList.add('hidden');
  }
});

// Yeni içerik geldikçe sayfayı yumuşakça aşağı kaydırır
function scrollToNewContent() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

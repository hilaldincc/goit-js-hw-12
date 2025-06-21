// Görsel verilerini HTML formatında galeri kartlarına çeviren fonksiyon
export function createGalleryMarkup(images) {
  return images
    .map(image => {
      // Her bir görsel için <a> etiketi içinde resim ve bilgileri döndür
      return `
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" />
            
            <div class="card-info">
              <div class="info-block">
                <p class="label">Likes</p>
                <p class="value">${image.likes}</p>
              </div>
              <div class="info-block">
                <p class="label">Views</p>
                <p class="value">${image.views}</p>
              </div>
              <div class="info-block">
                <p class="label">Comments</p>
                <p class="value">${image.comments}</p>
              </div>
              <div class="info-block">
                <p class="label">Downloads</p>
                <p class="value">${image.downloads}</p>
              </div>
            </div>
          </a>
        `;
    })
    .join(''); // Tüm görsellerin HTML'lerini birleştirip string olarak döndür
}

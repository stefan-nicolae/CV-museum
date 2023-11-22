$(document).ready(function(){
    var galleryArray = [];

    $("section").each(function(){
        var sectionTitle = $(this).find('h3').text();
        var sectionId = $(this).find('h3').attr('id');
        var firstImageSrc = $(this).find('.gallery img:first').attr('src');
        
        var galleryObject = {
        name: sectionTitle,
        galleryId: sectionId,
        firstImageSrc: firstImageSrc
        };

        galleryArray.push(galleryObject);
    });

    galleryArray.shift()

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000, // Set the delay between slides in milliseconds (e.g., 3000 for 3 seconds)
            disableOnInteraction: false, // Keep autoplay running even when user interacts with slides
        },
    });

    function populateSwiper() {
        galleryArray.forEach(function(item) {
            var slide = `
                <div class="swiper-slide">
                    <h3>${item.name}</h3>
                    <img src="${item.firstImageSrc}" alt="${item.name}">
                    <a href="#${item.galleryId}"></a>
                </div>
            `;
            $(".swiper-wrapper").append(slide)
        });
    }

    populateSwiper();
});


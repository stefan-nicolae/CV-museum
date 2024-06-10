$(document).ready(function(){
    var galleryArray = [];

    $("section").each(function(){
        var sectionTitle = $(this).find('h3').text();
        var sectionId = $(this).attr('id');
        var firstImageSrc = $(this).find('.gallery img:first').attr('src');
        
        var galleryObject = {
            h3: $(this).find('h3'),
            name: sectionTitle,
            galleryId: sectionId,
            firstImageSrc: firstImageSrc
        };

        galleryArray.push(galleryObject);
    });

    galleryArray.shift()
    galleryArray.shift()

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: "4px",
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000, 
            disableOnInteraction: false, 
        },
    });

    galleryArray.forEach(function(item) {
        $("#table-of-contents").find("ul").append(`<li><a href="#${item.galleryId}">${item.h3.html()}</a></li>`)
    })

    galleryArray.shift()

    function populateSwiper() {
        galleryArray.forEach(function(item) {
            var slide = `
                <div class="swiper-slide">
                    <h3>${item.name}</h3>
                    <img src="${item.firstImageSrc}" alt="${item.name}">
                    <a href="#${item.galleryId}"></a>
                    <iconify-icon icon="gridicons:arrow-down"></iconify-icon>
                </div>
            `;
            $(".swiper-wrapper").append(slide)
        });
    }

    populateSwiper();

    const iconElement = $('<iconify-icon>')
    .attr('icon', 'gridicons:arrow-down') 
    .addClass('link-icon')

    $('.gotoLink').before(iconElement);
});


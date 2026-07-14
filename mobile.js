$(document).ready(function() {
    let dataUpdated = false

    function updateData() {
        const isMobile = window.matchMedia("(max-width: 1000px)").matches;

        if (isMobile) {
            //run just once
            if(!dataUpdated) {
                $("section").each(function() {
                    const section = $(this);
            
                    //INITIALIZE IMGDATA, TEXTDATA
                    const imgData = section.find("img").map(function() {
                        return $(this).attr("src");
                    }).get(); 
    
                    let textData
    
                    section.find(".content").each(function() {
                        if($(this).find("h3").length) {
                            textData = $(this).html()
                        }
                    })
    
                    //CREATE MOBILETEXT
                    const mobileText = $('<div>', {
                        class: 'mobile-text',
                    });
    
                    mobileText.html(textData)
    
                    //CREATE MOBILEIMAGES
                    const mobileImages = $('<div>', {
                        class: 'mobile-img'
                    })
    
                    imgData.forEach(src => {
                        const imgElement = $('<img>').attr('src', src);
                        mobileImages.append(imgElement);
                    });
    
                    //APPEND
                    if(section.attr('id') === "banner" || section.attr('id') === "table-of-contents" ) {} else section.after(mobileImages)
                    section.after(mobileText)
                    section.before('<hr>');
                    
                });    
                dataUpdated = true     
            }
            //run every time
            $(".square").hide()
            $(".mobile-text").show()
            $(".mobile-img").show()
            $("hr").show()

        } else {
            //run every time
            $(".square").show()
            $(".mobile-text").hide()
            $(".mobile-img").hide()
            $("hr").hide()
        }
    }
    
     
    updateData();
    $(window).resize(updateData);
});

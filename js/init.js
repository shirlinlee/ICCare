const init = {
  $body: $("body"),
  $lb: $(".lb"),
  navHandler: function () {
    init.$body.on("click", ".menu-open-button", function () {
      $(".menu-open-button,.nav").toggleClass("active");
    });

    init.$body.on("mouseenter", ".has_sub", function (e) {
      $(".dropdown").fadeIn(200);
    });

    init.$body.on("mouseleave", ".has_sub", function (e) {
      $(".dropdown").hide();
    });
  },

  agreeTerm(number) {
    console.log(number);
    document.cookie = `term${number}=1`;
    window.location = "contract.html";
  },

  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    // console.log(ca);
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  currentPage: 1,
  pagesHandler: function () {
    const pages_length = $(".pages li").length - 2;
    init.$body.on("click", ".pages li", function () {
      $(".pages li").removeClass("active");
      if ($(this).hasClass("arrow")) {
        if ($(this).hasClass("prev")) {
          $(
            `.page${init.currentPage === 1 ? 1 : init.currentPage - 1}`,
          ).addClass("active");
          init.currentPage = init.currentPage === 1 ? 1 : init.currentPage - 1;
        } else {
          $(
            `.page${
              init.currentPage === pages_length
                ? pages_length
                : init.currentPage + 1
            }`,
          ).addClass("active");
          init.currentPage =
            init.currentPage === pages_length
              ? pages_length
              : init.currentPage + 1;
        }
      } else {
        init.currentPage = Number($(this).attr("class").replace("page", ""));
        $(this).addClass("active");
      }
    });
  },
};

$(function () {
  init.navHandler();
});

const init = {
  $body: $("body"),
  $lb: $(".lb"),
  navHandler: function () {
    init.$body.on("click", ".menu-open-button", function () {
      $(".menu-open-button,.nav").toggleClass("active");
    });

    init.$body.on("mouseenter", ".has_sub", function (e) {
      $(this).find(".dropdown").fadeIn(200);
    });

    init.$body.on("mouseleave", ".has_sub", function (e) {
      $(this).find(".dropdown").hide();
    });

    init.$body.on("click", ".open_sub", function () {
      $(this).find("ul").toggleClass("active");
    });
  },

  agreeTerm(number) {
    console.log(number);
    document.cookie = `term${number}=1`;
    window.location = "contract.html";
  },

  getHealthForm(boolean) {
    document.cookie = `getHealthForm=boolean`;
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
            `.page${init.currentPage === 1 ? 1 : init.currentPage - 1}`
          ).addClass("active");
          init.currentPage = init.currentPage === 1 ? 1 : init.currentPage - 1;
        } else {
          $(
            `.page${
              init.currentPage === pages_length
                ? pages_length
                : init.currentPage + 1
            }`
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
  langDetect() {
    const isEnVersion = window && window.location.pathname.indexOf("/en") > -1;
    console.log(isEnVersion);
    if (isEnVersion) {
      init.$body.addClass("en");
    } else {
      init.$body.removeClass("en");
    }
  },
  policyHandler: function () {
    var policy_name;
    $("#footer").on("click", "a", function () {
      var policy_name = $(this).attr("class");
      if ($(`#${policy_name}_lb`).length === 0) {
        $.ajax({
          url: `./../${policy_name}_policy.html`,
          success: function (response) {
            init.$body.append(response).ready(function () {
              $(`#${policy_name}_lb`).addClass("open");
              $("html, body").addClass("scrollHide");
            });
          },
          error: function (xhr) {
            alert("發生錯誤: " + xhr.status + " " + xhr.statusText);
          },
        });
      } else {
        $(`#${policy_name}_lb`).addClass("open");
        $("html, body").addClass("scrollHide");
      }
    });

    init.$body.on("click", ".close_lb", function () {
      $(`#${policy_name}_lb`).removeClass("open");
      $("html, body").removeClass("scrollHide");
    });
  },
};

$(function () {
  init.navHandler();
  init.langDetect();
  init.policyHandler();
});

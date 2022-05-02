const init = {
  $body: $("body"),
  $lb: $(".lb"),
  navHandler: function () {
    console.log(22);
    init.$body.on("click", ".menu-open-button", function () {
      $(".menu-open-button,.nav").toggleClass("active");
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
};

$(function () {
  console.log(11);
  init.navHandler();
});

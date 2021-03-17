$("#menubar-toogle").click((e) => {
  let url = e.target.src;
  let new_url;
  if (url.includes("menubar")) {
    new_url = url.replace("menubar", "cross");
    $("span.header-links").css({ height: "38.55vh" });
  } else if (url.includes("cross")) {
    new_url = url.replace("cross", "menubar");
    $("span.header-links").css({ height: "0vh" });
  }
  $("#menubar-toogle").attr("src", new_url);
});

$("div.expand").click(() => {
  let height = $("div.services-container").height();
  if (height === 0) {
    $("div.services-container").css({ height: "auto" });
    $("img.expand-arrow").css({ transform: "rotate(270deg)" });
    $("h3.expand").text("Weniger lesen");
  } else {
    $("div.services-container").css({ height: "0" });
    $("img.expand-arrow").css({ transform: "rotate(90deg)" });
    $("h3.expand").text("Mehr lesen");
  }
});

$("div.expand-portal").click(() => {
  let height = $("div.point-expand").height();
  if (height === 0) {
    $("div.point-expand").css({ height: "auto" });
    $("div.expand-portal img.expand-arrow").css({
      transform: "rotate(270deg)",
    });
    $("div.expand-portal h3.expand").text("Weniger lesen");
  } else {
    $("div.point-expand").css({ height: "0" });
    $("div.expand-portal img.expand-arrow").css({ transform: "rotate(90deg)" });
    $("div.expand-portal h3.expand").text("Mehr lesen");
  }
});

$("div.expand-about").click(() => {
  let height = $("div.about-right-expander").height();

  if (height === 117) {
    $("div.about-right-expander").css({ height: "auto" });
    $("div.expand-about img.expand-arrow").css({ transform: "rotate(270deg)" });
    $("div.expand-about h3.expand").text("Weniger lesen");
  } else {
    $("div.about-right-expander").css({ height: "7.3rem" });
    $("div.expand-about img.expand-arrow").css({ transform: "rotate(90deg)" });
    $("div.expand-about h3.expand").text("Mehr lesen");
  }
});

$("#frm1").click(() => {
  $("div.form-buttons .active").removeClass("active");
  $("#frm1").addClass("active");

  $("div.forms form.active").removeClass("active");
  $("#form1").addClass("active");
});
$("#frm2").click(() => {
  $("div.form-buttons .active").removeClass("active");
  $("#frm2").addClass("active");

  $("div.forms form.active").removeClass("active");
  $("#form2").addClass("active");
});
$("#frm3").click(() => {
  $("div.form-buttons .active").removeClass("active");
  $("#frm3").addClass("active");

  $("div.forms form.active").removeClass("active");
  $("#form3").addClass("active");
});

createCarousel("carousel", "slides-container", 2);

function doCarousel() {
  createCarousel("benifit_carousel__container", "benifit-container", 4);
  createCarousel("about-slide-container", "about-left", 3);
  createCarousel("owner-carousel-container", "owner-container", 2);
  createCarousel("certificate-carousel-container", "certificate-container", 4);
}

function stopCarousel() {
  $(".carousel-container").removeClass("carousel-container");
  let div_parent = $(".carousel-slide-container").removeClass(
    "carousel-slide-container"
  );
  div_parent.css({ width: "100%", transform: "translateX(0%)" });
  $(".indicator-container").remove();
  createCarousel("carousel", "slides-container", 2);
}

if ($(window).width() < 800) {
  doCarousel();
}
$(window).resize(function () {
  if ($(window).width() < 800) {
    doCarousel();
    $("div.services-container").css({ height: "0", overflow: "hidden" });
  }
  if ($(window).width() > 800) {
    stopCarousel();
    $("div.services-container").css({ height: "auto" });
  }
});

function createCarousel(parentContainer, parent, childs) {
  //add carousel classes
  let div_parentContainer = $(`#${parentContainer}`).addClass(
    "carousel-container"
  );
  let div_parent = $(`#${parent}`).addClass("carousel-slide-container");
  let carousel_position = 0;
  let div_parent_swipe = document.querySelector(`#${parent}`);

  //Variables to manage swipe
  let isClicked = 0;
  let firstMove = 0;
  let startPoint;

  //adding events for swipe to move using mouse
  div_parent_swipe.addEventListener("mousedown", (e) => {
    isClicked = 1;
    startPoint = e.pageX;
  });

  div_parent_swipe.addEventListener("mouseup", () => {
    isClicked = 0;
    firstMove = 0;
  });

  div_parent_swipe.addEventListener("mouseleave", () => {
    isClicked = 0;
  });

  div_parent_swipe.addEventListener("mousemove", (e) => {
    e.preventDefault();
    if (isClicked === 1) {
      let x = e.pageX - startPoint;
      if ((x === 50 || x > 50) && firstMove === 0) {
        movePrev();
        firstMove = 1;
      } else if ((x === -50 || x < -50) && firstMove === 0) {
        moveNext();
        firstMove = 1;
      }
    }
  });

  //adding events for swipe to move using touches
  div_parent_swipe.addEventListener("touchstart", (e) => {
    isClicked = 1;
    startPoint = e.touches[0].pageX;
  });

  div_parent_swipe.addEventListener("touchend", () => {
    isClicked = 0;
    firstMove = 0;
  });

  div_parent_swipe.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (isClicked === 1) {
      let x = e.touches[0].pageX - startPoint;
      if ((x === 50 || x > 50) && firstMove === 0) {
        movePrev();
        firstMove = 1;
      } else if ((x === -50 || x < -50) && firstMove === 0) {
        moveNext();
        firstMove = 1;
      }
    }
  });

  //set proper width
  div_parent.css({ width: `${childs * 100}%` });
  // console.log({ div_parentContainer, div_parent })

  //create indicators
  let indicators = createIndicators(childs);
  let indicator_childs = indicators.children;
  for (let i = 0; i < childs; i++) {
    indicator_childs[i].addEventListener("click", (e) => moveCarousel(i));
  }

  //add control
  function moveCarousel(position) {
    $(`#${parentContainer} div.indicator-container button`).removeClass(
      "active-indicator"
    );

    console.log({ carousel_position, position });
    div_parent.css({ transform: `translateX(-${(100 / childs) * position}%)` });
    indicator_childs[position].classList.add("active-indicator");
    carousel_position = position;
  }

  function moveNext() {
    if (carousel_position != childs - 1) {
      moveCarousel(++carousel_position);
    } else if ((carousel_position = childs - 1)) {
      moveCarousel(0);
    }
  }

  function movePrev() {
    if (carousel_position != 0) {
      moveCarousel(--carousel_position);
    } else if (carousel_position === 0) {
      moveCarousel(childs - 1);
    }
  }

  let hasIndicators = div_parentContainer.has(".indicator-container").length;
  if (hasIndicators === 0) div_parentContainer.append(indicators);
}

function createIndicators(childs) {
  let div_indicators = document.createElement("div");
  div_indicators.classList.add("indicator-container");
  for (let i = 0; i < childs; i++) {
    let btn_indicator = document.createElement("button");
    if (i === 0) btn_indicator.classList.add("active-indicator");
    btn_indicator.setAttribute("id", `indicator-${i}`);
    btn_indicator.classList.add("indicator");
    div_indicators.appendChild(btn_indicator);
  }
  return div_indicators;
}

"use strict";

const MEDIA_QUERY_767 = window.matchMedia("(max-width: 767px;)");
const MEDIA_QUERY_992 = window.matchMedia("(max-width: 992px;)");

const initLozad = () => {
  const lozadElements = document.querySelectorAll("[data-lozad]");

  if (!lozadElements) return;

  lozadElements.forEach((element) => {
    const lozadObserver = lozad(element);

    lozadObserver.observe();
  });
};

const initAllReviewsSearch = () => {
  const allReviewsSearch = document.querySelector(".all-reviews__search");

  if (!allReviewsSearch) return;

  const allReviewsSearchInput = allReviewsSearch.querySelector(
    ".all-reviews__search-input"
  );
  const allReviewsSearchDropdown = allReviewsSearch.querySelector(
    ".all-reviews__search-dropdown"
  );

  allReviewsSearchInput.addEventListener("focus", () =>
    allReviewsSearchDropdown.classList.add("is-visible")
  );

  window.addEventListener("click", (e) => {
    const { target } = e;
    const isInDropdown = target.closest(".all-reviews__search-dropdown");

    if (isInDropdown === null && target !== allReviewsSearchInput) {
      allReviewsSearchInput.blur();
      allReviewsSearchDropdown.classList.remove("is-visible");
    }
  });
};

const initResetPassword = () => {
  const authorizationPopup = document.querySelector(".authorization-popup");

  if (!authorizationPopup) return;

  const authorizationPopupTabs = authorizationPopup.querySelector(
    ".authorization-popup__tabs"
  );
  const authorizationPopupContents = authorizationPopup.querySelectorAll(
    ".authorization-popup__content"
  );
  const authorizationPopupResetPasswordButton =
    authorizationPopup.querySelector(".authorization-popup__form-forget");
  const authorizationPopupResetPassword = authorizationPopup.querySelector(
    ".authorization-popup__reset"
  );

  observeAuthorizationPopup();
  if (authorizationPopupResetPasswordButton)
    authorizationPopupResetPasswordButton.addEventListener(
      "click",
      handleResetPasswordClick
    );

  function observeAuthorizationPopup() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const { target } = mutation;

        if (
          !target.classList.contains("is-visible") &&
          authorizationPopupResetPassword.classList.contains("is-visible")
        ) {
          const popupContentEntrance = Array.from(
            authorizationPopupContents
          ).find((item) => item.dataset.tabcontent === "entrance");

          authorizationPopupTabs.classList.remove("is-hidden");
          authorizationPopupResetPassword.classList.remove("is-visible");
          popupContentEntrance.classList.add("is-active");
        }
      });
    });

    observer.observe(authorizationPopup, {
      attributes: true,
    });
  }

  function handleResetPasswordClick() {
    authorizationPopupContents.forEach((content) =>
      content.classList.remove("is-active")
    );
    authorizationPopupTabs.classList.add("is-hidden");
    authorizationPopupResetPassword.classList.add("is-visible");
  }
};

const initTotalizator = () => {
  const totalizator = document.querySelector(".totalizator");

  if (!totalizator) return;

  initChoosingBet();
  initAllTours();
  initUserCoupon();

  function initUserCoupon() {
    const siteHeader = document.querySelector(".site-header");
    const userCoupon = totalizator.querySelector(".user-coupon");
    const users = totalizator.querySelectorAll(".table-rating__user");
    const userCouponItems = Array.from(userCoupon.querySelectorAll("*"));

    if (!userCoupon || !users) return;

    const userCouponClose = userCoupon.querySelector(".user-coupon__close");

    handleClickOutside();

    userCouponClose.addEventListener("click", closeUserCoupon);

    users.forEach((user) => {
      user.addEventListener("click", openUserCoupon);
    });

    function openUserCoupon() {
      userCoupon.classList.add("is-visible");

      if (window.matchMedia("(max-width: 576px)").matches) {
        siteHeader?.classList.remove("is-scrolling-down");
        document.body.classList.add("is-lock");
      }
    }

    function closeUserCoupon() {
      userCoupon.classList.remove("is-visible");

      if (window.matchMedia("(max-width: 576px)").matches) {
        document.body.classList.remove("is-lock");
      }
    }

    function handleClickOutside() {
      window.addEventListener("click", (e) => {
        const { target } = e;
        const insideUser = target.closest(".table-rating__user");
        const overlay = target.closest(".overlay");

        if (
          !userCouponItems.includes(target) &&
          !target.classList.contains("table-rating__user") &&
          !insideUser &&
          overlay !== null
        ) {
          closeUserCoupon();
        }
      });
    }
  }

  function initAllTours() {
    const allTours = document.querySelector(".all-tours");
    const allToursOpenButtons = document.querySelectorAll(
      "[data-open-all-tours]"
    );

    if (!allTours || !allToursOpenButtons) return;

    const allToursItems = Array.from(allTours.querySelectorAll("*"));
    const allToursTitle = allTours.querySelector(".all-tours__title");

    allToursTitle.addEventListener("click", () =>
      allTours.classList.remove("is-visible")
    );

    allToursOpenButtons.forEach((button) => {
      button.addEventListener("click", () =>
        allTours.classList.add("is-visible")
      );
    });

    window.addEventListener("click", (e) => {
      const { target } = e;

      if (
        !allToursItems.includes(target) &&
        !target.hasAttribute("data-open-all-tours")
      ) {
        allTours.classList.remove("is-visible");
      }
    });
  }

  function initChoosingBet() {
    const totalizatorTable = totalizator.querySelector(".totalizator__table");
    const totalizatorCoefficents = totalizator.querySelectorAll(
      ".totalizator-table__match-coefficent"
    );
    const choosingBetForm = totalizator.querySelector(".choosing-a-bet");
    const choosingBetFormAllItems = Array.from(
      choosingBetForm.querySelectorAll("*")
    );
    const choosingBetFormClose = choosingBetForm.querySelector(
      ".choosing-a-bet__close"
    );

    totalizatorCoefficents.forEach((item) => {
      item.addEventListener("click", () => {
        showChoosingBetForm();
      });
    });

    choosingBetFormClose.addEventListener("click", hideChoosingBetForm);

    window.addEventListener("click", (e) => {
      const { target } = e;

      if (
        !choosingBetFormAllItems.includes(target) &&
        !target.classList.contains("totalizator-table__match-coefficent")
      ) {
        hideChoosingBetForm();
      }
    });

    function showChoosingBetForm() {
      totalizatorTable.classList.add("is-show-choosing");
      choosingBetForm.classList.add("is-visible");
    }

    function hideChoosingBetForm() {
      totalizatorTable.classList.remove("is-show-choosing");
      choosingBetForm.classList.remove("is-visible");
    }
  }
};

const initCommentsSection = () => {
  const commentsSection = document.querySelector(".comments");

  if (!commentsSection) return;

  initComments();
  initCommentsForms();

  function initCommentsForms() {
    const commentsForms = commentsSection.querySelectorAll(".comments__form");

    commentsForms.forEach((form) => {
      const formButton = form.querySelector(".comments__form-button");
      const formBottom = form.querySelector(".comments__form-bottom");
      const formTextarea = form.querySelector(".textarea");

      formTextarea.addEventListener("input", handleTextareaChange);
      formTextarea.addEventListener("focus", handleTextareaFocus);
      formTextarea.addEventListener("blur", handleTextareaBlur);

      function handleTextareaChange(e) {
        const {
          target: { value },
        } = e;

        if (value.length !== 0) {
          formButton.disabled = false;
        } else {
          formButton.disabled = true;
        }
      }

      function handleTextareaFocus() {
        formTextarea.addEventListener("transitionend", () => {
          slideDown(formBottom);
        });
      }

      function handleTextareaBlur() {
        formTextarea.addEventListener("transitionend", () => {
          slideUp(formBottom);
        });
      }
    });
  }

  function initComments() {
    const comments = commentsSection.querySelectorAll(".comment");

    if (!comments) return;

    comments.forEach((comment) => {
      initCommentReply(comment);
    });
  }

  function initCommentReply(comment) {
    const commentForm = comment.querySelector(".comments__form");
    const commentFormClose = comment.querySelector(".comments__form-close");
    const commentReply = comment.querySelector(".comment__reply");

    if (commentReply) {
      commentReply.addEventListener("click", handleCommentReplyClick);
    }
    if (commentFormClose) {
      commentFormClose.addEventListener("click", handleCommentFormClose);
    }

    function handleCommentFormClose() {
      commentForm.classList.add("is-hidden");
      commentReply.classList.remove("is-hidden");
    }

    function handleCommentReplyClick() {
      commentReply.classList.add("is-hidden");
      commentForm.classList.remove("is-hidden");
    }
  }
};

const initFoldedElements = () => {
  const foldedElements = document.querySelectorAll("[data-fold]");

  if (!foldedElements) return;

  foldedElements.forEach((element) => {
    const elementBtn = element.querySelector("[data-fold-btn]");
    const elementContent = element.querySelector("[data-fold-content]");

    heightToggleElement(elementBtn, elementContent);
  });
};

const initAccordions = () => {
  const accordions = document.querySelectorAll("[data-accordion]");

  if (!accordions) return;

  accordions.forEach((accordion) => {
    const accordionFoldedElements = accordion.querySelectorAll("[data-fold]");

    accordionFoldedElements.forEach((foldedElement, i) => {
      const foldedElementBtn = foldedElement.querySelector("[data-fold-btn]");
      const foldedElementsWithoutCurrent = Array.from(
        accordionFoldedElements
      ).filter((element, j) => i !== j);

      foldedElementBtn.addEventListener("click", () =>
        closeOtherFoldedElements(foldedElementsWithoutCurrent)
      );
    });
  });

  function closeOtherFoldedElements(foldedElements) {
    foldedElements.forEach((element) => {
      const foldedElementBtn = element.querySelector("[data-fold-btn]");
      const foldedElementContent = element.querySelector("[data-fold-content]");

      foldedElementContent.style.height = `${foldedElementContent.scrollHeight}px`;
      window
        .getComputedStyle(foldedElementContent, null)
        .getPropertyValue("height");
      foldedElementContent.style.height = "0";
      foldedElementBtn.classList.remove("is-active");
      foldedElementContent.classList.remove("is-expanded");

      foldedElementContent.addEventListener("transitionend", () => {
        if (foldedElementContent.style.height !== "0px") {
          foldedElementContent.style.height = "auto";
        }
      });
    });
  }
};

const initPopups = () => {
  const overlay = document.querySelector(".overlay");

  if (!overlay) return;

  initCloseModalsOnClickOverlay();

  const popups = document.querySelectorAll("[data-popup]");
  const popupBtns = document.querySelectorAll("[data-popup-btn]");

  if (!popupBtns && !popups) return;

  popupBtns.forEach((btn) => {
    const popup = overlay.querySelector(`[data-popup=${btn.dataset.popupBtn}]`);

    if (popup) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openPopup(popup);
      });
    }
  });

  popups.forEach((popup) => {
    const popupCloses = popup.querySelectorAll("[data-popup-close]");

    if (popupCloses) {
      popupCloses.forEach((close) => {
        close.addEventListener("click", (e) => {
          closePopup(popup);
        });
      });
    }
  });

  function openPopup(popup) {
    overlay.classList.add("is-visible");
    popup.classList.add("is-visible");
    document.body.classList.add("is-lock");
  }

  function closePopup(popup) {
    overlay.classList.remove("is-visible");
    popup.classList.remove("is-visible");
    document.body.classList.remove("is-lock");
  }

  function initCloseModalsOnClickOverlay() {
    const overlayBackdrop = overlay.querySelector(".overlay__backdrop");

    overlayBackdrop.addEventListener("click", (e) => {
      overlay.classList.remove("is-visible");
      document.body.classList.remove("is-lock");

      popups.forEach((popup) => {
        popup.classList.remove("is-visible");
      });
    });
  }
};

const initSiteHeaderSearch = () => {
  let siteHeaderSearch = document.querySelector(
    ".site-header__search--desktop"
  );

  if (window.matchMedia("(max-width: 992px)").matches) {
    siteHeaderSearch = document.querySelector(".site-header__search--mobile");
  }

  if (!siteHeaderSearch) return;

  const allSiteHeaderSearchElements = Array.from(
    siteHeaderSearch.querySelectorAll("*")
  );
  const siteHeaderSearchButton = document.querySelector(
    ".site-header__search-button"
  );
  const siteHeaderSearchInput = siteHeaderSearch.querySelector("input");
  const siteHeaderSearchClose = siteHeaderSearch.querySelector(
    ".site-header__search-icon--cross"
  );

  handleClickOutside();

  if (siteHeaderSearchClose)
    siteHeaderSearchClose.addEventListener("click", closeSiteHeaderSearch);
  if (siteHeaderSearchButton)
    siteHeaderSearchButton.addEventListener(
      "click",
      handleSiteHeaderSearchButton
    );

  function handleClickOutside() {
    window.addEventListener("click", (e) => {
      const { target } = e;

      if (
        !allSiteHeaderSearchElements.includes(target) &&
        !target.classList.contains("site-header__search-button")
      ) {
        closeSiteHeaderSearch();
      }
    });
  }

  function closeSiteHeaderSearch() {
    siteHeaderSearchInput.blur();
    siteHeaderSearch.classList.remove("is-visible");
  }

  function handleSiteHeaderSearchButton() {
    siteHeaderSearch.classList.add("is-visible");
  }
};

const initSelectors = () => {
  const selectors = document.querySelectorAll(".selector");

  if (!selectors) return;

  selectors.forEach((selector) => {
    selector = new Selector(selector);
  });
};

const initTabs = () => {
  const tabsContainers = document.querySelectorAll("[data-tabs-container]");

  if (!tabsContainers);

  tabsContainers.forEach((tabsContainer) => {
    const tabsContainerBtns = tabsContainer.querySelectorAll("[data-tab]");
    const tabsContainerTabcontents =
      tabsContainer.querySelectorAll("[data-tabcontent]");

    tabsContainerBtns.forEach((tab) => {
      const tabValue = tab.dataset.tab;
      const tabcontent = Array.from(tabsContainerTabcontents).find(
        (item) => item.dataset.tabcontent === tabValue
      );

      tab.addEventListener("click", () => {
        removeActiveClassesFromOther(tabsContainerBtns, "is-active");
        removeActiveClassesFromOther(tabsContainerTabcontents, "is-active");

        tab.classList.add("is-active");
        tabcontent.classList.add("is-active");
      });
    });
  });
};

const initRatings = () => {
  const ratings = document.querySelectorAll(".rating");

  if (!ratings) return;

  let ratingActive, ratingValue;

  ratings.forEach((rating) => initRating(rating));

  function initRating(rating) {
    iniRatingVars(rating);
    setRatingActiveWidth(formatRatingValue(ratingValue));

    if (rating.classList.contains("rating--set")) {
      setRating(rating);
    }
  }

  function iniRatingVars(rating) {
    ratingActive = rating.querySelector(".rating__active");
    ratingValue = rating.dataset.rating;
  }

  function formatRatingValue(value) {
    value = value.split("");

    if (value[2] > 8) return `${++value[0]}`;
    if (value[2] > 3) return `${value[0]}.5`;

    return value[0];
  }

  function setRatingActiveWidth(index = ratingValue) {
    const ratingActiveWidth = (index * 10) / 0.5;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  function setRating(rating) {
    const ratingItems = rating.querySelectorAll(".rating__item");

    ratingItems.forEach((item) => {
      item.addEventListener("mouseover", (e) => {
        iniRatingVars(rating);
        setRatingActiveWidth(item.value);
      });

      item.addEventListener("mouseleave", (e) => {
        setRatingActiveWidth();
      });

      item.addEventListener("click", (e) => {
        rating.setAttribute("data-rating", item.value);
        iniRatingVars(rating);
        setRatingActiveWidth(item.value);
      });
    });
  }
};

const initMoreText = () => {
  const moreTextContainers = document.querySelectorAll("[data-more-text]");

  if (!moreTextContainers) return;

  moreTextContainers.forEach((container) => {
    const moreTextBtn = container.querySelector("[data-more-text-button]");
    const moreTextContents = container.querySelectorAll(
      "[data-more-text-content]"
    );

    if (moreTextBtn) {
      moreTextBtn.addEventListener("click", () => {
        moreTextContents.forEach((content) => {
          content.classList.add("is-visible");
          moreTextBtn.remove();
        });
      });
    }
  });
};

function initCheckboxes() {
  const checkboxes = document.querySelectorAll(".checkbox");

  if (!checkboxes) return;

  checkboxes.forEach((checkbox) => {
    const checkboxInput = checkbox.querySelector(".checkbox__input");

    checkbox.addEventListener("click", (e) => {
      if (checkboxInput.checked) {
        checkbox.classList.add("is-checked");
      } else {
        checkbox.classList.remove("is-checked");
      }
    });
  });
}

function initRadios() {
  const radios = document.querySelectorAll(".radio");

  if (!radios) return;

  radios.forEach((radio, i) => {
    const radioInput = radio.querySelector(".radio__input");

    radio.addEventListener("click", (e) => {
      removeCheckedFromOtherRadios(i);
      if (radioInput.checked) {
        radio.classList.add("is-checked");
      } else {
        radio.classList.remove("is-checked");
      }
    });

    function removeCheckedFromOtherRadios(i) {
      const radioParent = radio.parentNode.parentNode;
      const allRadios = radioParent.querySelectorAll(".radio");

      allRadios.forEach((radio, j) => {
        if (i !== j) {
          radio.classList.remove("is-checked");
        }
      });
    }
  });
}

const initHeader = () => {
  const header = document.querySelector(".site-header");

  if (!header) return;

  let lastScrollTop;

  window.addEventListener("scroll", animateHeader);

  function animateHeader() {
    const scrollTop = document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 160) {
      header.classList.add("is-scrolling-down");
    } else {
      header.classList.remove("is-scrolling-down");
    }

    lastScrollTop = scrollTop;
  }
};

function initUploadIcon() {
  const authorIconFile = document.querySelector("[data-file]");
  const cropperPopup = document.querySelector(".popup--upload");
  const overlay = document.querySelector(".overlay");

  if (!authorIconFile || !cropperPopup) return;

  const authorIconFileInput = authorIconFile.querySelector(".file__input");
  const authorIconPreviews = authorIconFile.querySelectorAll(
    "[data-file-preview]"
  );

  authorIconFileInput.addEventListener("change", (e) => {
    uploadFile(authorIconFileInput.files[0]);
  });

  let cropper;

  const cropperPopupRange = cropperPopup.querySelector(".cropper__range");
  const cropperSave = cropperPopup.querySelector("[data-cropper-save]");
  const cropperInput = cropperPopup.querySelector(".cropper__file-input");
  let cropperImg = cropperPopup.querySelector(".cropper__img");

  if (cropperImg) initCropper();
  if (cropperPopupRange) initCropperPopupRange();
  if (cropperSave) saveCropper();
  if (cropperInput) uploadNew();

  function initCropper() {
    cropper = new Cropper(cropperImg, {
      minCropBoxWidth: 340,
      minCropBoxHeight: 340,
      maxCropBoxWidth: 340,
      maxCropBoxHeight: 340,
      checkCrossOrigin: !1,
      checkOrientation: !1,
      viewMode: 0,
      dragMode: "move",
      cropBoxMovable: !1,
      initialAspectRatio: 1,
      aspectRatio: 1,
      guides: !1,
      center: !1,
      rotatable: !1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      responsive: !0,
      zoomOnWheel: !1,
      zoomOnTouch: !1,
    });

    if (MEDIA_QUERY_767.matches) {
      cropper.minCropBoxWidth = 200;
      cropper.minCropBoxHeight = 200;
      cropper.maxCropBoxWidth = 200;
      cropper.maxCropBoxHeight = 200;
    }
  }

  function uploadFile(file) {
    let reader = new FileReader();

    reader.onload = (e) => {
      cropperImg.src = e.target.result;
      cropper.replace(e.target.result);
      openCropperPopup();
    };

    reader.onerror = (e) => {
      alert("Error");
    };

    reader.readAsDataURL(file);
  }

  function uploadNew() {
    cropperInput.addEventListener("change", (e) => {
      uploadFile(cropperInput.files[0]);
      authorIconFileInput.files = cropperInput.files;
    });
  }

  function openCropperPopup() {
    cropperPopup.classList.add("is-visible");
    overlay.classList.add("is-visible");
    document.body.classList.add("is-lock");
  }

  function closeCropperPopup() {
    cropperPopup.classList.remove("is-visible");
    overlay.classList.remove("is-visible");
    document.body.classList.remove("is-lock");
  }

  function initCropperPopupRange() {
    noUiSlider
      .create(cropperPopupRange, {
        start: [1],
        connect: [!0, !1],
        range: { min: 0, max: 2 },
      })
      .on("update", function (e, t) {
        cropper.scale(e[t]);
      });
  }

  function saveCropper() {
    cropperSave.addEventListener("click", (e) => {
      const cropImage = cropper
        .getCroppedCanvas({ width: 192, height: 192 })
        .toDataURL("image/jpeg");
      authorIconPreviews.forEach(
        (preview) => (preview.innerHTML = `<img src="${cropImage}" alt title>`)
      );
      closeCropperPopup();
    });
  }
}

function heightToggleElement(toggler, blocks) {
  toggler.addEventListener("click", (e) => {
    e.preventDefault();
    if (blocks instanceof NodeList) {
      blocks.forEach(function (block) {
        addFunctionality(toggler, block);
      });
    } else {
      addFunctionality(toggler, blocks);
    }
  });

  function addFunctionality(toggler, block) {
    if (block.style.height === "0px" || !block.style.height) {
      slideDown(block, toggler);
    } else {
      slideUp(block, toggler);
    }
  }
}

function slideDown(block, toggler) {
  block.style.height = `${block.scrollHeight}px`;
  block.classList.add("is-expanded");

  if (toggler) toggler.classList.add("is-active");
}

function slideUp(block, toggler) {
  block.style.height = `${block.scrollHeight}px`;
  window.getComputedStyle(block, null).getPropertyValue("height");
  block.style.height = "0";
  block.classList.remove("is-expanded");

  if (toggler) toggler.classList.remove("is-active");

  block.addEventListener("transitionend", () => {
    if (block.style.height !== "0px") {
      block.style.height = "auto";
    }
  });
}

function removeActiveClassesFromOther(array, activeClass) {
  array.forEach((item) => item.classList.remove(activeClass));
}

const slider = new Swiper(".slider", {
  slidesPerView: 1,
  navigation: {
    nextEl: `.swiper-next`,
    prevEl: `.swiper-prev`,
  },
  pagination: {
    el: ".slider__dots",
    type: "bullets",
    clickable: true,
  },
  on: {
    slideChange: function (swiper) {
      document
        .querySelector(".slider__pagination-slide.current")
        .classList.remove("current");
      document
        .querySelector(
          `.slider__pagination-slide[data-index="${swiper.activeIndex}"]`
        )
        .classList.add("current");
    },
  },
});
document.querySelectorAll(".slider__pagination-slide").forEach((item) => {
  item.addEventListener("click", () => slider.slideTo(item.dataset.index));
});

const swiper2 = new Swiper(".speakers-slider", {
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: `.swiper-next`,
    prevEl: `.swiper-prev`,
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});


const swiper3 = new Swiper(".screenshots-slider", {
  slidesPerView: 1,
  spaceBetween: 24,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const swiper4 = new Swiper(".mma-slider", {
  slidesPerView: 1,
  navigation: {
    nextEl: `.swiper-next`,
    prevEl: `.swiper-prev`,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
});


const swiper5 = new Swiper(".bonus-menu", {
  slidesPerView: 3,
  spaceBetween: 7,
  navigation: {
    nextEl: `.swiper-btn-next`,
    prevEl: `.swiper-btn-prev`,
  },

  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 7,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 7,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 7,
    },
  },
});

const swiper6 = new Swiper(".another-bonuses", {
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: `.swiper-btn-next`,
    prevEl: `.swiper-btn-prev`,
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});

const swiper7 = new Swiper(".stories", {
  slidesPerView: 3,
  spaceBetween: 7,
  navigation: {
    nextEl: `.swiper-btn-next`,
    prevEl: `.swiper-btn-prev`,
  },

  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 7,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 7,
      spaceBetween: 10,
    },
  },
});



function initHoverOnCasino() {
  const casinos = document.querySelectorAll(".bookmaker");
  if (!casinos) return;
  casinos.forEach((casino) => {
    const casinoBtn = casino.querySelector(".bookmaker_button");
    if (casinoBtn) {
      casinoBtn.addEventListener("mouseover", (e) => {
        casino.classList.add("focused");
      });
      casinoBtn.addEventListener("mouseleave", (e) => {
        casino.classList.remove("focused");
      });
    }
  });

  const forecasts = document.querySelectorAll(".forecast");
  if (!forecasts) return;
  forecasts.forEach((forecast) => {
    const betBtn = forecast.querySelector(".bet-button");
    if (betBtn) {
      betBtn.addEventListener("mouseover", (e) => {
        forecast.classList.add("focused");
      });
      betBtn.addEventListener("mouseleave", (e) => {
        forecast.classList.remove("focused");
      });
    }
  });
}

const rangeSliderInitAge = () => {
  const range = document.getElementById("range");
  const inputMin = document.getElementById("min");
  const inputMax = document.getElementById("max");

  if (!range || !inputMin || !inputMax) return;

  const inputs = [inputMin, inputMax];

  noUiSlider.create(range, {
    start: [5, 20000],
    connect: true,
    range: {
      min: 5,
      max: 20000,
    },
    step: 5,
  });

  range.noUiSlider.on("update", function (values, handle) {
    inputs[handle].value = parseInt(values[handle]);
  });

  inputMin.addEventListener("change", function () {
    range.noUiSlider.set([this.value, null]);
  });

  inputMax.addEventListener("change", function () {
    range.noUiSlider.set([null, this.value]);
  });
};

const rangeSliderInitHeight = () => {
  const range = document.getElementById("range2");
  const inputMin = document.getElementById("min2");
  const inputMax = document.getElementById("max2");

  if (!range || !inputMin || !inputMax) return;

  const inputs = [inputMin, inputMax];

  noUiSlider.create(range, {
    start: [5, 20000],
    connect: true,
    range: {
      min: 5,
      max: 20000,
    },
    step: 5,
  });

  range.noUiSlider.on("update", function (values, handle) {
    inputs[handle].value = parseInt(values[handle]);
  });

  inputMin.addEventListener("change", function () {
    range.noUiSlider.set([this.value, null]);
  });

  inputMax.addEventListener("change", function () {
    range.noUiSlider.set([null, this.value]);
  });
};

const rangeSliderInitArms = () => {
  const range = document.getElementById("range3");
  const inputMin = document.getElementById("min3");
  const inputMax = document.getElementById("max3");

  if (!range || !inputMin || !inputMax) return;

  const inputs = [inputMin, inputMax];

  noUiSlider.create(range, {
    start: [5, 20000],
    connect: true,
    range: {
      min: 50,
      max: 100000,
    },
    step: 50,
  });

  range.noUiSlider.on("update", function (values, handle) {
    inputs[handle].value = parseInt(values[handle]);
  });

  inputMin.addEventListener("change", function () {
    range.noUiSlider.set([this.value, null]);
  });

  inputMax.addEventListener("change", function () {
    range.noUiSlider.set([null, this.value]);
  });
};

function initFilter() {
  const filterTrigger = document.querySelector(".filter-trigger .button");
  const fightersFilter = document.querySelector(".fighters-filter");
  const fightersClose = document.querySelector(".fighters-filter__cross");

  if (!filterTrigger) return;

  filterTrigger.addEventListener("click", () => {
    fightersFilter.classList.add("visible");
  });
  fightersClose.addEventListener("click", () => {
    fightersFilter.classList.remove("visible");
  });
}

function copyPromo() {
  const promoBtn = document.querySelectorAll(".promocode-btn");
  let copied = document.querySelector(".copied-promo");
  let copiedCross = document.querySelector(".copied-promo .close-btn");


  if (!promoBtn) return;

  promoBtn.forEach((item) => {
    item.addEventListener("click", () => {
      copied.classList.add("show");
      const promoCode = item.querySelector('strong').innerHTML;
      navigator.clipboard.writeText(promoCode);
      
    });
  });

  copiedCross.addEventListener("click", () => {
    copied.classList.remove("show");
  });


}

function initMoreBonus() {
  const bonusBtn = document.querySelector(".bonus-selections-more");
  const bonusSelect = document.querySelector(".bonus-selections");
  const bonusLess = document.querySelector(".bonus-selections-less");


  if (!bonusBtn) return;

  bonusBtn.addEventListener("click", () => {
    bonusSelect.classList.add("open");
  });
  bonusLess.addEventListener("click", () => {
    bonusSelect.classList.remove("open");
  });
}



window.addEventListener("DOMContentLoaded", (e) => {
  initLozad();
  initHoverOnCasino();
  initPopups();
  initFoldedElements();
  initAccordions();
  initCommentsSection();
  initSiteHeaderSearch();
  initTotalizator();
  initResetPassword();
  initSelectors();
  initTabs();
  initHeader();
  initRatings();
  initMoreText();
  initCheckboxes();
  initRadios();
  initUploadIcon();
  initAllReviewsSearch();
  rangeSliderInitAge();
  rangeSliderInitHeight();
  rangeSliderInitArms();
  initFilter();
  copyPromo();
  initMoreBonus();
});

const selectSingle = document.querySelectorAll(".__select");

for (let j = 0; j < selectSingle.length; j++) {
  const selectSingle_title = selectSingle[j].querySelector(".__select__title");
  const selectSingle_labels =
    selectSingle[j].querySelectorAll(".__select__label");

  // Toggle menu
  selectSingle_title.addEventListener("click", () => {
    selectSingle.forEach((element) => element.setAttribute("data-state", ""));
    if ("active" === selectSingle[j].getAttribute("data-state")) {
      selectSingle[j].setAttribute("data-state", "");
    } else {
      selectSingle[j].setAttribute("data-state", "active");
    }
  });

  // Close when click to option
  for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener("click", (evt) => {
      selectSingle_title.textContent = evt.target.textContent;
      selectSingle[j].setAttribute("data-state", "");
    });
  }
}



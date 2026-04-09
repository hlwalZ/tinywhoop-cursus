"use strict";

function codeProjecten() {
  const dialogs = document.querySelectorAll("dialog");
  const btnShowDialogs = document.querySelectorAll(".showModal");
  const hideBtnsProjecten = document.querySelectorAll(".showModal");
  const listClose = document.querySelector(".hideme");

  function displayEverything() {
    listClose.classList.remove("hidden");
    hideBtnsProjecten.forEach((el) => el.classList.remove("hidden"));
  }

  // 🔹 OPEN dialogs
  btnShowDialogs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.dataset.modal;
      const dialog = document.getElementById(modalId);

      dialog.showModal();

      // hide everything
      listClose.classList.add("hidden");
      hideBtnsProjecten.forEach((el) => el.classList.add("hidden"));
    });
  });

  // 🔹 CLOSE buttons (ALL dialogs)
  const closeButtons = document.querySelectorAll(".closeIntro, .closeModal");

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = btn.closest("dialog");
      dialog.close();
      displayEverything();
    });
  });

  // 🔹 ESC key (for ALL dialogs)
  dialogs.forEach((dialog) => {
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        dialog.close();
        displayEverything();
      }
    });
  });

  // 🔹 Carousel function (scoped per dialog)
}

document.addEventListener("DOMContentLoaded", () => {
  codeProjecten();
  codeUpdates();
});

function codeUpdates() {
  const balken = document.querySelectorAll(".updates-balk");
  const header = document.querySelector("header.temp"); // target your header

  balken.forEach((balk) => {
    balk.addEventListener("click", () => {
      const isActive = balk.classList.contains("active");

      // Close everything first
      balken.forEach((item) => {
        const wasActive = item.classList.contains("active");

        item.classList.remove("active");
        item.classList.remove("hidden");

        // Stop any video if this item was active but now closing
        if (wasActive) {
          const iframe = item.querySelector("iframe");
          if (iframe) {
            const src = iframe.src;
            iframe.src = ""; // stop the video
            iframe.src = src; // restore src so it can play next time
          }
        }
      });

      // Reset header visibility
      header.classList.remove("header-hidden");

      // If it was NOT active → open it
      if (!isActive) {
        balk.classList.add("active");

        // Hide the others
        balken.forEach((item) => {
          if (item !== balk) {
            item.classList.add("hidden");
          }
        });

        // Hide the header visually but keep its space
        header.classList.add("header-hidden");
      }
    });
  });
}

(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertPrivacy(privacyURL) {
    removeExistingPrivacy();
    let privacyImage = document.createElement("img");
    privacyImage.setAttribute("src", privacyURL);
    privacyImage.style.height = "100vh";
    privacyImage.className = "privicy-image";
    document.body.appendChild(beastImage);
  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingPrivacy) {
    let existingPrivacy = document.querySelectorAll(".privacy-image");
    for (let privacy of existingPrivacy) {
      privacy.remove();
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "privacy") {
      insertPrivacy(message.privacyURL);
    } else if (message.command === "reset") {
      removeExistingPrivacy();
    }
  });

})();

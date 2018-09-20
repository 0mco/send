const html = require('choo/html');
const version = require('../../../package.json').version;
const assets = require('../../../common/assets');
const { browserName } = require('../../utils');

module.exports = function(state) {
  const browser = browserName();
  const feedbackUrl = `https://qsurvey.mozilla.com/s3/txp-firefox-send?ver=${version}&browser=${browser}`;

  const footer = html`<footer class="footer">
    <div class="legalSection"
      onmouseover=${showDropDown}
      onmouseout=${hideDropDown}>

      <a href="${feedbackUrl}"
        rel="noreferrer noopener"
        class="feedback"
        alt="Feedback"
        target="_blank">${state.translate('siteFeedback')}
      </a>

      <div class="legalSection__menu">
        <img class="dropDownArrow" src="${assets.get('dropdown-arrow.svg')}"/>
        <a class="legalSection__link"
          href="https://www.mozilla.org/about/legal">
          ${state.translate('footerLinkLegal')}
        </a>
      </div>

      <a
        href="https://testpilot.firefox.com/about"
        class="legalSection__link footer__dropdown footer__noDisplay">
        ${state.translate('footerLinkAbout')}
      </a>
      <a
        href="/legal"
        class="legalSection__link footer__dropdown footer__noDisplay">
        ${state.translate('footerLinkTerms')}
      </a>
      <a
        href="https://www.mozilla.org/privacy/websites/#cookies"
        class="legalSection__link footer__dropdown footer__noDisplay">
        ${state.translate('footerLinkCookies')}
      </a>
      <a
        href="https://www.mozilla.org/about/legal/report-infringement/"
        class="legalSection__link footer__dropdown footer__noDisplay">
        ${state.translate('reportIPInfringement')}
      </a>
      <a
        href="https://github.com/mozilla/send"
        class="legalSection__link footer__dropdown dropdown__only footer__noDisplay">
        Github
      </a>
      <a
        href="https://twitter.com/FxTestPilot"
        class="legalSection__link footer__dropdown dropdown__only footer__noDisplay">
        Twitter
      </a>
    </div>

    <a
      href="https://github.com/mozilla/send"
      class="socialSection__link footer_hiddenIcon">
      <img
        class="socialSection__icon"
        src="${assets.get('github-icon.svg')}"
        alt="Github"/>
    </a>
    <a
      href="https://twitter.com/FxTestPilot"
      class="socialSection__link footer_hiddenIcon">
      <img
        class="socialSection__icon"
        src="${assets.get('twitter-icon.svg')}"
        alt="Twitter"/>
    </a>

    <a
      href="https://www.mozilla.org"
      class="socialSection__link">
      <img
        class="footer__mozLogo"
        src="${assets.get('mozilla-logo.svg')}"
        alt="mozilla"/>
    </a>
  </footer>`;
  // HACK
  // We only want to render this once because we
  // toggle the targets of the links with utils/openLinksInNewTab
  footer.isSameNode = function(target) {
    return target && target.nodeName && target.nodeName === 'FOOTER';
  };
  return footer;

  function showDropDown() {
    const menus = document.querySelectorAll('.footer__dropdown');
    menus.forEach(element => {
      element.classList.remove('footer__noDisplay');
    });
  }

  function hideDropDown() {
    const menus = document.querySelectorAll('.footer__dropdown');
    menus.forEach(element => {
      element.classList.add('footer__noDisplay');
    });
  }
};

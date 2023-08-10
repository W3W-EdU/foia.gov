import { useEffect, useState } from 'react';

/**
 * @param {string} titleMid
 * @param {WizardAnswer[]} answers
 * @param {string=} addendumMid
 * @returns {WizardQuestion}
 */
export function question(titleMid, answers, addendumMid) {
  return {
    type: 'question', titleMid, answers, addendumMid,
  };
}

/**
 * @param {string} titleMid
 * @param {WizardAnswer['next']} next
 * @param {string=} newDisplayedTopic
 * @returns {WizardAnswer}
 */
export function answer(titleMid, next, newDisplayedTopic) {
  return { titleMid, next, newDisplayedTopic };
}

/**
 * @param {string} titleMid
 * @param {object} yesNo
 * @param {WizardAnswer['next']} yesNo.yes
 * @param {string=} yesNo.topicIfYes
 * @param {WizardAnswer['next']} yesNo.no
 * @param {string=} yesNo.topicIfNo
 * @param {string=} addendumMid
 * @returns {WizardQuestion}
 */
export function yesNoQuestion(titleMid, yesNo, addendumMid) {
  return question(titleMid, [
    answer('a1', yesNo.yes, yesNo.topicIfYes),
    answer('a2', yesNo.no, yesNo.topicIfNo),
  ], addendumMid);
}

/**
 * @param {string} titleMid
 * @param {WizardQuestion | WizardContinue | WizardSummary} next
 * @returns {WizardContinue}
 */
export function continueStep(titleMid, next) {
  return { type: 'continue', titleMid, next };
}

/**
 * @param {string | undefined} titleMid
 * @returns {WizardSummary}
 */
export function summary(titleMid) {
  return { type: 'summary', titleMid };
}

/**
 * @returns {URLSearchParams}
 */
export function urlParams() {
  return new URLSearchParams(
    typeof document === 'undefined' ? '' : location.search,
  );
}

/**
 * If an anchor is the only content inside a paragraph, convert the paragraph into
 * component card markup.
 *
 * @param {string} html
 * @returns {string}
 */
export function convertSomeLinksToCards(html) {
  return html.replace(/<p>(.+?)<\/p>/sg, (m0, pInnerHtml) => {
    const [n0, linkOpenTag, linkInnerHtml] = pInnerHtml.trim().match(/^(<a [^>]+>)(.+?)<\/a>$/s) || [];
    if (!n0) {
      // No modification
      return m0;
    }

    function extClass() {
    // If the link goes outside the foia domain, add an extra class name
      return (linkOpenTag.startsWith('<a href="https://www.foia.gov')) ? '' : 'foia-component-card--alt--ext';
    }

    return `
      <div class="foia-component-card foia-component-card--alt ${extClass()}">
        ${linkOpenTag}
          <h2 class="foia-component-card__title">${linkInnerHtml}</h2>
        </a>
      </div>
    `;
  });
}

/**
 * Ensure obj.confidence_score exists. Move from obj.score or set as 0;
 *
 * @param {object} obj
 * @returns {object}
 */
export function normalizeScore(obj) {
  const { score, confidence_score, ...rest } = obj;

  if (typeof confidence_score === 'number') {
    return { confidence_score, ...rest };
  }

  if (typeof score === 'number') {
    return { confidence_score: score, ...rest };
  }

  console.warn('obj missing confidence_score', obj);
  return { confidence_score: 0, ...rest };
}

export function useWait(waitMs) {
  const [hasWaited, setHasWaited] = useState(false);
  useEffect(() => {
    if (hasWaited) {
      return () => 0;
    }

    const timeout = window.setTimeout(() => {
      setHasWaited(true);
    }, waitMs);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [hasWaited]);

  function reset() {
    setHasWaited(false);
  }

  return {
    hasWaited,
    reset,
  };
}
const d3 = require('d3')

const config = require('../../config')
const { addPdfCoverTitle } = require('../pdfPage')
const featureToggles = config().featureToggles

function renderBanner(renderFullRadar) {
  if (featureToggles.UIRefresh2022) {
    const documentTitle = 'Technology Radar';

    document.title = documentTitle;
    // Remove previous subtitle banners before appending a new one
    d3.selectAll('.hero-banner__subtitle-text').remove();
    d3.select('.hero-banner__title-text').on('click', renderFullRadar);

    addPdfCoverTitle(documentTitle);
  } else {
    // Remove previous header banners before inserting a new one
    d3.selectAll('header').remove();
    const header = d3.select('body').insert('header', '#radar');
    header
      .append('div')
      .attr('class', 'radar-title')
      .append('div')
      .attr('class', 'radar-title__text')
      .append('h1')
      .text('Technology Radar')
      .style('cursor', 'pointer')
      .on('click', renderFullRadar);

    header
      .select('.radar-title')
      .append('div')
      .attr('class', 'radar-title__logo')
      .html('<a href="https://www.dubizzle.com"> <img src="/images/logo_main.png" /> </a>');
  }
}

module.exports = {
  renderBanner,
}

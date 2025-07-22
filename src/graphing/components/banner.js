const d3 = require('d3')

const config = require('../../config')
const { addPdfCoverTitle } = require('../pdfPage')
const featureToggles = config().featureToggles

function renderBanner(renderFullRadar) {
  if (featureToggles.UIRefresh2022) {
    const documentTitle = document.title[0].toUpperCase() + document.title.slice(1)

    document.title = documentTitle
    // Remove previous subtitle banners before appending a new one
    d3.selectAll('.hero-banner__subtitle-text').remove();
    d3.select('.hero-banner__wrapper')
      .append('p')
      .classed('hero-banner__subtitle-text', true)
      .text(document.title)
    d3.select('.hero-banner__title-text').on('click', renderFullRadar)

    addPdfCoverTitle(documentTitle)
  } else {
    // Remove previous header banners before inserting a new one
    d3.selectAll('header').remove();
    const header = d3.select('body').insert('header', '#radar')
    header
      .append('div')
      .attr('class', 'radar-title')
      .append('div')
      .attr('class', 'radar-title__text')
      .append('h1')
      .text(document.title)
      .style('cursor', 'pointer')
      .on('click', renderFullRadar)

    header
      .select('.radar-title')
      .append('div')
      .attr('class', 'radar-title__logo')
      .html('<a href="https://www.thoughtworks.com"> <img src="/images/logo.png" /> </a>')
  }
}

module.exports = {
  renderBanner,
}

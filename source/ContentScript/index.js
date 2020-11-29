import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';
import './styles.scss';

function init() {
  const blobWrapper = document.querySelector('.blob-wrapper');
  if (blobWrapper) {
    const outlineContainer = document.createElement('div');
    outlineContainer.className = 'git-outline';
    blobWrapper.prepend(outlineContainer);

    ReactDOM.render(<Container />, outlineContainer);
  }
}
init();
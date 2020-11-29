import React, {useState, useEffect, useRef} from 'react';
import StartButton from './Button';
import Outline from './Outline';

import { startParsing } from '../utils';

export default function Container(props) {
  const containerEl = useRef(null);

  const [state, setState] = useState({
    loading: false,
    view: 'startView',
    outlines: null,
  });

  useEffect(() => {
    const blobWrapper = document.querySelector('.blob-wrapper');
    blobWrapper.style.position = 'relative';
    const obseverTarget = document.createElement('div');
    obseverTarget.className = 'git-outline-obverse-target';
    blobWrapper.prepend(obseverTarget);

    const observerCb = (entries) => {
      let position, right, display;
      if (entries[0].intersectionRatio > 0) {
        position = 'absolute';
        right = 0;
        display = 'block';
      } else {
        // out of viewport
        position = 'fixed';
        display = 'block';
        const { right: repositoryContentRight } = document.querySelector('.repository-content').getBoundingClientRect();
        right = `${window.innerWidth - repositoryContentRight + 1}px`;
      }
      Object.assign(containerEl.current.style, {position, display, right});
    };
    const observer = new IntersectionObserver(observerCb, { threshold: [0] });
    observer.observe(obseverTarget);
  }, []);

  const onBtnClick = async () => {
    if (state.outlines) {
      setState({ ...state, view: 'outlineView' });
    } else {
      setState({ ...state, loading: true });
      const outlines = await startParsing();
      setState({ outlines, view: 'outlineView', loading: false });
    }
  }

  function onOutlineClose() {
    setState({ ...state, view: 'startView' });
  }

  return (
    <div ref={containerEl} className="git-outline-container" >
      {state.view === 'startView' && <StartButton onBtnClick={onBtnClick} />}
      {state.view === 'outlineView' && <Outline outlines={state.outlines} onClose={onOutlineClose} currentUrlWithoutHash={location.origin + location.pathname}/>}
      {state.loading && <div className="loader" />}
    </div>);
}

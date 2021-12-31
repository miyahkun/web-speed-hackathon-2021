import classNames from 'classnames';
import React from 'react';

import { AspectRatioBox } from '../AspectRatioBox';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {MoviePathSet} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = ({ src }) => {
  const [isPlaying, setIsPlaying] = React.useState(() => {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  /** @type {React.MutableRefObject<HTMLVideoElement>} */
  const videoRef = React.useRef(null);

  const handleClick = React.useCallback(() => {
    console.log('handleClick', isPlaying);
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      return !isPlaying;
    });
  }, []);

  return (
    <div className="relative pt-100% w-full aspect-square">
      <button className="group block w-full h-full" onClick={handleClick} type="button">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="none"
          className="absolute top-0 right-0 bottom-0 left-0"
        >
          <source src={src.webm} />
          <img src={src.gif} alt="" />
        </video>
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2',
            {
              'opacity-0 group-hover:opacity-100': isPlaying,
            },
          )}
        >
          <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
        </div>
      </button>
    </div>
  );
};

export { PausableMovie };

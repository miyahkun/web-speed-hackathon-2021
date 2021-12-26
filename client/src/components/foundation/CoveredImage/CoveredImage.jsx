import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {ImagePathSet} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src }) => {
  const imgClass = 'absolute w-full h-full object-cover';

  return (
    <div className="relative w-full h-full overflow-hidden">
      <picture>
        <source alt={alt} srcSet={src.webp} className={imgClass} />
        <img alt={alt} src={src.jpg} className={imgClass} />
      </picture>
    </div>
  );
};

export { CoveredImage };

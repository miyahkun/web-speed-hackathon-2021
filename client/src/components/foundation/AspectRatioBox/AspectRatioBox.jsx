import React from 'react';

/**
 * @typedef {object} Props
 * @property {number} aspectHeight
 * @property {number} aspectWidth
 * @property {React.ReactNode} children
 */

/**
 * 親要素の横幅を基準にして、指定したアスペクト比のブロック要素を作ります
 * @type {React.VFC<Props>}
 */
const AspectRatioBox = ({ aspectHeight, aspectWidth, children }) => {
  /** @type {React.RefObject<HTMLDivElement>} */
  const ref = React.useRef(null);
  const [aspectRatioStr, setAspectRatio] = React.useState(`${aspectWidth} / ${aspectHeight}`);

  React.useEffect(() => {
    setAspectRatio(`${aspectWidth} / ${aspectHeight}`);
  }, [aspectHeight]);

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: aspectRatioStr }}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

export { AspectRatioBox };

import React from 'react';
import { debounce } from 'lodash-es';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {any} items
 * @property {() => void} fetchMore
 */

const HEIGHT_THRESHOLD = 200;
const WAIT_MILLI_SEC = 300;

/** @type {React.VFC<Props>} */
const InfiniteScroll = ({ children, fetchMore, items }) => {
  const latestItem = items[items.length - 1];

  const prevReachedRef = React.useRef(false);

  React.useEffect(() => {
    const handler = () => {
      const hasReached = debounce(
        () => window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight - HEIGHT_THRESHOLD,
        WAIT_MILLI_SEC,
        { leading: false },
      );

      // 画面最下部にスクロールしたタイミングで、登録したハンドラを呼び出す
      if (hasReached && !prevReachedRef.current) {
        // アイテムがないときは追加で読み込まない
        if (latestItem !== undefined) {
          fetchMore();
        }
      }

      prevReachedRef.current = hasReached;
    };

    // 最初は実行されないので手動で呼び出す
    prevReachedRef.current = false;
    handler();

    // FIXME:
    document.addEventListener('wheel', handler, { passive: false });
    document.addEventListener('touchmove', handler, { passive: false });
    document.addEventListener('resize', handler, { passive: false });
    document.addEventListener('scroll', handler, { passive: false });
    return () => {
      // FIXME:
      document.removeEventListener('wheel', handler);
      document.removeEventListener('touchmove', handler);
      document.removeEventListener('resize', handler);
      document.removeEventListener('scroll', handler);
    };
  }, [latestItem, fetchMore]);

  return <>{children}</>;
};

export { InfiniteScroll };

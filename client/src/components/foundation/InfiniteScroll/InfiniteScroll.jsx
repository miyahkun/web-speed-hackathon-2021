import React from 'react';
import { throttle } from 'lodash-es';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {any} items
 * @property {() => void} fetchMore
 */

const HEIGHT_THRESHOLD = 500;
const WAIT_MILLI_SEC = 300;

/** @type {React.VFC<Props>} */
const InfiniteScroll = ({ children, fetchMore, items }) => {
  const latestItem = items[items.length - 1];

  const prevReachedRef = React.useRef(false);

  const scrollHandler = React.useCallback(
    throttle(() => {
      const hasReached =
        window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight - HEIGHT_THRESHOLD;

      // 画面最下部にスクロールしたタイミングで、登録したハンドラを呼び出す
      if (hasReached && !prevReachedRef.current) {
        fetchMore();
      }

      prevReachedRef.current = hasReached;
    }, WAIT_MILLI_SEC),
    [],
  );

  React.useEffect(() => {
    // 最初は実行されないので手動で呼び出す
    prevReachedRef.current = false;
    scrollHandler();
  }, []);

  React.useEffect(() => {
    document.addEventListener('wheel', scrollHandler, { passive: false });
    document.addEventListener('touchmove', scrollHandler, { passive: false });
    document.addEventListener('resize', scrollHandler, { passive: false });
    document.addEventListener('scroll', scrollHandler, { passive: false });

    return () => {
      document.removeEventListener('wheel', scrollHandler);
      document.removeEventListener('touchmove', scrollHandler);
      document.removeEventListener('resize', scrollHandler);
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  return <>{children}</>;
};

export { InfiniteScroll };

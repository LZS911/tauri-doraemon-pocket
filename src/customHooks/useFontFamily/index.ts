import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANT from '../../common/constant';
import { FontFamilyEnum } from '../../common/enum';
import { IReduxState } from '../../store';
import { setFontFamily } from '../../store/userConfig';
import LocalStorageWrapper from '../../utils/LocalStorageWrapper';

const addClass = (className: string) => {
  if (document.body.classList.contains(className)) {
    return;
  }

  document.body.classList.add(className);
};

const removeClass = (className?: string) => {
  if (!className) {
    document.body.classList.forEach((v) => {
      if (v.startsWith('font-')) {
        removeClass(v);
      }
    });
    return;
  }

  if (!document.body.classList.contains(className)) {
    return;
  }

  document.body.classList.remove(className);
};

const genFontFamilyClass = (font: FontFamilyEnum) => `font-${font}`;

export const useInitFontFamily = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fontFamily = LocalStorageWrapper.getOrDefault(
      CONSTANT.FONT_FAMILY,
      FontFamilyEnum.Default
    );
    dispatch(setFontFamily(fontFamily));
    if (fontFamily === FontFamilyEnum.Default) {
      removeClass();
    } else {
      removeClass();
      addClass(genFontFamilyClass(fontFamily));
    }
  }, [dispatch]);
};

export const useFontFamily = () => {
  const dispatch = useDispatch();

  const changeFontFamily = (font: FontFamilyEnum) => {
    dispatch(setFontFamily(font));

    if (font === FontFamilyEnum.Default) {
      removeClass();
    } else {
      removeClass();
      addClass(genFontFamilyClass(font));
    }
  };

  const currentFontFamily = useSelector((state: IReduxState) => {
    return state.userConfig.fontFamily;
  });

  return {
    changeFontFamily,
    currentFontFamily,
  };
};

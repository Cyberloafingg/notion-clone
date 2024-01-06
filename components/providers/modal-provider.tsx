"use client";

import { useEffect, useState } from "react";

import { SettingsModal } from "@/components/modals/settings-modal";
// import { CoverImageModal } from "@/components/modals/cover-image-modal";

// 這裏相當於把兩個modal都放到了一個組件中，然後在這個組件中判斷是否已經掛載，如果沒有掛載，則返回null
// 可以对比一下search-command.tsx中的写法，与其放在一个组件中，不如分开写，这样更加清晰
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      <SettingsModal />
      {/* <CoverImageModal /> */}
    </>
  );
};

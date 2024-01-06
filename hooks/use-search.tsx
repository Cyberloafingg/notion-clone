import { create } from "zustand";
// https://zustand-demo.pmnd.rs/

type SearchStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
};
// zustand与redux的类似之处在于，它也是一个状态管理库，但是它的设计理念与redux有所不同。
// zustand的设计理念是：将状态和状态的更新函数放在一起，这样就不需要像redux那样，将状态和状态的更新函数分开放在不同的文件中。
// 在下面的代码中，我们使用zustand创建了一个名为useSearch的hook，它返回一个对象，该对象包含了isOpen、onOpen、onClose和toggle四个属性。
// toggle 函数用于切换 isOpen 的状态，如果原先是打开的，则关闭；如果原先是关闭的，则打开。
// isOpen 用于表示搜索框是否打开。
// onOpen 和 onClose 用于打开和关闭搜索框。
export const useSearch = create<SearchStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    toggle: () => set({ isOpen: !get().isOpen }),
}));

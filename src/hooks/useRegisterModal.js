import { create } from "zustand";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle} from "react-icons/fc"


const useRegisterModal = create((set) => ({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false})

}));


export default useRegisterModal;
